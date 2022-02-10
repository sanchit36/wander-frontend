import Post from '../../../post/post.interface';
import { PostActionType } from './post.action-types';

export type PostState = {
  isLoading: boolean;
  isSinglePostLoading: boolean;
  error: any | null;
  posts: Post[] | null;
  singlePost: Post | null;
};

export interface fetchPostsStart {
  type: PostActionType.FETCH_POSTS_START;
}

export interface fetchPostsSuccess {
  type: PostActionType.FETCH_POSTS_SUCCESS;
  payload: {
    posts: Post[];
  };
}

export interface fetchPostsFailed {
  type: PostActionType.FETCH_POSTS_FAILED;
  payload: {
    error: any;
  };
}

export type PostAction = fetchPostsStart | fetchPostsSuccess | fetchPostsFailed;
