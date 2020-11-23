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

function* getPopularMedias() {
    try {
        const { data }: { data: interfaces.IMedia[] } = yield call(http.get, 'movie/popular');

        yield delay(500);
        yield put(actions.getPopularMediasSucceed(data));
    } catch (error) {
        console.log(error);
        yield put(actions.getPopularMediasFailed('Error'));
    }
}

function* getTrendingMovies() {
    try {
        const { data }: { data: interfaces.IMedia[] } = yield call(http.get, 'movie/trending');

        yield delay(500);
        yield put(actions.getTrendingMoviesSucceed(data));
    } catch (error) {
        console.log(error);
        yield put(actions.getTrendingMoviesFailed('Error'));
    }
}

export default function* rootSaga() {
    // yield takeLatest(constants.GET_MOVIES, getMovies);
    yield all([yield takeLatest(constants.GET_MOVIES, getMovies)]);
    yield all([yield takeLatest(constants.GET_POPULAR_MOVIES, getPopularMedias)]);
    yield all([yield takeLatest(constants.GET_TRENDING_MOVIES, getTrendingMovies)]);
}
