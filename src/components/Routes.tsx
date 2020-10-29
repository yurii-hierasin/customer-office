import React from 'react';
import {
    Switch,
    Route
} from 'react-router-dom';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import Account from '../pages/Account';
import RestrictRoute from './RestrictRoute';
import {RoutesEnum} from '../interfaces/app';

const Routes: React.FC = () => {
    return (
        <Switch>
            <Route component={SignUp} path={RoutesEnum.HOME} exact />
            <RestrictRoute component={SignIn} path={RoutesEnum.SIGN_IN} exact />
            <RestrictRoute component={SignUp} path={RoutesEnum.SIGN_UP} exact />
            <RestrictRoute component={Account} path={RoutesEnum.PROFILE} exact />
        </Switch>
    )
}

export default Routes;
