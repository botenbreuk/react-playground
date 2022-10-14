import { ReactNode } from 'react';
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Container,
  Row
} from 'reactstrap';
import { Page } from '../../ui';

type CardObj = {
  id: number;
  title: string;
  icon: string;
  body: ReactNode;
  footer?: ReactNode;
};

const cards: CardObj[] = [
  {
    id: 1,
    title: 'Item 1',
    icon: '',
    body: 'Body text'
  },
  {
    id: 2,
    title: 'Item 1',
    icon: '',
    body: 'Body text'
  },
  {
    id: 3,
    title: 'Item 1',
    icon: '',
    body: 'Body text'
  },
  {
    id: 4,
    title: 'Item 1',
    icon: '',
    body: 'Body text',
    footer: 'footer text'
  },
  {
    id: 5,
    title: 'Item 1',
    icon: '',
    body: 'Body text'
  }
];

export default function CardsPage() {
  return (
    <Page>
      <Container>
        <Row>
          {cards.map(({ id, title, body, footer }) => (
            <Col xs={12} lg={3} className="p-2" key={id}>
              <Card>
                <CardHeader>{title}</CardHeader>
                <CardBody>{body}</CardBody>
                <CardFooter>{footer}</CardFooter>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </Page>
  );
}
