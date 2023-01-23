import { makeAutoObservable, runInAction } from 'mobx';
import { v4 as uuid } from 'uuid';
import agent from '../api/agent';
import { DateFormatter } from '../common/utils/date-formatter';
import { Activity } from '../models/interfaces/activity';
import { store } from './store';

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
      this.selectActivity(activity.id);
      return activity;
    } else {
      this.setLoadingInitial(true);
      try {
        activity = await agent.Activities.details(id);
        this.addActivity(activity);
        this.setLoadingInitial(false);
        this.selectActivity(activity.id);
        return activity;
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
    const user = store.userStore.user
    if (user) {
      activity.isGoing = activity.attendees!.some(
        (a) => a.userName === user.userName
      );
      activity.isHost = activity.hostUsername === user.userName;
      activity.host = activity.attendees?.find(
        (x) => x.userName === activity.hostUsername
      );
    }
    activity.date = new Date(activity.date!);
    this.activityRegistry.set(activity.id, activity);
  };

  setLoadingInitial = (state: boolean) => {
    this.loadingInitial = state;
  };

  selectActivity = (id: string) => {
    this.selectedActivity = this.getActivity(id);
  };

  deselectActivity = () => {
    this.selectedActivity = undefined;
  };

  setEditMode = (state: boolean) => {
    this.editMode = state;
  };

  createActivity = async (activity: Activity) => {
    this.setLoading(true);
    const newActivity = {
      ...activity,
      id: uuid(),
    };
    try {
      await agent.Activities.create(newActivity);
      this.addActivity(newActivity);
      this.setEditMode(false);
      this.selectActivity(newActivity.id);
      this.setLoading(false);
      return newActivity.id;
    } catch (error) {
      console.error(error);
      this.setLoading(false);
    }
  };

  addActivity = (activity: Activity) => {
    const activityWithFormattedDate = {
      ...activity,
      date: new Date(activity.date!),
    };
    this.activityRegistry.set(activity.id, activityWithFormattedDate);
  };

  updateActivity = async (activity: Activity) => {
    this.setLoading(true);
    try {
      await agent.Activities.update(activity);
      this.addActivity(activity);
      this.setEditMode(false);
      this.selectActivity(activity.id);
      this.setLoading(false);
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
}
