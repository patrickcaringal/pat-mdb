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

// function* getMovieDetailSaga(action) {
//     const { id, onSuccess } = action.payload;

//     try {
//         const { data }: { data: i.IMediaDetail } = yield call(http.get, `movie/${id}/details`);
//         yield delay(500);
//         yield put(movieActions.getMovieDetailSuccess(data));
//     } catch (error) {
//         console.log(error);
//         yield put(movieActions.getMovieDetailFail('Error'));
//     }
// }

// function* getTVShowDetailSaga(action) {
//     const { id, onSuccess } = action.payload;

//     try {
//         const { data }: { data: i.IMediaDetail } = yield call(http.get, `tv/${id}/details`);
//         yield delay(500);
//         yield put(tvShowActions.getTVShowDetailSuccess(data));
//     } catch (error) {
//         console.log(error);
//         yield put(tvShowActions.getTVShowDetailFail('Error'));
//     }
// }
// #endregion DETAIL

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

// function* getMovieCreditsSaga(action) {
//     const { id, onSuccess } = action.payload;

//     try {
//         const { data }: { data: i.IMediaDetail } = yield call(http.get, `movie/${id}/credits`);
//         yield delay(500);
//         yield put(movieActions.getMovieCreditsSuccess(data));
//     } catch (error) {
//         console.log(error);
//         yield put(movieActions.getMovieCreditsFail('Error'));
//     }
// }

// function* getTVShowCreditsSaga(action) {
//     const { id, onSuccess } = action.payload;

//     try {
//         const { data }: { data: i.IMediaDetail } = yield call(http.get, `tv/${id}/credits`);
//         yield delay(500);
//         yield put(tvShowActions.getTVShowCreditsSuccess(data));
//     } catch (error) {
//         console.log(error);
//         yield put(tvShowActions.getTVShowCreditsFail('Error'));
//     }
// }
// #endregion CREDITS

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
    // POPULAR
    yield all([yield takeLatest(mediaActions.getPopularMediaList.type, getPopularMediasSaga)]);
    // DETAIL
    yield all([yield takeLatest(mediaActions.getMediaDetail.type, getMediaDetailSaga)]);
    // yield all([yield takeLatest(movieActions.getMovieDetail.type, getMovieDetailSaga)]);
    // yield all([yield takeLatest(tvShowActions.getTVShowDetail.type, getTVShowDetailSaga)]);

    yield all([yield takeLatest(mediaActions.getSeasonDetail.type, getSeasonDetailSaga)]);

    // CREDITS
    yield all([yield takeLatest(mediaActions.getMediaCredits.type, getMediaCreditsSaga)]);
    // yield all([yield takeLatest(movieActions.getMovieCredits.type, getMovieCreditsSaga)]);
    // yield all([yield takeLatest(tvShowActions.getTVShowCredits.type, getTVShowCreditsSaga)]);
    // PERSON
    yield all([yield takeLatest(personActions.getPersonDetail.type, getPresonDetailSaga)]);
}
