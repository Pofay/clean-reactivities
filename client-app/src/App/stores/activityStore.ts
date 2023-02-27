import { DateFormatter } from 'App/common/utils/date-formatter';
import {
  createProfileFromUser,
  UserProfile,
} from 'App/models/interfaces/profile';
import { User } from 'App/models/interfaces/user';
import { makeAutoObservable, runInAction } from 'mobx';
import { v4 as uuid } from 'uuid';
import {
  Activity,
  ActivityFormValues,
  createNewActivity,
} from 'App/models/interfaces/activity';
import { store } from 'App/stores/store';
import agent from 'App/api/agent';

/*
const parseAndFormatISODateString = (isoDateString: string) =>
  pipe(isoDateString, parseISO, format('yyyy-MM-dd'))

console.table(a)
const formatDates = (activities: Activity[]) =>
  pipe(
    activities,
    map((a) => ({ ...a, date: parseAndFormatISODateString(a.date) }))
  )
  */

export default class ActivityStore {
  activityRegistry = new Map<string, Activity>();
  selectedActivity: Activity | undefined = undefined;
  editMode = false;
  loading = false;
  loadingInitial = false;

  constructor() {
    makeAutoObservable(this);
  }

  get activitiesByDate() {
    return Array.from(this.activityRegistry.values()).sort(
      (a, b) => a.date!.getTime() - b.date!.getTime()
    );
  }

  get groupedActivities() {
    return Object.entries(
      this.activitiesByDate.reduce((activities, activity) => {
        const date = DateFormatter.formatDate(activity.date!);
        activities[date] = activities[date]
          ? [...activities[date], activity]
          : [activity];
        return activities;
      }, {} as { [key: string]: Activity[] })
    );
  }

  loadActivities = async () => {
    this.setLoadingInitial(true);
    try {
      const result = await agent.Activities.list();
      result.forEach((activity) => this.setActivity(activity));
      this.setLoadingInitial(false);
    } catch (error) {
      console.error(error);
      this.setLoadingInitial(false);
    }
  };

  // WARNING: Violates CQS and is really a jarbled mess of responsibilities
  loadActivity = async (id: string) => {
    let activity = this.getActivity(id);
    if (activity) {
      this.selectActivity(activity);
      return activity;
    } else {
      this.setLoadingInitial(true);
      try {
        let loadedActivity = await agent.Activities.details(id);
        let formattedActivity = this.formatDate(loadedActivity);
        runInAction(() => {
          this.setActivity(formattedActivity);
          this.setLoadingInitial(false);
          this.selectActivity(formattedActivity);
        });
        return formattedActivity;
      } catch (error) {
        console.error(error);
        this.setLoadingInitial(false);
      }
    }
  };

  private getActivity = (id: string) => {
    return this.activityRegistry.get(id);
  };

  setActivity = (activity: Activity) => {
    const user = store.userStore.user;
    if (user) {
      activity.isGoing = activity.attendees!.some(
        (a) => a.userName === user.userName
      );
      activity.isHost = activity.hostUsername === user.userName;
      activity.host = activity.attendees?.find(
        (x) => x.userName === activity.hostUsername
      );
    }
    this.addActivity(activity);
  };

  setLoadingInitial = (state: boolean) => {
    this.loadingInitial = state;
  };

  selectActivity = (activity: Activity) => {
    this.selectedActivity = activity;
  };

  deselectActivity = () => {
    this.selectedActivity = undefined;
  };

  setEditMode = (state: boolean) => {
    this.editMode = state;
  };

  createActivity = async (activity: ActivityFormValues) => {
    const partialActivity: ActivityFormValues = {
      ...activity,
      id: uuid(),
    };
    try {
      const user = store.userStore.user;
      const attendee = createProfileFromUser(user!);
      console.log(attendee);
      await agent.Activities.create(partialActivity);
      const newActivity = createNewActivity(partialActivity, user!.userName, [
        attendee as UserProfile,
      ]);
      this.setActivity(newActivity);
      this.setEditMode(false);
      this.selectActivity(newActivity);
      return newActivity.id;
    } catch (error) {
      console.error(error);
    }
  };

  addActivity = (activity: Activity) => {
    const activityWithFormattedDate = this.formatDate(activity);
    this.activityRegistry.set(activity.id, activityWithFormattedDate);
  };

  updateActivity = async (activity: ActivityFormValues) => {
    await agent.Activities.update(activity);
    try {
      runInAction(() => {
        let updatedActivity = {
          ...this.getActivity(activity.id),
          ...activity,
        };
        this.addActivity(updatedActivity as Activity);
        this.setEditMode(false);
        this.selectActivity(updatedActivity as Activity);
      });
      return activity.id;
    } catch (error) {
      console.error(error);
      this.setLoading(false);
    }
  };

  deleteActivity = async (id: string) => {
    this.setLoading(true);
    try {
      await agent.Activities.delete(id);
      runInAction(() => {
        this.activityRegistry.delete(id);
        this.setLoading(false);
        this.deselectActivity();
      });
    } catch (error) {
      console.error(error);
      this.setLoading(false);
    }
  };

  setLoading = (state: boolean) => {
    this.loading = state;
  };

  updateAttendance = async () => {
    const user = store.userStore.user;
    this.setLoading(true);
    try {
      await agent.Activities.attend(this.selectedActivity!.id);
      runInAction(() => {
        if (this.selectedActivity?.isGoing) {
          this.cancelAttendance(user);
        } else {
          this.addAttendance(user);
        }
        this.addActivity(this.selectedActivity!);
      });
    } catch (error) {
      console.error(error);
    } finally {
      this.setLoading(false);
    }
  };

  cancelActivityToggle = async () => {
    this.setLoading(true);
    try {
      await agent.Activities.attend(this.selectedActivity!.id);
      runInAction(() => {
        this.selectedActivity!.isCancelled =
          !this.selectedActivity?.isCancelled;
        this.addActivity(this.selectedActivity!);
      });
    } catch (error) {
      console.error(error);
    } finally {
      this.setLoading(false);
    }
  };

  private formatDate(activity: Activity) {
    return {
      ...activity,
      date: new Date(activity.date!),
    };
  }

  private addAttendance(user: User | null) {
    const attendee = createProfileFromUser(user!);
    this.selectedActivity?.attendees?.push(attendee as UserProfile);
    this.selectedActivity!.isGoing = true;
  }

  private cancelAttendance(user: User | null) {
    this.selectedActivity!.attendees = this.selectedActivity!.attendees?.filter(
      (a) => a.userName !== user?.userName
    );
    this.selectedActivity!.isGoing = false;
  }
}
