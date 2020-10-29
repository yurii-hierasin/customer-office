import React from 'react';
import './snackbarlight.scss'
import {useSelector} from 'react-redux';
import {IRootState} from '../../interfaces/signUp';
import Snackbar from './Snackbar';

const SnackbarContainer: React.FC = () => {
    const snackbars = useSelector((state: IRootState) => state.app.snackbars)

    return (
        <div id="snackbar-container">
            {snackbars.length !== 0
            && snackbars.map(snackbar => <Snackbar snackbar={snackbar} key={snackbar.id}/>)}
        </div>
    )
}

export default SnackbarContainer
