import ActivityStore from 'App/stores/activityStore';
import CommonStore from 'App/stores/commonStore';
import ModalStore from 'App/stores/modalStore';
import UserStore from 'App/stores/userStore';
import { createContext, useContext } from 'react';

interface Store {
  activityStore: ActivityStore;
  commonStore: CommonStore;
  userStore: UserStore;
  modalStore: ModalStore;
}

export const store: Store = {
  activityStore: new ActivityStore(),
  commonStore: new CommonStore(),
  userStore: new UserStore(),
  modalStore: new ModalStore(),
};

export const StoreContext = createContext(store);

export function useStore() {
  return useContext(StoreContext);
}
