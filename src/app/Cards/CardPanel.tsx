import { ReactNode } from 'react';
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardTitle,
  Progress
} from 'reactstrap';
import { IconType } from '../../ui/Icon/icon-types';
import ScrollTo from '../../ui/ScrollTo/ScrollTo';
import CardButton from './parts/CardButton';
import CardIcon from './parts/CardIcon';

type IconTypes = 'wrench' | 'lightning' | 'chain' | IconType;
type IconBg =
  | 'bg-primary'
  | 'bg-secondary'
  | 'bg-danger'
  | 'bg-warning'
  | 'bg-info'
  | 'bg-orange'
  | 'bg-success';

type Props = {
  title: string;
  icon: IconTypes;
  iconBg?: IconBg;
  headerClick?: () => void;
  editClick?: () => void;
  bigView?: boolean;
  className?: string;
  children:
    | ((bigView: boolean) => ReactNode | ReactNode[])
    | ReactNode
    | ReactNode[];
  footer?: ReactNode | ReactNode[];
  progress?: { current: number; max: number; suffix?: string };
};

export default function CardPanel(props: Props) {
  const {
    title,
    icon,
    iconBg = 'bg-primary',
    headerClick,
    editClick,
    bigView = false,
    children,
    footer,
    className,
    progress
  } = props;

  function getIcon(icon: IconTypes): IconType {
    if (icon === 'lightning') {
      return 'lightning-fill';
    }

    if (icon === 'chain') {
      return 'wrench-adjustable';
    }

    if (icon === 'fire') {
      return 'fire';
    }

    return icon;
  }

  function getProgressColor() {
    if (!progress) {
      return '';
    }

    if (progress.current === progress.max) {
      return 'success';
    }

    if (
      progress.current >= progress.max / 2 &&
      progress.current < progress.max
    ) {
      return 'warning';
    }

    return 'danger';
  }

  const card = (
    <Card className={`card-light ${bigView ? 'big' : ''} ${className}`}>
      <CardHeader>
        <CardIcon type={getIcon(icon)} bgColor={iconBg} />
        <CardTitle
          className={headerClick ? 'clickable' : ''}
          onClick={headerClick}
        >
          <span>{title}</span>
        </CardTitle>
        {editClick && (
          <CardButton type="pencil-fill" color="white" onClick={editClick} />
        )}
      </CardHeader>
      <CardBody>
        {typeof children === 'function' ? children(bigView) : children}
      </CardBody>
      {progress && (
        <div className="card-progress">
          <Progress value={progress.current} color={getProgressColor()}>
            {`${progress.current}${progress.suffix || ''}`} /{' '}
            {`${progress.max}${progress.suffix || ''}`}
          </Progress>
        </div>
      )}
      <CardFooter>{footer}</CardFooter>
    </Card>
  );

  return bigView ? <ScrollTo>{card}</ScrollTo> : card;
}
