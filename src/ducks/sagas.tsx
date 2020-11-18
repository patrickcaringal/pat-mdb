import { all, call, delay, put, takeLatest } from 'redux-saga/effects';
import * as constants from './constants';
import * as actions from './actions';
import * as interfaces from './interfaces';
import http from '../utils/http';

function* getMovies() {
    try {
        console.log('getMovies');
    } catch (error) {
        console.log(error);
    }
}

function* getPopularMovies() {
    try {
        const { data }: { data: interfaces.IMovie[] } = yield call(http.get, 'movie/popular');

        yield delay(500);
        yield put(actions.getPopularMoviesSucceed(data));
    } catch (error) {
        console.log(error);
        yield put(actions.getPopularMoviesFailed('Error'));
    }
}

export default function* rootSaga() {
    // yield takeLatest(constants.GET_MOVIES, getMovies);
    yield all([yield takeLatest(constants.GET_MOVIES, getMovies)]);
    yield all([yield takeLatest(constants.GET_POPULAR_MOVIES, getPopularMovies)]);
}
