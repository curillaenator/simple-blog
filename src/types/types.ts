import type { ReactNode, SyntheticEvent } from "react";
import type { AnyAction, ThunkAction } from "@reduxjs/toolkit";
import type { TState } from "../redux/store";

// COMMON

export interface IUser {
  id: string | null;
  username?: string;
  avatar?: string;
  role: string;
}

// single post
export interface IPosts {
  id: string;
  title: string;
  text: string;
  headPhoto: string;
  date: string;
}

// universal dropdown option
export interface IDropOption {
  id: string;
  icon: ReactNode;
  title: string;
  handler: () => void;
}

// REDUX & STATE

// main reducer initial state
export interface IInitialState {
  initialized: boolean;
  user: IUser;
  posts: IPosts[];
}

export type TReducer<S, A = AnyAction> = (state: S, action: A) => S; // localc state reducer
export type TAction<P> = (payload: P) => { type: string; payload: P }; // action creator
export type TThunk = ThunkAction<void, TState, unknown, AnyAction>; // thunk

// EVENTS

export type TEventHandler<E extends SyntheticEvent<any>> = (event: E) => void;
