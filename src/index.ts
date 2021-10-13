import { IApp } from "pro-web-common/dist/js/interfaces/state-manager/actions/IApp"
import { IUser } from "pro-web-common/dist/js/interfaces/state-manager/actions/IUser"
import { IAppState } from "pro-web-common/dist/js/interfaces/state-manager/states/IApp"
import { IUserState } from "pro-web-common/dist/js/interfaces/state-manager/states/IUser"
import { Reducer } from "pro-web-common/dist/js/types/state-manager/Reducer"
import { AppActions } from "./actions/App"
import { User as UserActions } from "./actions/User"
import { AppState } from "./initialStates/App"
import { UserState } from "./initialStates/User"
import AppReducer from "./reducers/App"
import UserReducer from "./reducers/User"

export interface IActions {
    app: IApp
    user: (svc) => IUser
}

export interface IInitialStates {
    app: IAppState
    user: IUserState
}

export interface IReducers {
    app: Reducer<IAppState>
    user: Reducer<IUserState>
}

export interface IStateManager {
    actions: IActions
    states: IInitialStates
    reducers: IReducers
}

export const actions: IActions = {
    app: AppActions,
    user: UserActions
}

export const reducers: IReducers = {
    app: AppReducer,
    user: UserReducer
}

export const states: IInitialStates = {
    app: AppState,
    user: UserState
}

export const StateManager: IStateManager = {
    actions, reducers, states
}