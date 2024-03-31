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
import categoryApi, { categoryReducer } from "../services/category";
import newsApi, { newsReducer } from "../services/news";
import discountCodeApi, { discountCodeReducer } from "../services/discountCode";
import roleApi, { roleReducer } from "../services/role";
import userApi, { userReducer } from "../services/user";
import clientApi, { clientReducer } from "../services/client";
import contactApi, { contactReducer } from "../services/contact";
import commentStatusApi, {
  commentStatusReducer,
} from "../services/commentStatus";
import commentApi, { commentReducer } from "../services/comment";
import staffApi, { staffReducer } from "../services/staff";
import productApi, { productReducer } from "../services/product";
import billApi, { billReducer } from "../services/bill";
import saleApi, { saleReducer } from "../services/sale";

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
  [categoryApi.reducerPath]: categoryReducer,
  [newsApi.reducerPath]: newsReducer,
  [discountCodeApi.reducerPath]: discountCodeReducer,
  [roleApi.reducerPath]: roleReducer,
  [userApi.reducerPath]: userReducer,
  [clientApi.reducerPath]: clientReducer,
  [contactApi.reducerPath]: contactReducer,
  [commentStatusApi.reducerPath]: commentStatusReducer,
  [commentApi.reducerPath]: commentReducer,
  [staffApi.reducerPath]: staffReducer,
  [productApi.reducerPath]: productReducer,
  [billApi.reducerPath]: billReducer,
  [saleApi.reducerPath]: saleReducer,
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
      saleApi.middleware,
      billApi.middleware,
      productApi.middleware,
      staffApi.middleware,
      commentApi.middleware,
      commentStatusApi.middleware,
      contactApi.middleware,
      clientApi.middleware,
      userApi.middleware,
      roleApi.middleware,
      discountCodeApi.middleware,
      newsApi.middleware,
      categoryApi.middleware,
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
