import classNames from 'classnames';
import { Icon } from '../../../ui';
import { IconType } from '../../../ui/Icon/icon-types';

type Props = {
  type: IconType;
  bgColor?: string;
};

export default function CardIcon(props: Props) {
  const { type, bgColor } = props;

  const className = classNames('card-icon', bgColor);

  return (
    <div className={className}>
      <Icon type={type} color="white" />
    </div>
  );
}
