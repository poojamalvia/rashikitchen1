import {Createstore} from "redux";
import logger from "redux-logger";

let Store = Createstore(rootReducer, applyMiddleware(logger));