import { batch } from "react-redux";
import { api } from "../../api/api";

import { guest } from "../../fixedcontent/fixedcontent";

import type { Reducer, AnyAction } from "@reduxjs/toolkit";
import type {
  IPosts,
  INewPost,
  IUser,
  IInitialState,
  TAction,
  TThunk,
} from "../../types/types";

const SET_INITIALIZE = "main/SET_INITIALIZE";
const SET_CURRENT_USER = "main/SET_CURRENT_USER";
const SET_POSTS = "main/SET_POSTS";

const initialState: IInitialState = {
  initialized: false,
  user: guest,
  posts: [],
};

export const main: Reducer<IInitialState, AnyAction> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case SET_INITIALIZE:
      return { ...state, initialized: action.payload };

    case SET_CURRENT_USER:
      return { ...state, user: action.payload };

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

const setUser: TAction<IUser> = (payload) => ({
  type: SET_CURRENT_USER,
  payload,
});

const setPosts: TAction<IPosts[]> = (payload) => ({
  type: SET_POSTS,
  payload,
});

// THUNKS

export const initializeApp = (): TThunk => async (dispatch) => {
  const user: IUser = await api.isUserAuthed();

  batch(() => {
    dispatch(setUser(user));
    dispatch(setInitialize(true));
  });
};

export const signInWithGoogle = (): TThunk => async (dispatch) => {
  const user: IUser = await api.signInWithGoogle();
  const isNewUser: boolean = await api.createUserInDB(user);
  console.log(isNewUser);

  batch(() => {
    dispatch(setUser(user));
  });
};

export const logOut = (): TThunk => async (dispatch) => {
  const isLogOut: boolean = await api.logOut();

  if (isLogOut) {
    batch(() => {
      dispatch(setUser(guest));
    });
  }
};

export const getAuthoredPosts = (): TThunk => async (dispatch) => {
  const posts: IPosts[] = await api.getPosts();

  batch(() => {
    dispatch(setPosts(posts));
  });
};

export const createAuthoredPost = (payload: INewPost): TThunk => async (dispatch) => {

};
