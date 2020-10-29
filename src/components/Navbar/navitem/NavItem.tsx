import React from 'react';
import {Link, withRouter} from 'react-router-dom';

interface INavItem {
    isActive: boolean
    to: string
    label: string
}

const NavItem = ({ isActive, to, label }: INavItem) => {
    const classes = ['nav-item']

    if (isActive) {
        classes.push('active')
    }

    return (
        <li className={classes.join(" ")}>
            <Link className="nav-link" to={to}>
                {label}
            </Link>
        </li>
    )
}


export default withRouter(({ location, ...props }: any) => {
    const isActive = location.pathname === props.to;

    return <NavItem {...props} isActive={isActive} />;
})
