import {IAuthActionTypes, PROFILE_SUCCESS, SIGN_IN_SUCCESS, SIGN_UP_SUCCESS} from './types';
import {IAuthState} from '../../interfaces/signUp';

const authInitState = {
    user: null,
    profile: null,
}

export default function authReducer(state: IAuthState = authInitState, action: IAuthActionTypes): IAuthState {
    switch (action.type) {
        case SIGN_IN_SUCCESS:
        case SIGN_UP_SUCCESS:
            return {...state, user: action.user}
        case PROFILE_SUCCESS:
            return {...state, profile: action.payload}
        default:
            return state;
    }
}
