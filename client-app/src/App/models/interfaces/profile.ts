import { User } from './user';

export interface UserProfile {
  userName: string;
  displayName: string;
  image?: string;
  bio?: string;
}

export const createProfileFromUser = (user: User): UserProfile => {
  return {
    userName: user.userName,
    displayName: user.displayName,
    image: user.image,
  };
};
