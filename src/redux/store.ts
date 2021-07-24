import { configureStore } from "@reduxjs/toolkit";

import { main } from "../redux/reducers/main";
import { posts } from "./reducers/posts";

export const store = configureStore({ reducer: { main, posts } });

export type TState = ReturnType<typeof store.getState>;
export type TDispatch = typeof store.dispatch;

(window as any).store = store;
