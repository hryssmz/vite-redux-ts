// app/hooks.ts
import {
  TypedUseSelectorHook,
  useDispatch as baseUseDispatch,
  useSelector as baseUseSelector,
} from "react-redux";

import type { RootState, Dispatch } from "./store";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useDispatch = () => baseUseDispatch<Dispatch>();
export const useSelector: TypedUseSelectorHook<RootState> = baseUseSelector;
