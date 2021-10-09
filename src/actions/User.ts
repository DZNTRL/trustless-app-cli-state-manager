import Core from "pro-web-core"
import { IUser as IUserService } from "pro-web-common/dist/js/interfaces/service/IUser"
import { UserActionKeys } from "pro-web-common/dist/js/enums/state-manager/UserActionKeys"
import { Dispatcher } from "pro-web-common/dist/js/interfaces/state-manager/actions/IAction"
import { AppActions } from "./App"
import { Notifications } from "pro-web-common/dist/js/enums/state-manager/Notifications"

const Response = Core.Response
export interface IUser {
    checkUsername: (username: string) => (dispatch: Dispatcher) => void
    createUser: (username: string, publicKey: string) => (dispatch: Dispatcher) => void
    requestLogin: (username: string) => (dispatch: Dispatcher) => void
    login: (username: string, challenge: string) => (dispatch: Dispatcher) => void
}

export const User: (svc: IUserService) => IUser = (svc) => {
    return {
        checkUsername: (username) => async (dispatch) => { 
            const result = await svc.checkUsernameUnique(username)
            if(result.IsError) {
                AppActions.setNotification(Notifications.danger, result.Message)(dispatch)
                return
            }
            dispatch({
                type: UserActionKeys.CHECK_USERNAME,
                payload: result.Data
            })
        },
        createUser: (username, publicKey) => async (dispatch) => {
            const result = await svc.createUser(username, publicKey);
            if(result.IsError) {
                AppActions.setNotification(Notifications.danger, result.Message)(dispatch)
                return
            }
            dispatch({
                type: UserActionKeys.CREATE_USER,
                payload: result.Data
            })
        },
        requestLogin: (username) => async (dispatch) => {
            const result = await svc.requestLogin(username);
            if(result.IsError) {
                AppActions.setNotification(Notifications.danger, result.Message)(dispatch)
                return
            }
            dispatch({
                type: UserActionKeys.REQUEST_LOGIN,
                payload: result.Data
            })
        },
        login: (username, challenge) => async (dispatch) => {
            const result = await svc.login(username, challenge);
            if(result.IsError) {
                AppActions.setNotification(Notifications.danger, result.Message)(dispatch)
                return
            }
            dispatch({
                type: UserActionKeys.REQUEST_LOGIN,
                payload: username
            })

        }
    }
}