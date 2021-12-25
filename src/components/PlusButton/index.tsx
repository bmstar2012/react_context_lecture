import React, {useContext, useEffect, useState} from 'react';
import {useCountProvider, useConfigDispatch, ConfigStatus as CountConfigStatus} from '../../context/count';

export const PlusButton = () => {
  const {plusCount, count} = useCountProvider();
  const [currency, setCurrency] = useState(0);
  // eslint-disable-next-line no-console
  console.log("button - render", count);
  useEffect(() => {
    console.log("button - useEffect", currency);
  }, [currency]);
  const dispatch = useConfigDispatch();

  return (<>
    <div>
      <button type='button' onClick={plusCount}>+ 1: {count}</button>
    </div>
    <div>
      <button type='button' onClick={() => {
        setCurrency(currency + 1);
      }}>set currency</button>
    </div>
    <div>
      <button type='button' onClick={() => {
        dispatch({status: CountConfigStatus.Initialized})
      }}>Update status
      </button>
    </div>
  </>);
};
