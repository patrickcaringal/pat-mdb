import { all, takeLatest } from 'redux-saga/effects';
import * as constants from './constants';
import * as actions from './actions';

// export default function* watchIncrementAsync() {
//     yield takeEvery('INCREMENT_ASYNC', incrementAsync);
// }

function* getMovies() {
    try {
        console.log('getMovies');
    } catch (error) {
        console.log(error);
    }
}

export default function* rootSaga() {
    // yield takeLatest(constants.GET_MOVIES, getMovies);
    yield all([yield takeLatest(constants.GET_MOVIES, getMovies)]);
}
