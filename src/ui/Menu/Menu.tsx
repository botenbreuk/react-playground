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
        <NavLink to="/dnd" tag={RRNavLink}>
          Drag and Drop
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink to="/dnd-sort" tag={RRNavLink}>
          Drag and Drop - sort
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
