import logo from '../../styles/images/logo.svg';

type Props = {
  height?: number;
  className?: string;
};

export default function Logo(props: Props) {
  const { height, className } = props;

  return (
    <img
      className={className}
      src={logo}
      alt="logo"
      style={{
        height
      }}
    />
  );
}
