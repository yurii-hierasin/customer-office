import React from 'react';
import {
    Router
} from 'react-router-dom';
import './App.css';
import Routes from './components/Routes';
import history from './history';
import SnackbarContainer from './components/snackbar/SnackbarContainer';

function App() {
    return (
        <>
            <Router history={history}>
                <Routes/>
            </Router>
            <SnackbarContainer/>
        </>
    );
}

export default App;
