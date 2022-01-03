import { IUser as IUserService } from "pro-web-common/dist/js/interfaces/cli-api/User"
import { IUser } from "pro-web-common/dist/js/interfaces/state-manager/actions/IUser"
import { UserActionKeys } from "pro-web-common/dist/js/enums/state-manager/UserActionKeys"
import { AppActions } from "./App"
import { Notifications } from "pro-web-common/dist/js/enums/state-manager/Notifications"
import { LoadingStates } from "pro-web-common/dist/js/enums/state-manager/LoadingStates"
import { ResponseMessages } from "pro-web-common/dist/js/enums/ResponseMessages"

export const User: (svc: IUserService) => IUser = (svc) => {
    const onError = (message, dispatch) => {
        AppActions.setNotification(Notifications.danger, message)(dispatch)
        AppActions.setLoading(LoadingStates.error)(dispatch)
    }

    const actions: IUser =  {
        checkUsername: (username) => (dispatch) => {
            AppActions.setLoading(LoadingStates.loading)(dispatch)
            svc.checkUsernameUnique(username)
                .then(result => {
                    if(result.IsError || result.Data === null) {
                        onError(result.Message, dispatch)
                        return
                    }
                    dispatch({
                        type: UserActionKeys.CHECK_USERNAME,
                        payload: result.Data
                    })
                    AppActions.setLoading(LoadingStates.ready)(dispatch)
                    if(result.Data) {
                        actions.setCreateUsername(username)(dispatch)
                    }  
                })
                .catch(result =>  {
                    onError(result.Message, dispatch)
                })
        },
        createUser: (username, publicKey) => (dispatch) => {
            AppActions.setLoading(LoadingStates.loading)(dispatch)
            svc.createUser(username, publicKey)
                .then(result => {
                    console.log("result from actions.user.createuser", result)
                    if(result.IsError || result.Data === 0) {
                        let message = "Could not create user"
                        if(result.Message === ResponseMessages.InvalidPublicKey.toString()) {
                            message = `${message} -- bad public key`
                        }
                        onError(message, dispatch)
                        return
                    }
                    AppActions.setLoading(LoadingStates.ready)(dispatch)
                    AppActions.setNotification(Notifications.success, "User Created, Proceed to Login")(dispatch)
                    actions.requestLogin(username)(dispatch)
                })
                .catch(result =>onError(result.Message, dispatch))
        },
        requestLogin: (username) => (dispatch) => {
            console.log("requestLogin action usernamer", username)
            AppActions.setLoading(LoadingStates.loading)(dispatch)
            svc.requestLogin(username)
            .then(result => {
                if(result.IsError) {
                    onError(result.Message, dispatch)
                    return
                }
                AppActions.setLoading(LoadingStates.ready)(dispatch)
                if(result.Data === null) {                    
                    AppActions.setNotification(Notifications.warning, result.Message)(dispatch)
                    return
                }
                actions.setUsername(username)(dispatch)
                dispatch({
                    type: UserActionKeys.REQUEST_LOGIN,
                    payload: result.Data
                })
                dispatch({
                    type: UserActionKeys.SET_USERNAME,
                    payload: username
                })
            })
            .catch(result => onError(result.Message, dispatch))

        },
        login: (username, challenge) => async (dispatch) => {
            AppActions.setLoading(LoadingStates.loading)(dispatch)
            const result = await svc.login(username, challenge)
            if(result.IsError) {
                onError(result.Message, dispatch)
                return
            }
            AppActions.setLoading(LoadingStates.ready)(dispatch)
            console.log("login result from actions", result)
            if(result.Data) {               
                dispatch({
                    type: UserActionKeys.SET_USER,
                    payload: result.Data
                })
                
                AppActions.setNotification(Notifications.success, result.Message)(dispatch)
            } else {
                AppActions.setNotification(Notifications.warning, result.Message)(dispatch)
            }

        },
        logout: () => async (dispatch) => {
            AppActions.setLoading(LoadingStates.loading)(dispatch)
            const result = await svc.logout()
            if(result.IsError) {
                onError(result.Message, dispatch)
                return
            }
            AppActions.setLoading(LoadingStates.ready)(dispatch)
            if(result.Data) {
                dispatch({
                    type: UserActionKeys.SET_USERNAME,
                    payload: null
                })
                AppActions.setNotification(Notifications.success, result.Message)(dispatch)
            } else {
                AppActions.setNotification(Notifications.warning, result.Message)(dispatch)
            }

        },
        setCreateUsername: (username) => dispatch => {
            dispatch({
                type: UserActionKeys.SET_CREATE_USERNAME,
                payload: username
            })
        },
        setCreateUserPublicKey: (publicKey) => dispatch => {
            dispatch({
                type: UserActionKeys.SET_CREATE_USER_PUBLICKEY,
                payload: publicKey
            })
        },
        setUsername: username => dispatch => {
            dispatch({
                type: UserActionKeys.SET_USERNAME,
                payload: username
            })
        },
        setCurrentUser: () => async dispatch => {
            AppActions.setLoading(LoadingStates.loading)(dispatch)
            const userResp = await svc.getCurrentUser()
            console.log("setCurrentUserResp", userResp)
            if(userResp.IsError) {
                AppActions.setLoading(LoadingStates.error)(dispatch)
                return
            }
            AppActions.setLoading(LoadingStates.ready)(dispatch)
            dispatch({
                type: UserActionKeys.SET_USER,
                payload: userResp.Data
            })
        }
    }
    return actions
}