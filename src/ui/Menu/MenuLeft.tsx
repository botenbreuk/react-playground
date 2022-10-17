import { NavLink as RRNavLink } from 'react-router-dom';
import { Col, Container, Nav, NavItem, NavLink, Row } from 'reactstrap';
import { Icon } from '../index';
import Logo from '../Logo/Logo';

type Props = {
  isOpen: boolean;
  toggle: () => void;
};

export default function MenuLeft(props: Props) {
  const { isOpen, toggle } = props;

  if (!isOpen) {
    return null;
  }

  return (
    <Col md={2} className="p-0">
      <div className="menu-left">
        <div style={{ position: 'relative' }}>
          <div
            style={{
              position: 'absolute',
              top: 0,
              right: 10,
              zIndex: '1000'
            }}
          >
            <Icon
              type="x"
              className="close-button"
              color="#244e9b"
              onClick={toggle}
            />
          </div>

          <Container fluid>
            <Row className="bg-light">
              <Col xs={12} className="p-3 d-flex justify-content-center">
                <Logo height={100} />
              </Col>
            </Row>
            <Row className="mt-5">
              <Nav vertical className="text-end" pills>
                <NavItem>
                  <NavLink to="/" tag={RRNavLink} end>
                    Home
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink to="/cards" tag={RRNavLink} end>
                    Cards example
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink to="/shuffle" tag={RRNavLink} end>
                    Shuffle
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink to="/dnd" tag={RRNavLink} end>
                    Drag and Drop
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink to="/dnd-sort" tag={RRNavLink} end>
                    Drag and Drop - sort
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink disabled to="disabled" tag={RRNavLink} end>
                    Disabled Link
                  </NavLink>
                </NavItem>
              </Nav>
            </Row>
          </Container>
        </div>
      </div>
    </Col>
  );
}
