import React from 'react';
import {RoutesEnum} from '../../interfaces/app';
import NavItem from './navitem/NavItem';

const routes = [
    {
        to: '/',
        label: 'Home',
    },
    {
        to: RoutesEnum.PROFILE,
        label: 'Profile',
    },
    {
        to: RoutesEnum.ORDERS,
        label: 'Orders',
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
                    {routes.map(route => <NavItem to={route.to} label={route.label} key={route.to}/>)}
                </ul>
            </div>
        </nav>
    )
}

export default Navbar
