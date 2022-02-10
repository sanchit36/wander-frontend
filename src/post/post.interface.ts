import { User } from '../user/user.interface';

export interface Reply {
  comment: string;
  user: User;
  content: string;
  likes: string[];
}

export interface Comment {
  post: string;
  user: User;
  content: string;
  likes: string[];
  replies: Reply[];
}

export default interface Post {
  _id: string;
  description: string;
  image: string;
  address?: string;
  location?: {
    lat: number;
    lng: number;
  };
  creator: User;
  likes: string[];
  comments: Comment[];
}
