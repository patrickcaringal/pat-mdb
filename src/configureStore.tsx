import { createStore, applyMiddleware } from 'redux';
import reducer from './ducks';
import createSagaMiddleware from 'redux-saga';
import sagas from './ducks/sagas';
// import "regenerator-runtime/runtime";

const sagaMiddleware = createSagaMiddleware();

// export const store = createStore(reducer, applyMiddleware(sagaMiddleware));
const configureStore = (initialState?: any) => {
    const store = createStore(reducer, initialState, applyMiddleware(sagaMiddleware));

    sagaMiddleware.run(sagas);

    return store;
};

export default configureStore;
