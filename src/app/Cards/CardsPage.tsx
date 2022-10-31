import classNames from 'classnames';
import { ReactNode, useState } from 'react';
import { Card, CardBody, CardHeader, CardTitle, Col, Row } from 'reactstrap';
import { Icon, Page } from '../../ui';
import DescriptionList from '../../ui/List/DescriptionList';
import DescriptionListItem from '../../ui/List/DescriptionListItem';
import CardPanel from './CardPanel';

type IconColor =
  | 'bg-primary'
  | 'bg-secondary'
  | 'bg-danger'
  | 'bg-warning'
  | 'bg-info'
  | 'bg-orange'
  | 'bg-success';
type IconTypes = 'wrench' | 'lightning' | 'chain';

type CardObj = {
  title: string;
  icon: IconTypes;
  iconColor: IconColor;
  body: ReactNode;
  footer?: ReactNode;
  progress?: number;
  buttonClick?: () => void;
};

const cards: CardObj[] = [
  {
    title: 'Item 1',
    icon: 'wrench',
    iconColor: 'bg-orange',
    body: 'Body text'
  },
  {
    title: 'Item 1',
    icon: 'lightning',
    iconColor: 'bg-danger',
    body: 'Body text'
  },
  {
    title: 'Item 1',
    icon: 'chain',
    iconColor: 'bg-warning',
    body: 'Body text'
  },
  {
    title: 'Item title',
    icon: 'lightning',
    iconColor: 'bg-danger',
    body: 'Body text',
    footer: 'footer text',
    progress: 40
  },
  {
    title: 'Item title',
    icon: 'chain',
    iconColor: 'bg-danger',
    body: 'Body text',
    footer: 'footer text'
  },
  {
    title: 'Item 4 with a very long text so this will turn into a ellipsis',
    icon: 'lightning',
    iconColor: 'bg-orange',
    body: 'Body text',
    footer: 'footer text'
  },
  {
    title: 'Item 4 with a very long text so this will turn into a ellipsis',
    icon: 'wrench',
    iconColor: 'bg-warning',
    body: 'Body text',
    footer: 'footer text',
    progress: 20
  },
  {
    title: 'Bigger item title but not ot big',
    icon: 'lightning',
    iconColor: 'bg-warning',
    body: 'Body text',
    footer: 'footer text'
  },
  {
    title: 'Item 4 with a very long text so this will turn into a ellipsis',
    icon: 'wrench',
    iconColor: 'bg-orange',
    body: 'Body text',
    footer: 'footer text',
    progress: 75
  },
  {
    title: 'Item 4 with a very long text so this will turn into a ellipsis',
    icon: 'chain',
    iconColor: 'bg-danger',
    body: 'Body text',
    footer: 'footer text',
    progress: 100
  },
  {
    title: 'Item 4 with a very long text so this will turn into a ellipsis',
    icon: 'lightning',
    iconColor: 'bg-danger',
    body: 'Body text',
    footer: 'footer text'
  },
  {
    title: 'Item 4 with a very long text so this will turn into a ellipsis',
    icon: 'lightning',
    iconColor: 'bg-orange',
    body: 'Body text',
    footer: 'footer text'
  },
  {
    title: 'Item 4 with a very long text so this will turn into a ellipsis',
    icon: 'lightning',
    iconColor: 'bg-orange',
    body: 'Body text',
    footer: 'footer text'
  },
  {
    title: 'Item 4 with a very long text so this will turn into a ellipsis',
    icon: 'wrench',
    iconColor: 'bg-danger',
    body: 'Body text',
    footer: 'footer text',
    buttonClick: () => console.log('Hallow')
  },
  {
    title: 'Item 4 with a very long text so this will turn into a ellipsis',
    icon: 'lightning',
    iconColor: 'bg-orange',
    body: 'Body text',
    footer: 'footer text'
  },
  {
    title: 'Item 4 with a very long text so this will turn into a ellipsis',
    icon: 'lightning',
    iconColor: 'bg-orange',
    body: 'Body text',
    footer: 'footer text'
  },
  {
    title: 'Item 1',
    icon: 'wrench',
    iconColor: 'bg-warning',
    body: 'Body text'
  }
];

export default function CardsPage() {
  const [listMode, setListMode] = useState(false);
  const [bigCard, setBigCard] = useState<number>();

  const names = classNames('card-columns', { horizontal: listMode });

  return (
    <Page
      filterBar={
        <div className="d-flex flex-row-reverse p-1 px-3">
          <Icon
            type={listMode ? 'grid-3x3-gap-fill' : 'list'}
            className="px-2 bg-primary text-white"
            onClick={() => setListMode(!listMode)}
          />
        </div>
      }
    >
      <div className={names}>
        {cards.map(
          (
            { title, body, footer, icon, iconColor, progress, buttonClick },
            index
          ) => (
            <CardPanel
              title={`${index + 1}: ${title}`}
              footer={footer}
              icon={icon}
              iconBg={iconColor}
              progress={
                progress
                  ? { current: progress, max: 100 }
                  : { current: 0, max: 100 }
              }
              headerClick={() =>
                setBigCard(bigCard === index ? undefined : index)
              }
              editClick={buttonClick}
              bigView={bigCard === index}
            >
              {bigView =>
                !bigView ? (
                  body
                ) : (
                  <>
                    <Card className="card-light w-50 border border-3">
                      <CardHeader>
                        <CardTitle>Hallo</CardTitle>
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
                )
              }
            </CardPanel>
          )
        )}
      </div>
    </Page>
  );
}