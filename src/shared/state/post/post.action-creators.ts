import api from '../../../api';
import Post from '../../../post/post.interface';
import { AppDispatch } from '../store';
import { PostActionType } from './post.action-types';

export const fetchPosts = () => {
  return async (dispatch: AppDispatch) => {
    dispatch({
      type: PostActionType.FETCH_POSTS_START,
    });

    try {
      const response = await api.get('/posts');
      const data = response.data;
      const posts = data.payload.map((post: Post) => ({...post, likeCount: post.likes.length}));

      dispatch({
        type: PostActionType.FETCH_POSTS_SUCCESS,
        payload: { posts: posts },
      });
    } catch (error: any) {
      let errorData = error && error.response && error.response.data;
      dispatch({
        type: PostActionType.FETCH_POSTS_FAILED,
        payload: { error: errorData },
      });
    }
  };
};

export const likePost = (postId: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      await api.patch(`/posts/${postId}/like`);
      dispatch({
        type: PostActionType.LIKE_POST_SUCCESS,
        payload: { postId },
      });
    } catch (error: any) {
      let errorData = error && error.response && error.response.data;
      dispatch({
        type: PostActionType.LIKE_POST_FAILED,
        payload: { error: errorData },
      });
    }
  };
};

export const unlikePost = (postId: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      await api.patch(`/posts/${postId}/unlike`);
      dispatch({
        type: PostActionType.UNLIKE_POST_SUCCESS,
        payload: { postId },
      });
    } catch (error: any) {
      let errorData = error && error.response && error.response.data;
      dispatch({
        type: PostActionType.UNLIKE_POST_FAILED,
        payload: { error: errorData },
      });
    }
  };
};


export const commentPost = (postId: string, content: string) => {
  return async (dispatch: AppDispatch) => {
    dispatch({
      type: PostActionType.COMMENT_POST_START,
      payload: {postId}
    });
    try {
      const response = await api.post(`/comments`, {postId,content});
      const data = response.data;
      dispatch({
        type: PostActionType.COMMENT_POST_SUCCESS,
        payload: { comment: data.payload },
      });
    } catch (error: any) {
      let errorData = error && error.response && error.response.data;
      dispatch({
        type: PostActionType.COMMENT_POST_FAILED,
        payload: { error: errorData },
      });
    }
  }
}