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
import strapMaterialApi, {
  strapMaterialReducer,
} from "../services/strapMaterial";
import colorApi, { colorReducer } from "../services/color";
import compartmentApi, { compartmentReducer } from "../services/compartment";
import productTypeApi, { productTypeReducer } from "../services/productType";
import lockTypeApi, { lockTypeReducer } from "../services/lockType";
import hangApi, { hangReducer } from "../services/hang";

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
  [strapMaterialApi.reducerPath]: strapMaterialReducer,
  [colorApi.reducerPath]: colorReducer,
  [compartmentApi.reducerPath]: compartmentReducer,
  [productTypeApi.reducerPath]: productTypeReducer,
  [lockTypeApi.reducerPath]: lockTypeReducer,
  [hangApi.reducerPath]: hangReducer,
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
      hangApi.middleware,
      lockTypeApi.middleware,
      productTypeApi.middleware,
      patternApi.middleware,
      sizeApi.middleware,
      sizeeApi.middleware,
      brandApi.middleware,
      materialApi.middleware,
      strapMaterialApi.middleware,
      compartmentApi.middleware,
      colorApi.middleware
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
