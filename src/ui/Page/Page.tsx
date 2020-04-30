import React, { ReactNode } from 'react';
import { Col, Container, Row } from 'reactstrap';
import { Menu } from '../index';
import './_page.css';

interface Props {
  title?: string;
  children?: ReactNode;
}

export default function Page(props: Props) {
  const { title, children } = props;

  return (
    <Container fluid>
      <Row>
        <Col md={2}>
          <div className="sidenav">
            <Menu />
          </div>
        </Col>
        <Col
          md={10}
          className="min-vh-100 p-0"
          style={{ background: '#282c34' }}
        >
          <Row className="m-0 title">{title}</Row>
          <Row className="m-3">{children}</Row>
        </Col>
      </Row>
    </Container>
  );
}
