import { configureStore } from "@reduxjs/toolkit";

import { main } from "../redux/reducers/main";

export const store = configureStore({ reducer: { main } });

export type TState = ReturnType<typeof store.getState>;
export type TDispatch = typeof store.dispatch;

(window as any).store = store;
