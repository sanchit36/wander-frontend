import api from '../../../api';
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
      dispatch({
        type: PostActionType.FETCH_POSTS_SUCCESS,
        payload: { posts: data.payload },
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
