import { Icon } from '../../../ui';
import { IconType } from '../../../ui/Icon/icon-types';

type Props = {
  type: IconType;
  color?: string;
  onClick?: () => void;
};

export default function CardButton(props: Props) {
  const { type, color, onClick } = props;

  return (
    <div className="card-button">
      <Icon type={type} color={color} onClick={onClick} />
    </div>
  );
}
