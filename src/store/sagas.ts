import { all, call, delay, put, takeLatest } from 'redux-saga/effects';
import { actions as mediaActions } from './media.slice';
import { actions as movieActions } from './movie.slice';
import { actions as tvShowActions } from './tvShow.slice';
import { actions as personActions } from './person.slice';
import * as interfaces from './interfaces';
import http, { getQueryString } from '../utils/http';

function* getPopularMediasSaga() {
    // const { media, onSuccess } = action.payload;
    try {
        const { data }: { data: interfaces.IMedia[] } = yield call(http.get, 'media/trending');
        yield delay(500);
        yield put(mediaActions.getPopularMediaListSuccess(data));
    } catch (error) {
        console.log(error);
        yield put(mediaActions.getPopularMediaListFail('Error'));
    }
}

function* getMovieDetailSaga(action) {
    const { id, onSuccess } = action.payload;

    try {
        const { data }: { data: interfaces.IMediaDetail } = yield call(
            http.get,
            `movie/${id}/details`
        );
        yield delay(500);
        yield put(movieActions.getMovieDetailSuccess(data));
    } catch (error) {
        console.log(error);
        yield put(movieActions.getMovieDetailFail('Error'));
    }
}

function* getTVShowDetailSaga(action) {
    const { id, onSuccess } = action.payload;

    try {
        const { data }: { data: interfaces.IMediaDetail } = yield call(
            http.get,
            `tv/${id}/details`
        );
        yield delay(500);
        yield put(tvShowActions.getTVShowDetailSuccess(data));
    } catch (error) {
        console.log(error);
        yield put(tvShowActions.getTVShowDetailFail('Error'));
    }
}

function* getPresonDetailSaga(action) {
    const { id, onSuccess } = action.payload;

    try {
        const { data }: { data: interfaces.IPersonDetail } = yield call(
            http.get,
            `person/${id}/details`
        );
        yield delay(500);
        yield put(personActions.getPersonDetailSuccess(data));
    } catch (error) {
        console.log(error);
        yield put(personActions.getPersonDetailFail('Error'));
    }
}

export default function* rootSaga() {
    yield all([yield takeLatest(mediaActions.getPopularMediaList.type, getPopularMediasSaga)]);
    yield all([yield takeLatest(movieActions.getMovieDetail.type, getMovieDetailSaga)]);
    yield all([yield takeLatest(tvShowActions.getTVShowDetail.type, getTVShowDetailSaga)]);
    yield all([yield takeLatest(personActions.getPersonDetail.type, getPresonDetailSaga)]);
}
