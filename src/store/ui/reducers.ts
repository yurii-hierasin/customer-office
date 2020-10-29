import {START_ACTION, STOP_ACTION} from './types';
import {uiActionTypes} from './actions';
import {IUIState} from '../../interfaces/signUp';

const initialState: IUIState = {
    loader: {
        actions: [],
        // refreshing: []
    }
};

const uiReducer = (state = initialState, { type, payload }: uiActionTypes) => {
    const { loader } = state;
    const { actions/*, refreshing*/ } = loader;
    switch (type) {
        case START_ACTION:
            return {
                ...state,
                loader: {
                    ...loader,
                    actions: [...actions, payload.action]
                }
            };
        case STOP_ACTION:
            return {
                ...state,
                loader: {
                    ...loader,
                    actions: actions.filter(action => action.name !== payload.name)
                }
            };
        // case uiActionTpyes.REFRESH_ACTION_START:
        //     return {
        //         ...state,
        //         loader: {
        //             ...loader,
        //             refreshing: [...refreshing, payload.refreshAction]
        //         }
        //     };
        // case uiActionTpyes.REFRESH_ACTION_STOP:
        //     return {
        //         ...state,
        //         loader: {
        //             ...loader,
        //             refreshing: refreshing.filter(refresh => refresh !== payload.refreshAction)
        //         }
        //     };
        default:
            return state;
    }
};

export default uiReducer;
