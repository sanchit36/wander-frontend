export interface User {
  _id: string;
  email: string;
  username: string;
  avatar: string;
  followers: string[];
  following: string[];
  bio: string;
  dateOfBirth?: string;
}
