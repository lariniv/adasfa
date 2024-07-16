"use client";
import { useRef } from "react";
import { Provider } from "react-redux";
import { makeStore, AppStore } from "../store/store";
import { getAllVendors } from "../store/vendors/vendor-thunks";

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const storeRef = useRef<AppStore>();
  if (!storeRef.current) {
    storeRef.current = makeStore();
    storeRef.current.dispatch(getAllVendors());
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}
