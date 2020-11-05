import {combineReducers, applyMiddleware, createStore, compose} from 'redux';
import createSagaMiddleware from 'redux-saga';
import {all} from 'redux-saga/effects';

import retailReducer from './retail/reducers'
import docsReducer from './docs/reducers';
import appReducer from './app/reducers';
import authReducer from './auth/reduces';
import uiReducer from './ui/reducers';

import {
    watchRequestCitizenships,
    watchRequestDestinations,
    watchRequestOrders,
    watchRequestVisaGroups
} from './retail/sagas';
import {watchTranslationsRequest} from './app/sagas';
import {watchRequestForgotPass, watchRequestProfile, watchRequestSignIn, watchRequestSingUp} from './auth/sagas';
import {watchRequestOrderDocs, watchRequestOrderServiceItemDocs} from './docs/sagas';
import {IApi} from '../interfaces/app';


export const rootReducer = combineReducers({
    retail: retailReducer,
    docs: docsReducer,
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
        watchRequestOrders(api),
        watchRequestVisaGroups(api),
        watchRequestDestinations(api),
        watchRequestCitizenships(api),
        watchRequestOrderDocs(api),
        watchRequestOrderServiceItemDocs(api),
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
