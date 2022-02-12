import Post, { Comment } from '../../../post/post.interface';
import { PostActionType } from './post.action-types';

export type PostState = {
  isLoading: boolean;
  isSinglePostLoading: boolean;
  error: any | null;
  posts: Post[] | null;
  singlePost: Post | null;
  postIdToEdit: string | null;
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

export interface likePostSuccess {
  type: PostActionType.LIKE_POST_SUCCESS;
  payload: {
    postId: string;
  };
}

export interface likePostFailed {
  type: PostActionType.LIKE_POST_FAILED;
  payload: {
    error: any;
  };
}

export interface unlikePostSuccess {
  type: PostActionType.UNLIKE_POST_SUCCESS;
  payload: {
    postId: string;
  };
}

export interface unlikePostFailed {
  type: PostActionType.UNLIKE_POST_FAILED;
  payload: {
    error: any;
  };
}

export interface commentPostStart {
  type: PostActionType.COMMENT_POST_START;
  payload: {
    postId: string;
  }
}

export interface commentPostSuccess {
  type: PostActionType.COMMENT_POST_SUCCESS;
  payload: {
    comment: Comment,
  };
}

export interface commentPostFailed {
  type: PostActionType.COMMENT_POST_FAILED;
  payload: {
    error: any;
  };
}

export type PostAction =
  | fetchPostsStart
  | fetchPostsSuccess
  | fetchPostsFailed
  | likePostFailed
  | likePostSuccess
  | unlikePostSuccess
  | unlikePostFailed
  | commentPostStart
  | commentPostSuccess
  | commentPostFailed;
