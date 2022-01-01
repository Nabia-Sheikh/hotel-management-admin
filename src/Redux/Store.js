import { createStore } from "redux";
import { reducer } from "./Reducer";

export const store = createStore(reducer);