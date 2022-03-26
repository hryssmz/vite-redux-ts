// app/hooks.ts
import {
  TypedUseSelectorHook,
  useDispatch as baseUseDispatch,
  useSelector as baseUseSelector,
} from "react-redux";

import type { RootState, Dispatch } from "./store";

export const useDispatch = () => baseUseDispatch<Dispatch>();
export const useSelector: TypedUseSelectorHook<RootState> = baseUseSelector;
