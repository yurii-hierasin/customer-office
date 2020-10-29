import {combineReducers, applyMiddleware, createStore, compose} from 'redux';
import createSagaMiddleware from 'redux-saga';
import {all} from 'redux-saga/effects';

import appReducer from './app/reducers';
import authReducer from './auth/reduces';
import uiReducer from './ui/reducers';

import {watchTranslationsRequest} from './app/sagas';
import {watchRequestForgotPass, watchRequestProfile, watchRequestSignIn, watchRequestSingUp} from './auth/sagas';
import {IApi} from '../interfaces/app';


export const rootReducer = combineReducers({
    app: appReducer,
    auth: authReducer,
    ui: uiReducer,
})

export type RootState = ReturnType<typeof rootReducer>

function* rootSaga(api: IApi) {
    yield all([
        watchRequestSingUp(api),
        watchRequestSignIn(api),
        watchRequestForgotPass(api),
        watchRequestProfile(api),
        watchTranslationsRequest(api)
    ])
}

export default function configureStore(api: IApi) {
    const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    const sagaMiddleware = createSagaMiddleware();
    const middlewares = [sagaMiddleware];
    const middleWareEnhancer = applyMiddleware(...middlewares);

    const store = createStore(
        rootReducer,
        composeEnhancers(middleWareEnhancer)
    );

    // @ts-ignore
    sagaMiddleware.run(rootSaga, api);

    return store;
}
