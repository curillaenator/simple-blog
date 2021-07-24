import type { ReactNode, SyntheticEvent } from "react";
import type { AnyAction, ThunkAction } from "@reduxjs/toolkit";
import type { TState } from "../redux/store";

// COMMON

export interface IUser {
  id: string;
  username?: string;
  avatar?: string;
  role: string;
}

export interface INewPost {
  title: string;
  text: string;
  headPhoto: File | null;
}

export interface IPosts {
  id: string;
  title: string;
  text: string;
  date: string;
  headPhoto: string;
  likes?: string[];
}

// universal dropdown option
export interface IDropOption {
  id: string;
  danger: boolean;
  icon: ReactNode;
  title: string;
  handler: () => void;
}

export interface ITextInput {
  name: string;
  value: string;
  label: string;
  placeholder?: string;
  autoComplete?: boolean;
  onChange: (value: string) => void;
}

// REDUX & STATE

export type TReducer<S, A = AnyAction> = (state: S, action: A) => S; // localc state reducer
export type TAction<P> = (payload: P) => { type: string; payload: P }; // action creator
export type TThunk = ThunkAction<void, TState, unknown, AnyAction>; // thunk

// EVENTS

export type TEventHandler<E extends SyntheticEvent<any>> = (event: E) => void;
