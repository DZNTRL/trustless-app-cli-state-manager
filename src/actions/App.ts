import { IApp } from "pro-web-common/dist/js/interfaces/state-manager/actions/IApp"
import { AppActionKeys } from "pro-web-common/dist/js/enums/state-manager/AppActionKeys"

export const AppActions: IApp = {
    setNotification: (type, message) => dispatch =>  {
        dispatch({
            type: AppActionKeys.SET_NOTIFICATION,
            payload: {type, message}
        })
    },
    clearNotification: () => dispatch => {
        dispatch({
            type: AppActionKeys.SET_NOTIFICATION,
            payload: null
        })
    },
    setLoading: loading => dispatch => {
        dispatch({
            type: AppActionKeys.SET_LOADING,
            payload: loading
        })
    }
}