import {createContext, useState, useReducer, useContext} from 'react';

const CountContext = createContext({
    count: 0,
    plusCount: () => {
    },
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
            } else {
                return state;
            }
        }
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
// const StateContext = createContext<StateContextType>({state: {status: ConfigStatus.Fetching}, dispatch: (action: Action) => {}});
const StateContext = createContext<StateContextType|undefined>(undefined);

// const DispatchContext = createContext<Dispatch | undefined>(undefined);
const CountProvider = ({children}: Props): JSX.Element => {
    const [count, setCount] = useState(0);
    const [state, dispatch] = useReducer(configReducer, {
        status: ConfigStatus.Fetching,
    });
    console.log('CountProvider', state);

    const plusCount = (): void => {
        setCount(count + 1);
    };

    return (
        <StateContext.Provider value={{state, dispatch}}>
            <CountContext.Provider
                value={{
                    count,
                    plusCount,
                }}>
                {children}
            </CountContext.Provider>
        </StateContext.Provider>
    );
};

function useConfigDispatch() {
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

export {CountContext, CountProvider, useConfigDispatch};
