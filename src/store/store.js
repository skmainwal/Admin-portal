import { createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension"; // use this for debugging redux store on browser.

import reducer from "./reducer";

export default createStore(reducer, composeWithDevTools()); // initialize store
