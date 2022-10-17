import classNames from 'classnames';
import { ReactNode, useState } from 'react';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Progress
} from 'reactstrap';
import { Icon, Page } from '../../ui';
import { IconType } from '../../ui/Icon/icon-types';

type IconTypes = 'wrench' | 'lightning' | 'chain';
type IconColor = 'red' | 'orange' | 'yellow';

type CardObj = {
  id: number;
  title: string;
  icon: IconTypes;
  iconColor: IconColor;
  body: ReactNode;
  footer?: ReactNode;
};

const cards: CardObj[] = [
  {
    id: 1,
    title: 'Item 1',
    icon: 'wrench',
    iconColor: 'orange',
    body: 'Body text'
  },
  {
    id: 2,
    title: 'Item 1',
    icon: 'lightning',
    iconColor: 'red',
    body: 'Body text'
  },
  {
    id: 3,
    title: 'Item 1',
    icon: 'chain',
    iconColor: 'yellow',
    body: 'Body text'
  },
  {
    id: 4,
    title: 'Item 4 with a very long text so this will turn into a ellipsis',
    icon: 'lightning',
    iconColor: 'orange',
    body: 'Body text',
    footer: 'footer text'
  },
  {
    id: 5,
    title: 'Item 1',
    icon: 'wrench',
    iconColor: 'yellow',
    body: 'Body text'
  }
];

export default function CardsPage() {
  const [listMode, setListMode] = useState(false);

  function getIcon(icon: IconTypes): IconType {
    if (icon === 'lightning') {
      return 'lightning-fill';
    }

    if (icon === 'chain') {
      return 'wrench-adjustable';
    }

    return 'fire';
  }

  const names = classNames('card-columns', { horizontal: listMode });

  return (
    <Page>
      <Button
        color="success"
        className="mb-3"
        block
        onClick={() => setListMode(!listMode)}
      >
        Toggle to {listMode ? 'cards' : 'list'}
      </Button>
      <div className={names}>
        {cards.map(({ id, title, body, footer, icon, iconColor }) => (
          <Card className="card-light">
            <CardHeader>
              <div className={`card-icon ${iconColor}`}>
                <Icon type={getIcon(icon)} color="white" />
              </div>
              <div className="card-title">{title}</div>
              {id % 2 === 0 && (
                <div className="card-button">
                  <Icon type="pencil-fill" color="white" />
                </div>
              )}
            </CardHeader>
            <CardBody>{body}</CardBody>
            <div className="card-progress">
              <Progress value={70} color="danger">
                7/10
              </Progress>
            </div>
            <CardFooter>{footer}</CardFooter>
          </Card>
        ))}
      </div>
    </Page>
  );
}
