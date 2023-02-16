import ActivityStore from 'App/stores/activityStore';
import CommentStore from 'App/stores/commentStore';
import CommonStore from 'App/stores/commonStore';
import ModalStore from 'App/stores/modalStore';
import UserProfileStore from 'App/stores/userProfileStore';
import UserStore from 'App/stores/userStore';
import { createContext, useContext } from 'react';

interface Store {
  activityStore: ActivityStore;
  commonStore: CommonStore;
  userStore: UserStore;
  commentStore: CommentStore;
  modalStore: ModalStore;
  userProfileStore: UserProfileStore;
}

export const store: Store = {
  activityStore: new ActivityStore(),
  commonStore: new CommonStore(),
  userStore: new UserStore(),
  commentStore: new CommentStore(),
  modalStore: new ModalStore(),
  userProfileStore: new UserProfileStore(),
};

export const StoreContext = createContext(store);

export function useStore() {
  return useContext(StoreContext);
}
