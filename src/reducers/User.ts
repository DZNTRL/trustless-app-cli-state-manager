import { UserState } from "../initialStates/User"
import { IUserState } from "pro-web-common/dist/js/interfaces/state-manager/states/IUser"
import { IAction } from "pro-web-common/dist/js/interfaces/state-manager/actions/IAction"
import { createNewState } from "../utils"
import { UserActionKeys } from "pro-web-common/dist/js/enums/state-manager/UserActionKeys"

const UserReducer = (state: IUserState = UserState, action: IAction) => {
    const newState = createNewState<IUserState>(state)
    switch(action.type) {
        case UserActionKeys.SET_USERNAME:
            newState.username = action.payload
            newState.usernameUnique = null
            newState.createUsername = null
            newState.createUserPublicKey = null
            return newState
        case UserActionKeys.CHECK_USERNAME:
            newState.usernameUnique = action.payload
            newState.username = null
            newState.challenge = null
            newState.createUsername = null
            return newState
        case UserActionKeys.REQUEST_LOGIN:
            newState.username = null
            newState.usernameUnique = null
            newState.challenge = action.payload
            return newState
        case UserActionKeys.SET_CREATE_USERNAME:
            newState.createUsername = action.payload
            newState.username = null
            newState.challenge = null
            newState.usernameUnique = null
            return newState
        default:
            return state
    }
}

export default UserReducer