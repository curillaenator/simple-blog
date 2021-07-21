import { ReactNode } from "react";
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
  date: string;
}

export interface IDropOption {
  id: string;
  icon: ReactNode;
  title: string;
  handler: () => void;
}

// REDUX & STATE

export interface IInitialState {
  initialized: boolean;
  user: IUser;
  usermenu: boolean;
  posts: IPosts[];
}

export interface IAction {
  type: string;
  payload: any;
}

export type TReducer<S, A = AnyAction> = (state: S, action: A) => S;
export type TAction<P> = (payload: P) => { type: string; payload: P };
export type TThunk = ThunkAction<void, TState, unknown, AnyAction>;
