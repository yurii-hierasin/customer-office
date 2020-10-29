import {IAuthActionTypes, SIGN_UP_SUCCESS, SIGN_IN_SUCCESS} from './types';
import {IAuthState} from '../../interfaces/signUp';

const authInitState = {
    user: null,
}

export default function authReducer(state: IAuthState = authInitState, action: IAuthActionTypes): IAuthState {
    switch (action.type) {
        case SIGN_IN_SUCCESS:
        case SIGN_UP_SUCCESS:
            return {...state, user: action.user}
        default:
            return state;
    }
}
