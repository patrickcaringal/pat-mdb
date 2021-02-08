import { all, call, delay, put, takeLatest } from 'redux-saga/effects';
import * as constants from './constants';
import * as actions from './actions';
import * as interfaces from './interfaces';
import http, { getQueryString } from '../utils/http';

function* getPopularMedias({ payload: media }: interfaces.IGetPopularMedias) {
    try {
        const { data }: { data: interfaces.IMedia[] } = yield call(http.get, `${media}/popular`);

        yield delay(500);
        yield put(actions.getPopularMediasSucceed(data));
    } catch (error) {
        console.log(error);
        yield put(actions.getPopularMediasFailed('Error'));
    }
}

function* getTrendingMedias({ payload: media }: interfaces.IGetTrendingMedias) {
    try {
        const { data }: { data: interfaces.IMedia[] } = yield call(http.get, `${media}/trending`);

        yield delay(500);
        yield put(actions.getTrendingMediasSucceed(data));
    } catch (error) {
        console.log(error);
        yield put(actions.getTrendingMediasFailed('Error'));
    }
}

function* getCatalogMovies({ payload }: interfaces.IGetCatalogMovies) {
    try {
        const queryString = getQueryString((payload as unknown) as { [key: string]: string });

        const { data }: { data: interfaces.IMovieCatalog } = yield call(
            http.get,
            `movie/discover?${queryString}`
        );

        yield delay(500);
        yield put(actions.getCatalogMoviesSucceed(data));
    } catch (error) {
        console.log(error);
        yield put(actions.getCatalogMoviesFailed('Error'));
    }
}

function* getCatalogTVShows({ payload }: interfaces.IGetCatalogTVShows) {
    try {
        const queryString = getQueryString((payload as unknown) as { [key: string]: string });

        const { data }: { data: interfaces.ITVShowCatalog } = yield call(
            http.get,
            `tv/discover?${queryString}`
        );

        yield delay(500);
        yield put(actions.getCatalogTVShowsSucceed(data));
    } catch (error) {
        console.log(error);
        yield put(actions.getCatalogTVShowsFailed('Error'));
    }
}

function* getCatalogPeople({ payload }: interfaces.IGetCatalogPeople) {
    try {
        const queryString = getQueryString((payload as unknown) as { [key: string]: string });

        console.log('getCatalogPeople', queryString);
        const { data }: { data: interfaces.IPeopleCatalog } = yield call(
            http.get,
            `people/discover?${queryString}`
        );

        yield delay(500);
        yield put(actions.getCatalogPeopleSucceed(data));
    } catch (error) {
        console.log(error);
        yield put(actions.getCatalogPeopleFailed('Error'));
    }
}

export default function* rootSaga() {
    yield all([yield takeLatest(constants.GET_POPULAR_MOVIES, getPopularMedias)]);
    yield all([yield takeLatest(constants.GET_TRENDING_MEDIAS, getTrendingMedias)]);
    yield all([yield takeLatest(constants.GET_CATALOG_MOVIES, getCatalogMovies)]);
    yield all([yield takeLatest(constants.GET_CATALOG_TV_SHOWS, getCatalogTVShows)]);
    yield all([yield takeLatest(constants.GET_CATALOG_PEOPLE, getCatalogPeople)]);
}
