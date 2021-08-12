import { ReactNode, useEffect, useState } from 'react';
import usePrevious from '../../../hooks/usePrevious/usePrevious';

interface Props {
  condition: boolean;
  children: ReactNode;
  reset?: () => void;
}

export default function Condition(props: Props) {
  const { condition, children, reset } = props;
  const [isOpen, setIsOpen] = useState(false);
  const prevIsOpen = usePrevious(isOpen);

  useEffect(() => {
    if (isOpen && isOpen !== prevIsOpen && reset) {
      reset();
    }
    setIsOpen(condition);
  }, [condition, reset, isOpen, prevIsOpen]);

  return isOpen ? <>{children}</> : <></>;
}
