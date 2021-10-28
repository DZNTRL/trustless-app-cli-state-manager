import { AppState } from "../initialStates/App"
import { IAppState } from "pro-web-common/dist/js/interfaces/state-manager/states/IApp"
import { IAction } from "pro-web-common/dist/js/interfaces/state-manager/actions/IAction"
import { createNewState } from "../utils"
import { AppActionKeys } from "pro-web-common/dist/js/enums/state-manager/AppActionKeys"

const AppReducer = (state: IAppState = AppState, action: IAction) => {
    var newState = createNewState<IAppState>(state)
    switch(action.type) {
        case AppActionKeys.SET_NOTIFICATION:
            newState.notification = action.payload
            return newState
        case AppActionKeys.SET_LOADING:
            newState.loading = action.payload
            return newState
        default:
            return state
    }
}

export default AppReducer