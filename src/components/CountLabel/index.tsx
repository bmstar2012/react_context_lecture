import React, { useContext} from 'react';
import { CountContext } from '../../context/count';

export const CountLabel = () => {
  const { count } = useContext(CountContext);
  return <div>{count}</div>;
};
