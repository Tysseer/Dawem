import { createStore } from "redux";
import actionsReducer from "./reducer";
const reduxStore = createStore(actionsReducer);
export default reduxStore;
