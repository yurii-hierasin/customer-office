import React from 'react';
import {
    Router
} from 'react-router-dom';
import './App.css';
import Routes from './components/Routes';
import history from './history';
import SnackbarContainer from './components/snackbar/SnackbarContainer';
import Navbar from './components/Navbar/Navbar';

function App() {
    return (
        <>
            <Router history={history}>
                <Navbar/>
                <Routes/>
            </Router>
            <SnackbarContainer/>
        </>
    );
}

export default App;
