import { createSlice } from "@reduxjs/toolkit";
import { batch } from "react-redux";
import { authApi } from "../../api/api";

import { guest } from "../../fixedcontent/fixedcontent";

import type { IUser, TThunk } from "../../types/types";
import type { PayloadAction } from "@reduxjs/toolkit";

interface IAuthState {
  initialized: boolean;
  user: IUser;
}

const initialState: IAuthState = {
  initialized: false,
  user: guest,
};

const mainSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setInitialize: (state, action: PayloadAction<boolean>) => {
      state.initialized = action.payload;
    },
    setUser: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload;
    },
  },
});

export const auth = mainSlice.reducer;

// ACTIONS

const { setInitialize, setUser } = mainSlice.actions;

// THUNKS

export const initializeApp = (): TThunk => async (dispatch) => {
  const user: IUser = await authApi.isUserAuthed(); // if not returns "guest"

  batch(() => {
    dispatch(setUser(user));
    dispatch(setInitialize(true));
  });
};

export const signInWithGoogle = (): TThunk => async (dispatch) => {
  const user: IUser = await authApi.signInWithGoogle();
  const isNewUser: boolean = await authApi.createUserInDB(user);
  console.log("Are you new user? - ", isNewUser);

  batch(() => {
    dispatch(setUser(user));
  });
};

export const logOut = (): TThunk => async (dispatch) => {
  const isLogOut: boolean = await authApi.logOut();

  if (isLogOut) {
    batch(() => {
      dispatch(setUser(guest));
    });
  }
};
