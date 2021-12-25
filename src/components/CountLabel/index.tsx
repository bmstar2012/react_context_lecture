import React, { useContext} from 'react';
import { useCountProvider } from '../../context/count';

export const CountLabel = () => {
  const { count } = useCountProvider();
  return <div>{count}</div>;
};
