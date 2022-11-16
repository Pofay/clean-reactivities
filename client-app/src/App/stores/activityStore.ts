import { format, parseISO } from 'date-fns/fp'
import { parse } from 'date-fns'
import { pipe } from 'fp-ts/lib/function'
import { map } from 'fp-ts/lib/Array'
import { makeAutoObservable, runInAction } from 'mobx'
import agent from '../api/agent'
import { Activity } from '../models/interfaces/activity'
import { v4 as uuid } from 'uuid'

const parseAndFormatISODateString = (isoDateString: string) =>
  pipe(isoDateString, parseISO, format('yyyy-MM-dd'))

const formatDates = (activities: Activity[]) =>
  pipe(
    activities,
    map((a) => ({ ...a, date: parseAndFormatISODateString(a.date) }))
  )

export default class ActivityStore {
  activityRegistry = new Map<string, Activity>()
  selectedActivity: Activity | undefined = undefined
  editMode = false
  loading = false
  loadingInitial = false

  constructor() {
    makeAutoObservable(this)
  }

  get activitiesByDate() {
    return Array.from(this.activityRegistry.values()).sort(
      (a, b) => Date.parse(a.date) - Date.parse(b.date)
    )
  }

  get groupedActivities() {
    return Object.entries(
      this.activitiesByDate.reduce((activities, activity) => {
        const { date } = activity
        activities[date] = activities[date]
          ? [...activities[date], activity]
          : [activity]
        return activities
      }, {} as { [key: string]: Activity[] })
    )
  }

  loadActivities = async () => {
    this.setLoadingInitial(true)
    try {
      await agent.Activities.list()
        .then(formatDates)
        .then(this.setActivities)
        .then(() => this.setLoadingInitial(false))
    } catch (error) {
      console.error(error)
      this.setLoadingInitial(false)
    }
  }

  // WARNING: Violates CQS and is really a jarbled mess of responsibilities
  loadActivity = async (id: string) => {
    let activity = this.getActivity(id)
    if (activity) {
      this.selectActivity(activity.id)
      return activity
    } else {
      this.setLoadingInitial(true)
      try {
        activity = await agent.Activities.details(id)
        activity = {
          ...activity,
          date: parseAndFormatISODateString(activity.date),
        }
        this.addActivity(activity)
        this.setLoadingInitial(false)
        this.selectActivity(activity.id)
        return activity
      } catch (error) {
        console.error(error)
        this.setLoadingInitial(false)
      }
    }
  }

  private getActivity = (id: string) => {
    return this.activityRegistry.get(id)
  }

  setActivities = (activities: Activity[]) => {
    activities.forEach((a) => {
      this.activityRegistry.set(a.id, a)
    })
  }

  setLoadingInitial = (state: boolean) => {
    this.loadingInitial = state
  }

  selectActivity = (id: string) => {
    this.selectedActivity = this.getActivity(id)
  }

  deselectActivity = () => {
    this.selectedActivity = undefined
  }

  setEditMode = (state: boolean) => {
    this.editMode = state
  }

  createActivity = async (activity: Activity) => {
    this.setLoading(true)
    console.log(activity.date)
    const newActivity = {
      ...activity,
      id: uuid(),
      date: parse(activity.date, 'yyyy-MM-dd', new Date()).toISOString(),
    }
    try {
      await agent.Activities.create(newActivity)
      this.addActivity(newActivity)
      this.setEditMode(false)
      this.selectActivity(newActivity.id)
      this.setLoading(false)
      return newActivity.id
    } catch (error) {
      console.error(error)
      this.setLoading(false)
    }
  }

  addActivity = (activity: Activity) => {
    const activityWithFormattedDate = {
      ...activity,
      date: parseAndFormatISODateString(activity.date),
    }
    this.activityRegistry.set(activity.id, activityWithFormattedDate)
  }

  updateActivity = async (activity: Activity) => {
    this.setLoading(true)
    try {
      await agent.Activities.update(activity)
      this.addActivity(activity)
      this.setEditMode(false)
      this.selectActivity(activity.id)
      this.setLoading(false)
      return activity.id
    } catch (error) {
      console.error(error)
      this.setLoading(false)
    }
  }

  deleteActivity = async (id: string) => {
    this.setLoading(true)
    try {
      await agent.Activities.delete(id)
      runInAction(() => {
        this.activityRegistry.delete(id)
        this.setLoading(false)
        this.deselectActivity()
      })
    } catch (error) {
      console.error(error)
      this.setLoading(false)
    }
  }

  setLoading = (state: boolean) => {
    this.loading = state
  }
}
