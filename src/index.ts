import { IApp } from "pro-web-common/dist/js/interfaces/state-manager/actions/IApp";
import { IUser } from "pro-web-common/dist/js/interfaces/state-manager/actions/IUser";
import { IAppState } from "pro-web-common/dist/js/interfaces/state-manager/states/IApp"
import { IUserState } from "pro-web-common/dist/js/interfaces/state-manager/states/IUser";
import { Reducer } from "pro-web-common/dist/js/types/state-manager/Reducer"

export interface IActions {
    app: IApp
    user: IUser
}

export interface IInitialStates {
    app: IAppState
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