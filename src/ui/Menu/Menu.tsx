import React from 'react';
import { Nav, NavItem, NavLink } from 'reactstrap';
import { NavLink as RRNavLink } from 'react-router-dom';

export default function Menu() {
  return (
    <Nav vertical className="text-right">
      <NavItem>
        <NavLink to="/" tag={RRNavLink}>
          Home
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink to="/about" tag={RRNavLink}>
          About
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink to="/shuffle" tag={RRNavLink}>
          Shuffle
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink disabled to="#" tag={RRNavLink}>
          Disabled Link
        </NavLink>
      </NavItem>
    </Nav>
  );
}
