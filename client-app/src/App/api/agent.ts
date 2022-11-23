import axios, { AxiosError, AxiosResponse } from 'axios'
import { toast } from 'react-toastify'
import { history } from '../..'
import { Activity } from '../models/interfaces/activity'

const sleep = (delay: number) =>
  new Promise((resolve) => {
    setTimeout(resolve, delay)
  })

axios.defaults.baseURL = 'http://localhost:5272/api'

axios.interceptors.response.use(
  async (response) => {
    await sleep(1000)
    return response
  },
  (error: AxiosError) => {
    const { data, status } = error.response!
    switch (status) {
      case 400:
        // @ts-ignore
        if (data.errors) {
          // @ts-ignore
          const validationErrors = Object.values(data.errors)
          // @ts-ignore
          throw validationErrors.flat()
        } else {
          // @ts-ignore
          toast.error(data)
        }
        break
      case 401:
        toast.error('unauthorized')
        break
      case 404:
        toast.error('not found')
        history.push('/not-found')
        break
      case 500:
        toast.error('server error')
        break
    }
    return Promise.reject(error)
  }
)

const responseBody = <T>(response: AxiosResponse<T>) => response.data

const requests = {
  get: <T>(url: string) => axios.get<T>(url).then(responseBody),
  post: <T>(url: string, body: {}) =>
    axios.post<T>(url, body).then(responseBody),
  put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
  delete: <T>(url: string) => axios.delete<T>(url).then(responseBody),
}

const Activities = {
  list: () => requests.get<Activity[]>('/activities'),
  details: (id: string) => requests.get<Activity>(`/activities/${id}`),
  create: (activity: Activity) => requests.post('/activities', activity),
  update: (activity: Activity) =>
    requests.put(`/activities/${activity.id}`, activity),
  delete: (id: string) => requests.delete(`/activities/${id}`),
}

const agent = {
  Activities,
}

export default agent
