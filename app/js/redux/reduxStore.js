import { createStore } from "redux";
import persistedReducer from "./reduxPersist";
const reduxStore = createStore(persistedReducer);
export default reduxStore;
