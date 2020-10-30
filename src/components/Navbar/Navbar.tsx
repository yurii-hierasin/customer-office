import React from 'react';
import {RoutesEnum} from '../../interfaces/app';
import NavItem from './navitem/NavItem';
import './Navbar.css';
import history from '../../history';
import Cookie from '../../services/Cookie';
import {useDispatch} from 'react-redux';
import {logout} from '../../store/auth/actions';
import {withIsAuth} from '../../hoc/withIsAuth';

const routes = [
    {
        to: RoutesEnum.HOME,
        label: 'Home',
        isAuth: false,
    },
    {
        to: RoutesEnum.ABOUT,
        label: 'About',
        isAuth: false,
    },
    {
        to: RoutesEnum.PROFILE,
        label: 'Profile',
        isAuth: true,
    },
    {
        to: RoutesEnum.ORDERS,
        label: 'Orders',
        isAuth: true,
    },
]

// @ts-ignore
const Navbar: React.FC = ({isAuth}) => {
    const dispatch = useDispatch()

    const handleClick = (): void => {
        if (isAuth) {
            const expired = new Date()
            expired.setDate(expired.getDate() - 1)
            Cookie.set('token', '', expired)
            history.push(RoutesEnum.HOME)
            dispatch(logout())
        } else {
            history.push(RoutesEnum.SIGN_IN)
        }
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <a className="navbar-brand" href="/">YHO</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
                    aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"/>
            </button>
            <div className="collapse navbar-collapse" id="navbarText">
                <ul className="navbar-nav mr-auto">
                    <ul className="navbar-nav">
                        {routes.map(route => <NavItem routeSettings={route} key={route.to}/>)}
                    </ul>
                </ul>
                <span className="navbar-text logout" onClick={handleClick}>
                    {isAuth
                        ? (
                            <>
                                <span className="pr-2">Logout</span>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16">
                                    <path fillRule="evenodd" d="M2 2.75C2 1.784 2.784 1 3.75 1h2.5a.75.75 0 010 1.5h-2.5a.25.25 0 00-.25.25v10.5c0 .138.112.25.25.25h2.5a.75.75 0 010 1.5h-2.5A1.75 1.75 0 012 13.25V2.75zm10.44 4.5H6.75a.75.75 0 000 1.5h5.69l-1.97 1.97a.75.75 0 101.06 1.06l3.25-3.25a.75.75 0 000-1.06l-3.25-3.25a.75.75 0 10-1.06 1.06l1.97 1.97z"></path>
                                </svg>
                            </>
                        )
                        : (
                            <>
                                <span className="pr-2">Sign In</span>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16">
                                    <path fillRule="evenodd" d="M2 2.75C2 1.784 2.784 1 3.75 1h2.5a.75.75 0 010 1.5h-2.5a.25.25 0 00-.25.25v10.5c0 .138.112.25.25.25h2.5a.75.75 0 010 1.5h-2.5A1.75 1.75 0 012 13.25V2.75zm6.56 4.5l1.97-1.97a.75.75 0 10-1.06-1.06L6.22 7.47a.75.75 0 000 1.06l3.25 3.25a.75.75 0 101.06-1.06L8.56 8.75h5.69a.75.75 0 000-1.5H8.56z"></path>
                                </svg>
                            </>
                        )
                    }
                </span>
            </div>
        </nav>
    )
}

export default withIsAuth(Navbar)
