import { useContext } from 'react';
import { CountContext } from '../../context/count';

export const PlusButton = () => {
  const { plusCount } = useContext(CountContext);

  return <button onClick={plusCount}>+ 1</button>;
};
