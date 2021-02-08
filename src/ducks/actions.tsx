import * as constants from './constants';
import * as interfaces from './interfaces';
import * as types from './types';

export const getPopularMedias = (payload: types.media): interfaces.IGetPopularMedias => ({
    type: constants.GET_POPULAR_MOVIES,
    payload
});

export const getPopularMediasSucceed = (
    payload: interfaces.IMedia[]
): interfaces.IGetPopularMediasSucceed => ({
    type: constants.GET_POPULAR_MEDIAS_SUCCEED,
    payload
});

export const getPopularMediasFailed = (payload: string): interfaces.IGetPopularMediasFailed => ({
    type: constants.GET_POPULAR_MEDIAS_FAILED,
    payload
});

export const getTrendingMedias = (payload: types.media): interfaces.IGetTrendingMedias => ({
    type: constants.GET_TRENDING_MEDIAS,
    payload
});

export const getTrendingMediasSucceed = (
    payload: interfaces.IMedia[]
): interfaces.IGetTrendingMediasSucceed => ({
    type: constants.GET_TRENDING_MEDIAS_SUCCEED,
    payload
});

export const getTrendingMediasFailed = (payload: string): interfaces.IGetTrendingMediasFailed => ({
    type: constants.GET_TRENDING_MEDIAS_FAILED,
    payload
});

export const getCatalogMovies = (
    payload: interfaces.IGetCatalogMoviesPayload
): interfaces.IGetCatalogMovies => ({
    type: constants.GET_CATALOG_MOVIES,
    payload
});

export const getCatalogMoviesSucceed = (
    payload: interfaces.IMovieCatalog
): interfaces.IGetCatalogMoviesSucceed => ({
    type: constants.GET_CATALOG_MOVIES_SUCCEED,
    payload
});

export const getCatalogMoviesFailed = (payload: string): interfaces.IGetCatalogMoviesFailed => ({
    type: constants.GET_CATALOG_MOVIES_FAILED,
    payload
});

export const getCatalogTVShows = (
    payload: interfaces.IGetCatalogTVShowsPayload
): interfaces.IGetCatalogTVShows => ({
    type: constants.GET_CATALOG_TV_SHOWS,
    payload
});

export const getCatalogTVShowsSucceed = (
    payload: interfaces.ITVShowCatalog
): interfaces.IGetCatalogTVShowsSucceed => ({
    type: constants.GET_CATALOG_TV_SHOWS_SUCCEED,
    payload
});

export const getCatalogTVShowsFailed = (payload: string): interfaces.IGetCatalogTVShowsFailed => ({
    type: constants.GET_CATALOG_TV_SHOWS_FAILED,
    payload
});

export const getCatalogPeople = (
    payload: interfaces.IGetCatalogPeoplePayload
): interfaces.IGetCatalogPeople => ({
    type: constants.GET_CATALOG_PEOPLE,
    payload
});

export const getCatalogPeopleSucceed = (
    payload: interfaces.IPeopleCatalog
): interfaces.IGetCatalogPeopleSucceed => ({
    type: constants.GET_CATALOG_PEOPLE_SUCCEED,
    payload
});

export const getCatalogPeopleFailed = (payload: string): interfaces.IGetCatalogPeopleFailed => ({
    type: constants.GET_CATALOG_PEOPLE_FAILED,
    payload
});
