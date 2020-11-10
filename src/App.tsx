import React, {useEffect} from 'react';
import {
    Router
} from 'react-router-dom';
import './App.css';
import Routes from './components/Routes';
import history from './history';
import SnackbarContainer from './components/snackbar/SnackbarContainer';
import Navbar from './components/Navbar/Navbar';
import treeDotsIcon from './icons/TreeDotsVertical.svg'
import editIcon from './icons/Edit.svg'

function App() {
    // preload images, avoid icons blink or create a components, I will think about
    useEffect(() => {
        const imageList = [treeDotsIcon, editIcon]
        imageList.forEach((image) => {
            new Image().src = image
        }, []);
    })

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
