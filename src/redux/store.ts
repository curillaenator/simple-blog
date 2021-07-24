import { configureStore } from "@reduxjs/toolkit";

import { auth } from "./reducers/auth";
import { posts } from "./reducers/posts";

export const store = configureStore({ reducer: { auth, posts } });

export type TState = ReturnType<typeof store.getState>;
export type TDispatch = typeof store.dispatch;

(window as any).store = store;
