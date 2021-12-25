import React, {useContext, useEffect, useState} from 'react';
import {CountContext, useConfigDispatch, ConfigStatus as CountConfigStatus} from '../../context/count';

export const PlusButton = () => {
  console.log("button - useEffect");
  const {plusCount} = useContext(CountContext);
  const [currency, setCurrency] = useState(0);
  useEffect(() => {
    console.log("button - useEffect", currency);
  })
  const dispatch = useConfigDispatch();

  return (<>
    <div>
      <button type='button' onClick={plusCount}>+ 1</button>
    </div>
    <div>
      <button type='button' onClick={() => setCurrency(currency + 1)}>+ 1</button>
    </div>
    <div>
      <button type='button' onClick={() => {
        dispatch({status: CountConfigStatus.Initialized})
      }}>Update status
      </button>
    </div>
  </>);
};
