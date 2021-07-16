import { all, call, delay, put, takeLatest } from 'redux-saga/effects';
import { actions as mediaActions } from './media.slice';
import { actions as personActions } from './person.slice';
import * as i from './interfaces';
import http, { getQueryString } from '../utils/http';

function* getSearchCountSaga(action) {
    const { query, onSuccess } = action.payload;

    try {
        const { data }: { data: i.ISearchCount } = yield call(
            http.get,
            `search/count?query=${query}`
        );
        yield delay(500);
        yield put(mediaActions.getSearchCountSuccess(data));
    } catch (error) {
        console.log(error);
        yield put(mediaActions.getSearchCountFail('Error'));
    }
}

function* getSearchResultListSaga(action) {
    const { media, query, onSuccess } = action.payload;

    try {
        const { data }: { data: i.ISearchCount } = yield call(
            http.get,
            `search/${media}?query=${query}`
        );
        yield delay(500);
        yield put(mediaActions.getSearchResultListSuccess(data));
    } catch (error) {
        console.log(error);
        yield put(mediaActions.getSearchResultListFail('Error'));
    }
}

function* getPopularMediasSaga() {
    // const { media, onSuccess } = action.payload;
    try {
        const { data }: { data: i.IMedia[] } = yield call(http.get, 'media/trending');
        yield delay(500);
        yield put(mediaActions.getPopularMediaListSuccess(data));
    } catch (error) {
        console.log(error);
        yield put(mediaActions.getPopularMediaListFail('Error'));
    }
}

// #region DETAIL
function* getMediaDetailSaga(action) {
    const { id, media, onSuccess } = action.payload;

    try {
        const { data }: { data: i.IMediaDetail } = yield call(http.get, `${media}/${id}/details`);

        yield delay(500);
        yield put(mediaActions.getMediaDetailSuccess(data));
    } catch (error) {
        console.log(error);
        yield put(mediaActions.getMediaDetailFail('Error'));
    }
}

function* getSeasonDetailSaga(action) {
    const { id, seasonNumber, onSuccess } = action.payload;

    try {
        const { data }: { data: i.IMediaDetail } = yield call(
            http.get,
            `tv/${id}/season/${seasonNumber}/details`
        );
        yield delay(500);
        yield put(mediaActions.getSeasonDetailSuccess(data));
    } catch (error) {
        console.log(error);
        yield put(mediaActions.getSeasonDetailFail('Error'));
    }
}

// #region CREDITS
function* getMediaCreditsSaga(action) {
    const { id, media, onSuccess } = action.payload;

    try {
        const { data }: { data: i.IMediaDetail } = yield call(http.get, `${media}/${id}/credits`);
        yield delay(500);
        yield put(mediaActions.getMediaCreditsSuccess(data));
    } catch (error) {
        console.log(error);
        yield put(mediaActions.getMediaCreditsFail('Error'));
    }
}

function* getPresonDetailSaga(action) {
    const { id, onSuccess } = action.payload;

    try {
        const { data }: { data: i.IPersonDetail } = yield call(http.get, `person/${id}/details`);
        yield delay(500);
        yield put(personActions.getPersonDetailSuccess(data));
    } catch (error) {
        console.log(error);
        yield put(personActions.getPersonDetailFail('Error'));
    }
}

export default function* rootSaga() {
    // SEARCH
    yield all([yield takeLatest(mediaActions.getSearchCount.type, getSearchCountSaga)]);
    yield all([yield takeLatest(mediaActions.getSearchResultList.type, getSearchResultListSaga)]);
    // POPULAR
    yield all([yield takeLatest(mediaActions.getPopularMediaList.type, getPopularMediasSaga)]);
    // DETAIL
    yield all([yield takeLatest(mediaActions.getMediaDetail.type, getMediaDetailSaga)]);
    yield all([yield takeLatest(mediaActions.getSeasonDetail.type, getSeasonDetailSaga)]);
    // CREDITS
    yield all([yield takeLatest(mediaActions.getMediaCredits.type, getMediaCreditsSaga)]);
    // PERSON
    yield all([yield takeLatest(personActions.getPersonDetail.type, getPresonDetailSaga)]);
}
