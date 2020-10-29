import React from 'react';
import {Route, Redirect} from 'react-router-dom'
import {useSelector} from 'react-redux';

const ProtectedRouteX = ({component: Component, ...rest}) => {
    const user = useSelector((state) => state.auth.user)

    return (
        <Route
            {...rest}
            render={routeProps => user?.id
                ? <Component {...routeProps}/>
                : <Redirect to="/sign-in"/>
            }
        />
    )
}

export default ProtectedRouteX
