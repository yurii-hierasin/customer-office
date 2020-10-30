import React from 'react';
import {RoutesEnum} from '../../interfaces/app';
import NavItem from './navitem/NavItem';

const routes = [
    {
        to: '/',
        label: 'Home',
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

const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <a className="navbar-brand" href="/">YHO</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
                    aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"/>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    {routes.map(route => <NavItem routeSettings={route} key={route.to}/>)}
                </ul>
            </div>
        </nav>
    )
}

export default Navbar
