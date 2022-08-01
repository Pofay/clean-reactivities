import { format, parseISO } from 'date-fns/fp'
import { pipe } from 'fp-ts/lib/function'
import { makeAutoObservable } from 'mobx'
import agent from '../api/agent'
import { Activity } from '../models/interfaces/activity'

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

  closeForm = () => {
    this.setEditMode(false)
  }
}
