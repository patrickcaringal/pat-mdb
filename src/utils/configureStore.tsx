import { createStore, applyMiddleware, compose } from 'redux';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import reducer from '../ducks';
import createSagaMiddleware from 'redux-saga';
import sagas from '../ducks/sagas';

const sagaMiddleware = createSagaMiddleware();

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// const configureStore = (initialState?: any) => {
//     const store = createStore(
//         reducer,
//         initialState,
//         composeEnhancers(applyMiddleware(sagaMiddleware))
//     );
//     sagaMiddleware.run(sagas);
//     return store;
// };

export default () => {
    const store = configureStore({
        reducer,
        middleware: [...getDefaultMiddleware({ thunk: false }), sagaMiddleware]
    });
    sagaMiddleware.run(sagas);

    return store;
};
