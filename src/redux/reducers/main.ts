import { batch } from "react-redux";
import { api } from "../../api/api";

import type { Reducer, AnyAction } from "@reduxjs/toolkit";
import type { IInitialState, TAction, TThunk, IPosts } from "../../types/types";

const SET_INITIALIZE = "main/SET_INITIALIZE";
const SET_POSTS = "main/SET_POSTS";

const initialState: IInitialState = {
  initialize: false,
  posts: [],
};

export const main: Reducer<IInitialState, AnyAction> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case SET_INITIALIZE:
      return { ...state, initialize: action.payload };

    case SET_POSTS:
      return { ...state, posts: action.payload };

    default:
      return state;
  }
};

// ACTION CREATORS

const setInitialize: TAction<boolean> = (payload) => ({
  type: SET_INITIALIZE,
  payload,
});

const setPosts: TAction<IPosts[]> = (payload) => ({
  type: SET_POSTS,
  payload,
});

// THUNKS

export const initializeApp = (): TThunk => async (dispatch) => {
  const posts = await api.getPosts();

  batch(() => {
    dispatch(setPosts(posts));
    dispatch(setInitialize(true));
  });
};
