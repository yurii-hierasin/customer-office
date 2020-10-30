import React from 'react';
import {Link, useLocation} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {RootState} from '../../../store';

interface INavItem {
    routeSettings: {
        to: string
        label: string
        isAuth: boolean
    }
    isActive: boolean
    isAuth: boolean
}

const NavItem = ({ isActive, isAuth, routeSettings }: INavItem) => {
    const classes = ['nav-item']

    if (isActive) {
        classes.push('active')
    }

    const isItemAvailable = routeSettings.isAuth
        ? isAuth
        : true;

    return isItemAvailable && (
        <li className={classes.join(" ")}>
            <Link className="nav-link" to={routeSettings.to}>
                {routeSettings.label}
            </Link>
        </li>
    )
}

const withIsAuth = (Component: React.ComponentType) => (props: any) => {
    const isAuth = useSelector((state: RootState) => !!state.auth.user?.id)

    return <Component {...props} isAuth={isAuth}/>
}

// this is madness, need found better TS way
const withIsActiveRoute = (Component: ({isActive, isAuth, routeSettings}: INavItem) => false | any) => (props: any) => {
    const location = useLocation()

    return <Component {...props} isActive={location.pathname === props.routeSettings.to}/>
}


export default withIsAuth(withIsActiveRoute(NavItem))
