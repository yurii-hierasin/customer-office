import {START_ACTION, STOP_ACTION} from './types';

export const startAction = (name: string, params?: any): uiActionTypes => ({
    type: START_ACTION,
    payload: {
        action: {
            name,
            params
        }
    }
});

export const stopAction = (name: string): uiActionTypes => ({
    type: STOP_ACTION,
    payload: { name }
});

// export const refreshActionStart = refreshAction => ({
//     type: uiActionTypes.REFRESH_ACTION_START,
//     payload: { refreshAction }
// });

// export const refreshActionStop = refreshAction => ({
//     type: uiActionTypes.REFRESH_ACTION_STOP,
//     payload: { refreshAction }
// });

export type uiActionTypes =
    | {type: typeof STOP_ACTION, payload: any}
    | {
    type: typeof START_ACTION,
    payload: {
        action: {
            name: string
            params: any
        }
    }
}
