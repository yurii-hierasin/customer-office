import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import configureStore from './store';
import Storage from './services/Storage';
import {responseSignIn} from './store/auth/actions';
import Cookie from './services/Cookie';
import {IInitOptions} from './interfaces/app';
import {retailAPI} from './api/retailAPI';
import {authAPI} from './api/authAPI';
import {updateInitOptions} from './store/app/actions';


const rootElement = document.getElementById('root')

const {
    locale = 'en',
    authUrl = '',
    retailUrl = ''
} = rootElement?.dataset || {}

const initOptions: IInitOptions = {
    locale,
    authUrl,
    retailUrl,
}

authAPI.initiate(initOptions.authUrl)
retailAPI.initiate(initOptions.retailUrl, Cookie.get('token'))

const store = configureStore({auth: authAPI, retail: retailAPI})
store.dispatch(updateInitOptions(initOptions))

if (Cookie.has('token')) {
    store.dispatch(responseSignIn(Storage.get('user')))
}

ReactDOM.render(
  <React.StrictMode>
      <Provider store={store}>
          <App />
      </Provider>
  </React.StrictMode>,
  rootElement
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
