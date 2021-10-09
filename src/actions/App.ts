import { IAppActions } from "pro-web-common/dist/js/interfaces/state-manager/actions/IAppActions"
import { AppActionKeys } from "pro-web-common/dist/js/enums/state-manager/AppActionKeys"

export const AppActions: IAppActions = {
    setNotification: (type, message) => dispatch =>  {
        dispatch({
            type: AppActionKeys.SET_NOTIFICATION,
            payload: message
        })
    }
}