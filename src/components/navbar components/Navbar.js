import React from 'react';
import { NavLink } from 'react-router-dom';

function Navbar() {
    return (
        <div data-test="component-navbar" className='navbar'>
            <NavLink exact to='/'>
                <h4>Featured</h4>
            </NavLink>

            <NavLink to='/nature'>
                <h4>Nature</h4>
            </NavLink>

            <NavLink to='/people'>
                <h4>People</h4>
            </NavLink>

            <NavLink to='/architecture'>
                <h4>Architecture</h4>
            </NavLink>
        </div>
    )
}

export default Navbar;