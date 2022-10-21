import classNames from 'classnames';
import { ReactNode, useEffect, useState } from 'react';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Progress,
  Row
} from 'reactstrap';
import { Icon, Page } from '../../ui';
import { IconType } from '../../ui/Icon/icon-types';
import DescriptionList from '../../ui/List/DescriptionList';
import DescriptionListItem from '../../ui/List/DescriptionListItem';

type IconTypes = 'wrench' | 'lightning' | 'chain';
type IconColor = 'red' | 'orange' | 'yellow';

type CardObj = {
  title: string;
  icon: IconTypes;
  iconColor: IconColor;
  body: ReactNode;
  footer?: ReactNode;
  progress?: number;
};

const cards: CardObj[] = [
  {
    title: 'Item 1',
    icon: 'wrench',
    iconColor: 'orange',
    body: 'Body text'
  },
  {
    title: 'Item 1',
    icon: 'lightning',
    iconColor: 'red',
    body: 'Body text'
  },
  {
    title: 'Item 1',
    icon: 'chain',
    iconColor: 'yellow',
    body: 'Body text'
  },
  {
    title: 'Item title',
    icon: 'lightning',
    iconColor: 'red',
    body: 'Body text',
    footer: 'footer text',
    progress: 40
  },
  {
    title: 'Item title',
    icon: 'chain',
    iconColor: 'red',
    body: 'Body text',
    footer: 'footer text'
  },
  {
    title: 'Item 4 with a very long text so this will turn into a ellipsis',
    icon: 'lightning',
    iconColor: 'orange',
    body: 'Body text',
    footer: 'footer text'
  },
  {
    title: 'Item 4 with a very long text so this will turn into a ellipsis',
    icon: 'wrench',
    iconColor: 'yellow',
    body: 'Body text',
    footer: 'footer text',
    progress: 20
  },
  {
    title: 'Bigger item title but not ot big',
    icon: 'lightning',
    iconColor: 'yellow',
    body: 'Body text',
    footer: 'footer text'
  },
  {
    title: 'Item 4 with a very long text so this will turn into a ellipsis',
    icon: 'wrench',
    iconColor: 'orange',
    body: 'Body text',
    footer: 'footer text',
    progress: 75
  },
  {
    title: 'Item 4 with a very long text so this will turn into a ellipsis',
    icon: 'chain',
    iconColor: 'red',
    body: 'Body text',
    footer: 'footer text',
    progress: 100
  },
  {
    title: 'Item 4 with a very long text so this will turn into a ellipsis',
    icon: 'lightning',
    iconColor: 'red',
    body: 'Body text',
    footer: 'footer text'
  },
  {
    title: 'Item 4 with a very long text so this will turn into a ellipsis',
    icon: 'lightning',
    iconColor: 'orange',
    body: 'Body text',
    footer: 'footer text'
  },
  {
    title: 'Item 4 with a very long text so this will turn into a ellipsis',
    icon: 'lightning',
    iconColor: 'orange',
    body: 'Body text',
    footer: 'footer text'
  },
  {
    title: 'Item 4 with a very long text so this will turn into a ellipsis',
    icon: 'wrench',
    iconColor: 'red',
    body: 'Body text',
    footer: 'footer text'
  },
  {
    title: 'Item 4 with a very long text so this will turn into a ellipsis',
    icon: 'lightning',
    iconColor: 'orange',
    body: 'Body text',
    footer: 'footer text'
  },
  {
    title: 'Item 4 with a very long text so this will turn into a ellipsis',
    icon: 'lightning',
    iconColor: 'orange',
    body: 'Body text',
    footer: 'footer text'
  },
  {
    title: 'Item 1',
    icon: 'wrench',
    iconColor: 'yellow',
    body: 'Body text'
  }
];

export default function CardsPage() {
  const [listMode, setListMode] = useState(false);
  const [bigCard, setBigCard] = useState<number>();

  useEffect(() => {
    document.querySelector('.big')?.scrollIntoView({
      behavior: 'smooth'
    });
  });

  function getIcon(icon: IconTypes): IconType {
    if (icon === 'lightning') {
      return 'lightning-fill';
    }

    if (icon === 'chain') {
      return 'wrench-adjustable';
    }

    return 'fire';
  }

  function getProgressColor(progress?: number) {
    if (!progress) {
      return '';
    }

    if (progress === 100) {
      return 'success';
    }

    if (progress >= 50 && progress < 100) {
      return 'warning';
    }

    return 'danger';
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
        {cards.map(
          ({ title, body, footer, icon, iconColor, progress }, index) => (
            <Card className={`card-light ${bigCard === index ? 'big' : ''}`}>
              <CardHeader>
                <div className={`card-icon ${iconColor}`}>
                  <Icon type={getIcon(icon)} color="white" />
                </div>
                <div
                  className="card-title clickable"
                  onClick={() =>
                    setBigCard(bigCard === index ? undefined : index)
                  }
                >
                  <span>
                    {index + 1}: {title}
                  </span>
                </div>
                {(index + 1) % 2 === 0 && (
                  <div className="card-button">
                    <Icon type="pencil-fill" color="white" />
                  </div>
                )}
              </CardHeader>
              <CardBody>
                {body}
                {bigCard === index && (
                  <>
                    <Card className="card-light w-50 border border-3">
                      <CardHeader>
                        <div className="card-title">Hallo</div>
                      </CardHeader>
                      <CardBody>
                        <Row>
                          <Col xs={6}>
                            <DescriptionList>
                              <DescriptionListItem label="Username">
                                User
                              </DescriptionListItem>
                              <DescriptionListItem label="Username">
                                User
                              </DescriptionListItem>
                              <DescriptionListItem label="Username">
                                User
                              </DescriptionListItem>
                            </DescriptionList>
                          </Col>
                          <Col xs={6}>
                            <DescriptionList horizontal horizontalLeft>
                              <DescriptionListItem label="Username">
                                User
                              </DescriptionListItem>
                            </DescriptionList>
                          </Col>
                        </Row>
                      </CardBody>
                    </Card>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      In tellus metus, iaculis vel massa eu, feugiat tincidunt
                      lacus. Praesent nec pellentesque erat, sodales rhoncus
                      augue. Donec egestas, est non scelerisque tincidunt, quam
                      leo vehicula turpis, et pharetra libero libero quis est.
                      Quisque eu rutrum diam. Sed sit amet augue arcu. Nulla
                      euismod lacus in fringilla lobortis. Aenean mattis felis
                      tellus, non sagittis magna molestie vitae. Morbi sit amet
                      viverra neque, eu imperdiet enim. Quisque dui turpis,
                      malesuada id faucibus sed, maximus vitae turpis. Cras quis
                      pretium ligula. Pellentesque luctus lacus eget nunc
                      pulvinar, a malesuada lorem varius. Nulla sodales
                      dignissim ex, cursus elementum arcu commodo eu. Proin non
                      nisl sapien. Nam tellus dolor, maximus sit amet ipsum a,
                      rutrum imperdiet sapien. Integer tempor nibh quis odio
                      dictum egestas a quis risus. Phasellus sit amet massa
                      tincidunt arcu scelerisque dapibus quis eu neque.
                    </p>

                    <p>
                      Cras porta maximus nulla nec gravida. Proin non cursus
                      mauris. In hac habitasse platea dictumst. Integer luctus
                      odio pellentesque turpis tincidunt congue. Maecenas et
                      purus tellus. Etiam tempus diam eget est ultricies, eget
                      eleifend dui porttitor. Donec semper, libero sed suscipit
                      tempus, metus arcu ultricies mi, a hendrerit tellus erat
                      tempor dolor. Pellentesque semper lacus dictum nulla
                      vulputate, id sollicitudin sem sagittis.
                    </p>

                    <p>
                      Suspendisse iaculis tortor vel mi tempor, ut porttitor
                      urna pharetra. Etiam in lobortis ex, vel commodo nisl.
                      Curabitur molestie elit justo, eget hendrerit erat
                      molestie non. Vivamus auctor turpis metus, non ornare mi
                      finibus et. Aenean maximus metus quis varius rhoncus.
                      Aliquam erat volutpat. Vestibulum tincidunt, arcu quis
                      pretium vulputate, justo erat eleifend sapien, vel
                      lobortis nisi sapien quis lacus.
                    </p>

                    <p>
                      Donec nisi lectus, commodo vel sodales at, scelerisque
                      eget purus. Vivamus sed risus dolor. In auctor quis diam
                      at ornare. Ut orci enim, varius at varius eu, aliquam quis
                      arcu. Fusce condimentum vel diam id accumsan. Maecenas in
                      nibh at odio ultricies bibendum. Nunc a pulvinar leo.
                      Donec lacinia a nisl nec volutpat.
                    </p>

                    <p>
                      Nulla gravida tellus est, in volutpat metus sollicitudin
                      luctus. Nunc at velit at ipsum rhoncus euismod. Nunc
                      tristique elementum libero, nec commodo eros eleifend sed.
                      Pellentesque sem lacus, elementum fringilla elementum ac,
                      dapibus vel ipsum. Sed quis justo ex. Quisque eget
                      suscipit velit, ac egestas ante. Sed varius, risus sit
                      amet fringilla congue, augue turpis ultricies nunc, a
                      pulvinar erat augue eget magna. Suspendisse feugiat lacus
                      et metus posuere aliquam. Etiam imperdiet commodo augue,
                      sed tincidunt tellus sagittis dignissim. Nullam ligula
                      massa, interdum a fringilla id, efficitur quis urna. Proin
                      et cursus leo. Etiam tristique eros in sapien vestibulum
                      malesuada. Ut porttitor diam et magna sollicitudin
                      aliquam. Fusce blandit ultrices cursus.
                    </p>
                  </>
                )}
              </CardBody>
              <div className="card-progress">
                <Progress value={progress} color={getProgressColor(progress)}>
                  {progress}/100
                </Progress>
              </div>
              <CardFooter>{footer}</CardFooter>
            </Card>
          )
        )}
      </div>
    </Page>
  );
}
