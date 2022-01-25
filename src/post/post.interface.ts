import { User } from '../user/user.interface';

export default interface Post {
  _id: string;
  description: string;
  image: string;
  creator: User;
}
