import { PostActionType } from './post.action-types';
import { PostAction, PostState } from './post.types';

const initialState: PostState = {
  isLoading: false,
  isSinglePostLoading: false,
  error: null,
  posts: null,
  singlePost: null,
  postIdToEdit: null,
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
    case PostActionType.LIKE_POST_SUCCESS:
      return {
        ...state,
        posts: state.posts ?
               state.posts.map(post => post._id === action.payload.postId ? {...post, isLiked: true, likeCount: post.likeCount + 1} : post)
               : null,
        singlePost: state.singlePost ?
                    state.singlePost._id  === action.payload.postId ? {...state.singlePost, isLiked: true, likeCount: state.singlePost.likeCount + 1}: state.singlePost
                    : null,
      }
    case PostActionType.LIKE_POST_FAILED:
      return{
        ...state,
        error: action.payload.error,
      }
    case PostActionType.UNLIKE_POST_SUCCESS:
      return {
        ...state,
        posts: state.posts ?
               state.posts.map(post => post._id === action.payload.postId ? {...post, isLiked: false,  likeCount: post.likeCount - 1} : post)
               : null,
        singlePost: state.singlePost ?
                    state.singlePost._id  === action.payload.postId ? {...state.singlePost, isLiked: false, likeCount: state.singlePost.likeCount - 1}: state.singlePost
                    : null,
      }
    case PostActionType.UNLIKE_POST_FAILED:
      return{
        ...state,
        error: action.payload.error,
      }
    case PostActionType.COMMENT_POST_START:
      return {
        ...state,
        postIdToEdit: action.payload.postId,
      }
    case PostActionType.COMMENT_POST_SUCCESS:
      return {
        ...state,
        postIdToEdit: null,
        posts: state.posts ?
                state.posts.map((post) => post._id === action.payload.comment.post ? {...post, comments: [...post.comments, action.payload.comment]} : post)
                : null,
        singlePost: state.singlePost ?
                state.singlePost._id === action.payload.comment.post ? {...state.singlePost, comments: [...state.singlePost.comments, action.payload.comment]} : state.singlePost
                : null,
      }
    default:
      return state;
  }
};

export default postReducer;
