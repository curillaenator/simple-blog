import { AnyAction, ThunkAction } from "@reduxjs/toolkit";
import { TState } from "../redux/store";

// COMMON

export interface IPhoto {
  width: number;
  height: number;
  src: string;
}

export interface IUser {
  id: string | null;
  username?: string;
  avatar?: string;
  role: string;
}

export interface IPosts {
  id: string;
  title: string;
  text: string;
  headPhoto: string;
  photos: IPhoto[];
  date: string;
}

// REDUX & STATE

export interface IInitialState {
  initialize: boolean;
  user: IUser;
  posts: IPosts[];
}

export interface IAction {
  type: string;
  payload: any;
}

export type TReducer<S, A = AnyAction> = (state: S, action: A) => S;
export type TAction<P> = (payload: P) => { type: string; payload: P };
export type TThunk = ThunkAction<void, TState, unknown, AnyAction>;
