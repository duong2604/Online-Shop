import {
  Action,
  combineReducers,
  configureStore,
  ThunkAction,
} from "@reduxjs/toolkit";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import patternApi, { patternReducer } from "../services/pattern";
import sizeApi, { sizeReducer } from "../services/kich_co";
import sizeeApi, { sizeeReducer } from "../services/kich_thuoc";
import brandApi, { brandReducer } from "../services/brand";
import materialApi, { materialReducer } from "../services/material";

const persistConfig = {
  key: "root",
  storage,
  whitelist: [],
};

const rootReducer = combineReducers({
  [patternApi.reducerPath]: patternReducer,
  [sizeApi.reducerPath]: sizeReducer,
  [sizeeApi.reducerPath]: sizeeReducer,
  [brandApi.reducerPath]: brandReducer,
  [materialApi.reducerPath]: materialReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(
      patternApi.middleware,
      sizeApi.middleware,
      sizeeApi.middleware,
      brandApi.middleware,
      materialApi.middleware
    ),
});

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export default persistStore(store);
