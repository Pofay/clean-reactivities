import agent from 'App/api/agent';
import { UserProfile } from 'App/models/interfaces/profile';
import { store } from 'App/stores/store';
import { makeAutoObservable, runInAction } from 'mobx';

export default class UserProfileStore {
  profile: UserProfile | null = null;
  loadingProfile = false;
  uploading = false;

  constructor() {
    makeAutoObservable(this);
  }

  get isCurrentUser() {
    return store.userStore.user!.userName === this.profile!.userName;
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

  uploadPhoto = async (file: Blob) => {
    this.uploading = true;
    try {
      const response = await agent.Profiles.uploadPhoto(file);
      const photo = response.data;
      runInAction(() => {
        if (this.profile) {
          this.profile.photos?.push(photo);
          if (photo.isMain && store.userStore.user) {
            store.userStore.setImage(photo.url);
            this.profile.image = photo.url;
          }
        }
        this.uploading = false;
      });
    } catch (error) {
      console.error(error);
      runInAction(() => (this.uploading = false));
    }
  };
}
