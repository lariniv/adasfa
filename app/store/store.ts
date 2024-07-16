import { configureStore } from "@reduxjs/toolkit";
import vendorReducer from "./vendors/vendor-slice";

export const store = configureStore({
  reducer: {
    vendor: vendorReducer,
  },
});

export const makeStore = () => {
  return configureStore({
    reducer: {
      vendor: vendorReducer,
    },
  });
};

export type RootState = ReturnType<typeof store.getState>;
export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = typeof store.dispatch;
