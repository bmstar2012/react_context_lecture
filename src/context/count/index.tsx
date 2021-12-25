import React, {createContext, useState, useReducer, useContext} from 'react';

interface ICountContext {
  count: number;
  plusCount(): void;
  minusCount(): void;
}

const CountContext = React.createContext<ICountContext>({
  count: 0,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  plusCount: () => {
  },
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  minusCount: () => {
  }
});

interface Props {
  children: JSX.Element | JSX.Element[];
}

export enum ConfigStatus {
  Initialized,
  Fetching,
  Ready,
  Failure,
}

interface Config {
  number: number;
  init: boolean;
}

interface State {
  status: ConfigStatus;
  config?: Config;
}

interface Initialized {
  status: ConfigStatus.Initialized;
  config?: Config;
}

interface Fetching {
  status: ConfigStatus.Fetching;
}

interface Ready {
  status: ConfigStatus.Ready;
}

interface Failure {
  status: ConfigStatus.Failure;
  config?: undefined;
}

export type Action = Initialized | Fetching | Ready | Failure;

function configReducer(state: State, action: Action): State {
  console.log("configReducer", state, action);
  switch (action.status) {
    case ConfigStatus.Ready:
    case ConfigStatus.Initialized: {
      return {...state, ...action};
    }
    case ConfigStatus.Failure: {
      if (state.status === ConfigStatus.Fetching) {
        return {...state, ...action};
      }
      return state;
    }
    default:
    case ConfigStatus.Fetching: {
      return {
        ...state,
        ...action,
      };
    }
  }
}

type Dispatch = (action: Action) => void;

interface StateContextType {
  state: State;
  dispatch: Dispatch;
}

// const StateContext = createContext<State | undefined>(undefined);
const StateContext = createContext<StateContextType | undefined>(undefined);

// const DispatchContext = createContext<Dispatch | undefined>(undefined);
export const CountProvider = ({children}: Props): JSX.Element => {
  const [count, setCount] = useState(0);
  const [state, dispatch] = useReducer(configReducer, {
    status: ConfigStatus.Fetching,
  });

  const plusCount = (): void => {
    setCount(count + 1);
  };

  const minusCount = (): void => {
    setCount(count - 1);
  };

  // eslint-disable-next-line react/react-in-jsx-scope
  return (
      <StateContext.Provider value={{state, dispatch}}>
        <CountContext.Provider
          value={{
            count,
            plusCount,
            minusCount
          }}>
          {children}
        </CountContext.Provider>
      </StateContext.Provider>
  );
};

export const useCountProvider = () => useContext(CountContext);

export const useConfigDispatch = () => {
  const stateContext = useContext(StateContext);
  const dispatch = stateContext?.dispatch;
  if (!dispatch) {
    throw new Error(`invalid dispatch`);
  }

  // return () => {dispatch({
  //     status: ConfigStatus.Ready
  // })};
  return dispatch;
}
