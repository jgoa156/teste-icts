import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import userReducer from "./slicer/user";
import timerReducer from "./slicer/timer";

// User
const persistedUserReducer = persistReducer({
  key: "user",
  storage
}, userReducer);

// Timer
const persistedTimerReducer = persistReducer({
  key: "timer",
  storage
}, timerReducer);

const store = configureStore({
  reducer: {
    user: persistedUserReducer,
    timer: persistedTimerReducer
  },
});

const persistor = persistStore(store);

export { store, persistor };

export type IRootState = ReturnType<typeof store.getState>;