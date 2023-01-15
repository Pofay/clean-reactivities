import { makeAutoObservable } from 'mobx';
import agent from '../api/agent';
import { Utils } from '../common/utils/utils';
import { User, UserFormValues } from '../models/interfaces/user';

export default class UserStore {
  user: User | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  get isLoggedIn() {
    return !Utils.isNullOrUndefined(this.user);
  }

  login = async (creds: UserFormValues) => {
    try {
      const user = await agent.Account.login(creds);
      console.table(user);
    } catch (error) {
      throw error;
    }
  };
}
