import { createStore, applyMiddleware } from "redux";
import Thunk from 'redux-thunk';
import Reducer from './Reducer';

export const ReduxStore = createStore(Reducer, applyMiddleware(Thunk));