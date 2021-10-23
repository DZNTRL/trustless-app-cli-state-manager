import { createStore, applyMiddleware, combineReducers } from "redux"
import thunk from "redux-thunk"
import { RootReducer } from "./reducers/Root"
const reducers = combineReducers(RootReducer)
export default createStore(
  reducers,
  applyMiddleware(thunk)
)