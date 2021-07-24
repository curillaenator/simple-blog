import { createSlice } from "@reduxjs/toolkit";
import { batch } from "react-redux";
import { postsApi, storageApi } from "../../api/api";

import type { IPosts, INewPost, TThunk } from "../../types/types";
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

const { setIsPending, setPosts } = postsSlice.actions;

// THUNKS

export const getAuthoredPosts = (): TThunk => async (dispatch) => {
  dispatch(setIsPending(true));

  const posts: IPosts[] = await postsApi.getPosts();

  batch(() => {
    dispatch(setPosts(posts));
    dispatch(setIsPending(false));
  });
};

export const createAuthoredPost = (payload: INewPost): TThunk => {
  return async (dispatch, getState) => {
    dispatch(setIsPending(true));

    const userID = getState().main.user.id;
    const newPost = await postsApi.createNewPost(userID, payload);

    if (!newPost) return console.log("Post create error");

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
