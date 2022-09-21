import { ReactNode, useEffect, useState } from 'react';
import usePrevious from '../../../hooks/usePrevious/usePrevious';

interface Props {
  conditionFn: () => Promise<boolean>;
  children: ReactNode;
  reset?: () => void;
}

export default function AsyncCondition(props: Props) {
  const { conditionFn, children, reset } = props;
  const [isOpen, setIsOpen] = useState(false);
  const prevIsOpen = usePrevious(isOpen);

  useEffect(() => {
    if (isOpen && isOpen !== prevIsOpen && reset) {
      reset();
    }

    (async function load() {
      const expression = await conditionFn();
      setIsOpen(expression);
    })();
  }, [conditionFn, reset, isOpen, prevIsOpen]);

  return isOpen ? <>{children}</> : <></>;
}
