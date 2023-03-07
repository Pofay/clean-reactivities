import { UserProfile } from './profile';

export interface Activity {
  id: string;
  title: string;
  date: Date | null;
  description: string;
  category: string;
  city: string;
  venue: string;
  hostUsername?: string;
  isCancelled: boolean;
  isGoing: boolean;
  isHost: boolean;
  host?: UserProfile;
  attendees: UserProfile[];
}

export interface UserActivity {
  id: string;
  title: string;
  category: string;
  date: Date | null;
}

export const createNewActivity = (
  formValues: ActivityFormValues,
  hostUsername: string,
  attendees: UserProfile[]
): Activity => {
  const partialActivity = Object.assign({}, formValues);
  return {
    ...partialActivity,
    hostUsername: hostUsername,
    attendees: attendees,
    isGoing: false,
    isHost: false,
    isCancelled: false,
  };
};

export const mapToFormValues = (activity: Activity): ActivityFormValues => {
  return {
    id: activity.id,
    title: activity.title,
    date: activity.date,
    description: activity.description,
    category: activity.category,
    city: activity.city,
    venue: activity.venue,
  };
};

export interface ActivityFormValues {
  id: string;
  title: string;
  date: Date | null;
  description: string;
  category: string;
  city: string;
  venue: string;
}
