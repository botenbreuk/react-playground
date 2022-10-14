import { useRef, useState } from 'react';
import { Button, Col, Container, Nav, NavItem, NavLink, Row } from 'reactstrap';
import useOutsideClick from '../../hooks/useOutsideClick/useOutsideClick';
import { Icon } from '../index';

export default function MenuRight() {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLInputElement>(null);
  useOutsideClick(ref, toggle);

  function toggle() {
    setIsOpen(!isOpen);
  }

  if (!isOpen) {
    return (
      <Button color="danger" onClick={toggle}>
        <Icon type="people" size="1.2rem" color="#fff" />
      </Button>
    );
  }

  return (
    <>
      <Button color="danger" onClick={toggle}>
        <Icon type="people" size="1.2rem" color="#fff" />
      </Button>
      <div ref={ref} className="menu-right">
        <Container fluid>
          <Row>
            <Col xs={12} className="d-flex justify-content-end">
              <Icon type="x" size="2rem" color="#ffffff" onClick={toggle} />
            </Col>
          </Row>
          <Row>
            <Nav vertical className="text-center" pills>
              <NavItem>
                <NavLink to="#">Change Password</NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="#">Settings</NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="#">Logout</NavLink>
              </NavItem>
            </Nav>
          </Row>
        </Container>
      </div>
    </>
  );
}
