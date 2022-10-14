import { IconType } from './icon-types';

type Props = {
  type: IconType;
  color?: string;
  size?: string;
  onClick?: () => void;
};

export default function Icon(props: Props) {
  const { type, color = '#244e9b', size = '1.5rem', onClick } = props;
  return (
    <i
      className={`bi-${type}`}
      style={{ fontSize: size, color }}
      onClick={onClick}
    />
  );
}
