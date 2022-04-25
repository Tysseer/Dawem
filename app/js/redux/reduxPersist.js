import actionsReducer from "./reducer";
import { persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
const persistConfig = {
  key: "Dawem_root",
  storage: AsyncStorage,
};
const persistedReducer = persistReducer(persistConfig, actionsReducer);
export default persistedReducer;
