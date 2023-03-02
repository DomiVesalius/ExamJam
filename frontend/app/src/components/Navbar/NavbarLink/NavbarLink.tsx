import React from 'react';
import { NavLink, NavLinkProps } from 'react-router-dom';

interface NavbarLinkProps extends NavLinkProps {}

const NavbarLink: React.FunctionComponent<NavbarLinkProps> = (props) => {
    return (
        <NavLink {...props} style={{ textDecoration: 'none', color: 'inherit' }}>
            {props.children}
        </NavLink>
    );
};

export default NavbarLink;
