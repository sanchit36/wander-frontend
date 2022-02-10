import { PostActionType } from './post.action-types';
import { PostAction, PostState } from './post.types';

const initialState: PostState = {
  isLoading: false,
  isSinglePostLoading: false,
  error: null,
  posts: null,
  singlePost: null,
};

const postReducer = (
  state: PostState = initialState,
  action: PostAction
): PostState => {
  switch (action.type) {
    case PostActionType.FETCH_POSTS_START:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case PostActionType.FETCH_POSTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        posts: action.payload.posts,
      };
    case PostActionType.FETCH_POSTS_FAILED:
      return {
        ...state,
        isLoading: false,
        error: action.payload.error,
        posts: null,
      };
    default:
      return state;
  }
};

export default postReducer;
