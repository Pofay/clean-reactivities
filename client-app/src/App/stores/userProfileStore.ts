import agent from 'App/api/agent';
import { UserProfile } from 'App/models/interfaces/profile';
import { makeAutoObservable, runInAction } from 'mobx';

export default class UserProfileStore {
  profile: UserProfile | null = null;
  loadingProfile = false;

  constructor() {
    makeAutoObservable(this);
  }

  loadProfile = async (userName: string) => {
    this.loadingProfile = true;
    try {
      const profile = await agent.Profiles.get(userName);
      runInAction(() => {
        this.profile = profile;
        this.loadingProfile = false;
      });
    } catch (error) {
      console.error(error);
      runInAction(() => (this.loadingProfile = false));
    }
  };
}
