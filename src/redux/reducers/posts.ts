import { createSlice } from "@reduxjs/toolkit";
import { batch } from "react-redux";
import { postsApi, storageApi } from "../../api/api";

import type { IPosts, INewPost, IEditPost, TThunk } from "../../types/types";
import type { PayloadAction } from "@reduxjs/toolkit";

interface IPostsState {
  isPending: boolean;
  posts: IPosts[];
}

const initialState: IPostsState = {
  isPending: false,
  posts: [],
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setIsPending: (state, action: PayloadAction<boolean>) => {
      state.isPending = action.payload;
    },
    setPosts: (state, action: PayloadAction<IPosts[]>) => {
      state.posts = action.payload;
    },
  },
});

export const posts = postsSlice.reducer;

export const { setIsPending, setPosts } = postsSlice.actions;

// THUNKS

export const getAuthoredPosts = (): TThunk => async (dispatch, getState) => {
  dispatch(setIsPending(true));

  const userID = getState().auth.user.id;
  const posts: IPosts[] = await postsApi.getPosts(userID);

  batch(() => {
    dispatch(setPosts(posts));
    dispatch(setIsPending(false));
  });
};

export const createAuthoredPost = (payload: INewPost): TThunk => {
  return async (dispatch, getState) => {
    dispatch(setIsPending(true));

    const userID = getState().auth.user.id;
    const newPost = await postsApi.createNewPost(userID, payload);

    if (!newPost) {
      dispatch(setIsPending(false));
      return console.log("Post create error");
    } // TODO handle errors in UI

    if (newPost) {
      const headPhoto = await storageApi.getImage(newPost.headPhoto);
      const posts = [{ ...newPost, headPhoto }, ...getState().posts.posts];

      batch(() => {
        dispatch(setPosts(posts));
        dispatch(setIsPending(false));
      });
    }
  };
};

export const removeAuthoredPost = (post: IPosts): TThunk => {
  return async (dispatch, getState) => {
    dispatch(setIsPending(true));

    const userID = getState().auth.user.id;

    const postRemoved = await postsApi.removePost(userID, post);

    if (!postRemoved) {
      dispatch(setIsPending(false));
      return console.log("Post delete error");
    } // TODO handle errors in UI

    if (postRemoved) {
      const posts = getState().posts.posts.filter((p) => p.id !== post.id);

      batch(() => {
        dispatch(setPosts(posts));
        dispatch(setIsPending(false));
      });
    }
  };
};

export const editAuthoredPost = (payload: IEditPost): TThunk => {
  return async (dispatch, getState) => {
    dispatch(setIsPending(true));

    const userID = getState().auth.user.id;

    const editPost = await postsApi.editPost(userID, payload);

    if (!editPost) {
      dispatch(setIsPending(false));
      return console.log("Post edit error");
    } // TODO handle errors in UI

    if (editPost) {
      const headPhoto = await storageApi.getImage(editPost.headPhoto);

      const posts = [...getState().posts.posts];
      const editPostToState = { ...editPost, headPhoto };
      const index = posts.findIndex((post) => post.id === editPost.id);

      posts.splice(index, 1, editPostToState);

      batch(() => {
        dispatch(setPosts(posts));
        dispatch(setIsPending(false));
      });
    }
  };
};
