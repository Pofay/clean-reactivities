import { User } from 'App/models/interfaces/user';

export interface UserProfile {
  userName: string;
  displayName: string;
  image?: string;
  bio?: string;
  photos?: Photo[];
}

export const createProfileFromUser = (user: User): UserProfile => {
  return {
    userName: user.userName,
    displayName: user.displayName,
    image: user.image,
  };
};

export interface Photo {
  id: string;
  url: string;
  isMain: boolean;
}
