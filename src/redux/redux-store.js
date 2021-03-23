import {applyMiddleware, combineReducers, createStore} from "redux";
import thunkMiddleware from "redux-thunk";
import {tableReducer} from "./table-reducer";

const reducers = combineReducers({
    table: tableReducer
})

export const store = createStore(reducers,applyMiddleware(thunkMiddleware))

