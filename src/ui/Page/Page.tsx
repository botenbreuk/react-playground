import { ReactNode, useState } from 'react';
import { NavLink as RRNavLink } from 'react-router-dom';
import {
  Col,
  Container,
  Nav,
  Navbar,
  NavbarBrand,
  NavbarText,
  NavItem,
  NavLink,
  Row
} from 'reactstrap';
import { Icon, MenuLeft, MenuRight } from '../index';
import Logo from '../Logo/Logo';

interface Props {
  title?: string;
  filterBar?: ReactNode;
  children?: ReactNode;
}

export default function Page(props: Props) {
  const { title, filterBar, children } = props;

  const [isOpen, setIsOpen] = useState(true);

  function toggle() {
    setIsOpen(!isOpen);
  }

  return (
    <Container fluid>
      <Row>
        <MenuLeft isOpen={isOpen} toggle={toggle} />
        <Col md={isOpen ? 10 : 12} className="min-vh-100 p-0 bg-dark">
          <div className="navbars">
            <Navbar className="m-0 bg-light">
              {!isOpen && (
                <NavbarBrand>
                  <Row>
                    <Col>
                      <Icon type="list" color="#244e9b" onClick={toggle} />
                    </Col>
                    <Col>
                      <Logo height={40} />
                    </Col>
                  </Row>
                </NavbarBrand>
              )}
              <NavbarText>{title}</NavbarText>
              <Nav>
                <NavItem>
                  <Logo height={40} />
                </NavItem>
                <NavItem>
                  <NavLink to="/user/1" tag={RRNavLink}>
                    Username
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink to="/company/1" tag={RRNavLink}>
                    Logged in company name
                  </NavLink>
                </NavItem>
                <NavItem>
                  <MenuRight />
                </NavItem>
              </Nav>
            </Navbar>
            <div className="bg-light">{filterBar}</div>
          </div>
          <Row className="m-3">{children}</Row>
        </Col>
      </Row>
    </Container>
  );
}
