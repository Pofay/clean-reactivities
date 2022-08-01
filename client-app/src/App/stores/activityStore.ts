import { format, parseISO } from 'date-fns/fp'
import { pipe } from 'fp-ts/lib/function'
import { makeAutoObservable, runInAction } from 'mobx'
import agent from '../api/agent'
import { Activity } from '../models/interfaces/activity'
import { v4 as uuid } from 'uuid'

const parseAndFormatISODateString = (isoDateString: string) =>
  pipe(isoDateString, parseISO, format('yyyy-mm-dd'))

const formatDates = (activities: Activity[]) =>
  activities.map((a) => ({
    ...a,
    date: parseAndFormatISODateString(a.date),
  }))

export default class ActivityStore {
  activities: Activity[] = []
  selectedActivity: Activity | undefined = undefined
  editMode = false
  loading = false
  loadingInitial = false

  constructor() {
    makeAutoObservable(this)
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

  setActivities = (activities: Activity[]) => {
    this.activities = activities
  }

  setLoadingInitial = (state: boolean) => {
    this.loadingInitial = state
  }

  selectActivity = (id: string) => {
    this.selectedActivity = this.activities.find((a) => a.id === id)
  }

  deselectActivity = () => {
    this.selectedActivity = undefined
  }

  setEditMode = (state: boolean) => {
    this.editMode = state
  }

  openForm = (activity?: Activity) => {
    activity ? this.selectActivity(activity.id) : this.deselectActivity()
    this.setEditMode(true)
  }

  createActivity = async (activity: Activity) => {
    this.setLoading(true)
    const newActivity = { ...activity, id: uuid() }
    try {
      await agent.Activities.create(newActivity)
      this.addActivity(newActivity)
      this.setEditMode(false)
      this.selectActivity(newActivity.id)
      this.setLoading(false)
    } catch (error) {
      console.error(error)
      this.setLoading(false)
    }
  }

  addActivity = (activity: Activity) => {
    this.activities = this.activities.concat(activity)
  }

  updateActivity = async (activity: Activity) => {
    this.setLoading(true)
    try {
      await agent.Activities.update(activity)
      runInAction(() => {
        this.activities = [
          ...this.activities.filter((a) => a.id !== activity.id),
          activity,
        ]
        this.setEditMode(false)
        this.selectActivity(activity.id)
        this.setLoading(false)
      })
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
        this.activities = [...this.activities.filter((a) => a.id !== id)]
        this.setLoading(false)
      })
    } catch (error) {
      console.error(error)
      this.setLoading(false)
    }
  }

  setLoading = (state: boolean) => {
    this.loading = state
  }

  closeForm = () => {
    this.setEditMode(false)
  }
}
