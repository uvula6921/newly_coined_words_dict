import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import dict from './modules/dict';
import { createBrowserHistory } from "history";

export const history = createBrowserHistory();

const middlewares = [thunk];
const enhancer = applyMiddleware(...middlewares);
const rootReducer = combineReducers({ dict });
const store = createStore(rootReducer, enhancer);

export default store;