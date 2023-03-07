import agent from 'App/api/agent';
import { UserActivity } from 'App/models/interfaces/activity';
import {
  Photo,
  UserProfile,
  UserProfileFormValues,
} from 'App/models/interfaces/profile';
import { store } from 'App/stores/store';
import { isThursday } from 'date-fns';
import { makeAutoObservable, reaction, runInAction } from 'mobx';
import { collapseTextChangeRangesAcrossMultipleVersions } from 'typescript';

export default class UserProfileStore {
  profile: UserProfile | null = null;
  loadingProfile = false;
  loading = false;
  uploading = false;
  followings: UserProfile[] = [];
  loadingFollowings = false;
  activeTab = 0;
  predicates = {
    3: 'followers',
    4: 'following',
  };
  userActivities: UserActivity[] = [];
  loadingUserActivities = false;

  constructor() {
    makeAutoObservable(this);

    reaction(
      () => this.activeTab,
      (activeTab: number) => {
        if (activeTab === 3 || activeTab === 4) {
          const predicate = this.predicates[activeTab];
          this.loadFollowings(predicate);
        } else {
          this.followings = [];
        }
      }
    );
  }

  setActiveTab = (activeTab: any) => {
    this.activeTab = activeTab;
  };

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

  setMainPhoto = async (photo: Photo) => {
    this.loading = true;
    try {
      await agent.Profiles.setMainPhoto(photo.id);
      store.userStore.setImage(photo.url);
      runInAction(() => {
        if (this.profile && this.profile.photos) {
          this.profile.photos.find((p) => p.isMain)!.isMain = false;
          this.profile.photos.find((p) => p.id === photo.id)!.isMain = true;
          this.profile.image = photo.url;
          this.loading = false;
        }
      });
    } catch (error) {
      console.error(error);
      runInAction(() => (this.loading = false));
    }
  };

  deletePhoto = async (photo: Photo) => {
    this.loading = true;
    try {
      await agent.Profiles.deletePhoto(photo.id);
      runInAction(() => {
        if (this.profile) {
          this.profile.photos = this.profile.photos?.filter(
            (p) => p.id !== photo.id
          );
          this.loading = false;
        }
      });
    } catch (error) {
      console.error(error);
      runInAction(() => (this.loading = false));
    }
  };

  updateProfile = async (formValues: UserProfileFormValues) => {
    this.loading = true;
    try {
      await agent.Profiles.updateProfile(
        formValues.displayName,
        formValues.bio
      );
      runInAction(() => {
        if (this.profile) {
          this.profile = {
            ...this.profile,
            displayName: formValues.displayName,
            bio: formValues.bio,
          };
        }
        store.userStore.setDisplayName(formValues.displayName);
        this.loading = false;
      });
    } catch (error) {
      console.error(error);
      runInAction(() => (this.loading = false));
    }
  };

  updateFollowing = async (userName: string, following: boolean) => {
    this.loading = true;
    try {
      await agent.Profiles.updateFollowing(userName);
      store.activityStore.updateAttendeeFollowing(userName);
      runInAction(() => {
        if (
          this.profile &&
          this.profile.userName !== store.userStore.user?.userName &&
          this.profile.userName === userName
        ) {
          following
            ? this.profile.followersCount++
            : this.profile.followersCount--;
          this.profile.following = !this.profile.following;
        }
        if (
          this.profile &&
          this.profile.userName === store.userStore.user?.userName
        ) {
          following
            ? this.profile.followingCount++
            : this.profile.followingCount--;
        }
        this.followings.forEach((profile) => {
          if (profile.userName === userName) {
            profile.following
              ? profile.followersCount--
              : profile.followersCount++;
            profile.following = !profile.following;
          }
        });
        this.loading = false;
      });
    } catch (error) {
      console.error(error);
      runInAction(() => (this.loading = false));
    }
  };

  loadFollowings = async (predicate: string) => {
    this.loadingFollowings = true;
    try {
      const followings = await agent.Profiles.listFollowings(
        this.profile!.userName,
        predicate
      );
      runInAction(() => {
        this.followings = followings;
        this.loadingFollowings = false;
      });
    } catch (error) {
      console.error(error);
      runInAction(() => (this.loadingFollowings = false));
    }
  };

  loadUserActivities = async (
    userName: string,
    predicate: string = 'future'
  ) => {
    this.loadingUserActivities = true;
    try {
      const userActivities = await agent.Profiles.listUserActivities(
        userName,
        predicate
      );
      runInAction(() => {
        this.userActivities = userActivities;
        this.loadingUserActivities = false;
      });
    } catch (error) {
      console.error(error);
      runInAction(() => (this.loadingUserActivities = false));
    }
  };
}
