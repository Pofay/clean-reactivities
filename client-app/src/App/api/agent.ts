import { PaginatedResult } from 'App/models/interfaces/pagination';
import { Photo, UserProfile } from 'App/models/interfaces/profile';
import { store } from 'App/stores/store';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import { history } from '../..';
import { Activity, ActivityFormValues } from '../models/interfaces/activity';
import { User, UserFormValues } from '../models/interfaces/user';

const sleep = (delay: number) =>
  new Promise((resolve) => {
    setTimeout(resolve, delay);
  });

axios.defaults.baseURL = 'http://localhost:5272/api';

axios.interceptors.request.use((config) => {
  const token = store.commonStore.token;
  if (token && config.headers) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

axios.interceptors.response.use(
  async (response) => {
    await sleep(1000);
    const pagination = response.headers['pagination'];
    if (pagination) {
      response.data = new PaginatedResult(
        response.data,
        JSON.parse(pagination)
      );
      return response as AxiosResponse<PaginatedResult<any>>;
    }
    return response;
  },
  (error: AxiosError) => {
    const { data, status, config } = error.response!;
    console.log(error.response);
    switch (status) {
      case 400:
        if (typeof data === 'string') {
          toast.error(data);
        }
        // @ts-ignore
        if (config.method === 'get' && data.errors.hasOwnProperty('id')) {
          history.push('/not-found');
        }
        // @ts-ignore
        if (data.errors) {
          // @ts-ignore
          const validationErrors = Object.values(data.errors);
          // @ts-ignore
          throw validationErrors.flat();
        } else {
          // @ts-ignore
          toast.error(data);
        }
        break;
      case 401:
        toast.error('unauthorized');
        break;
      case 404:
        toast.error('not found');
        history.push('/not-found');
        break;
      case 500:
        toast.error('server error');
        // @ts-ignore
        store.commonStore.setServerError(data);
        history.push('/server-error');
        break;
    }
    return Promise.reject(error);
  }
);

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const requests = {
  get: <T>(url: string) => axios.get<T>(url).then(responseBody),
  post: <T>(url: string, body: {}) =>
    axios.post<T>(url, body).then(responseBody),
  put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
  delete: <T>(url: string) => axios.delete<T>(url).then(responseBody),
};

const Activities = {
  list: (params: URLSearchParams) =>
    axios
      .get<PaginatedResult<Activity[]>>('/activities', { params })
      .then(responseBody),
  details: (id: string) => requests.get<Activity>(`/activities/${id}`),
  create: (activity: ActivityFormValues) =>
    requests.post<void>('/activities', activity),
  update: (activity: ActivityFormValues) =>
    requests.put<void>(`/activities/${activity.id}`, activity),
  delete: (id: string) => requests.delete(`/activities/${id}`),
  attend: (id: string) => requests.post(`/activities/${id}/attend`, {}),
};

const Profiles = {
  get: (userName: string) => requests.get<UserProfile>(`/profiles/${userName}`),
  updateProfile: (displayName: string, bio?: string | undefined) =>
    requests.put(`/profiles`, { displayName, bio }),

  uploadPhoto: (file: Blob) => {
    let formData = new FormData();
    formData.append('File', file);
    return axios.post<Photo>('photos', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
  setMainPhoto: (id: string) => requests.post(`/photos/${id}/setMain`, {}),
  deletePhoto: (id: string) => requests.delete(`/photos/${id}`),
  updateFollowing: (userName: string) =>
    requests.post(`/follow/${userName}`, {}),
  listFollowings: (userName: string, predicate: string) =>
    requests.get<UserProfile[]>(`/follow/${userName}?predicate=${predicate}`),
};

const Account = {
  current: () => requests.get<User>('/account'),
  login: (user: UserFormValues) => requests.post<User>('/account/login', user),
  register: (user: UserFormValues) =>
    requests.post<User>('/account/register', user),
};

const agent = {
  Activities,
  Account,
  Profiles,
};

export default agent;
