import reduxStore from "./reduxStore";
import { persistStore } from "redux-persist";
const reduxPersistor = persistStore(reduxStore);
export default reduxPersistor;
