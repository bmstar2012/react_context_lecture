import {useContext, useEffect, useState} from 'react';
import { CountContext } from '../../context/count';

export const PlusButton = () => {
    console.log("useEffect");
  const { plusCount } = useContext(CountContext);
  const [currency, setCurrency] = useState(0);
  useEffect(() => {
      console.log("useEffect", currency);
  })

  return (
      <>
      <button onClick={plusCount}>+ 1</button>
      <button onClick={() => setCurrency(currency + 1)}>+ 1</button>
      </>);
};
