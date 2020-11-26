import * as constants from './constants';
import * as types from './types';

// State
export interface IMedia {
    id: string;
    title: string;
    genres: string[];
    poster: string;
    release_date: string;
}

export interface IMediaCatalog {
    page: boolean;
    total_pages: boolean;
    total_results: boolean;
    movies: IMedia[];
}

// Action
export interface IGetPopularMedias {
    type: typeof constants.GET_POPULAR_MOVIES;
    payload: types.media;
}

export interface IGetPopularMediasSucceed {
    type: typeof constants.GET_POPULAR_MEDIAS_SUCCEED;
    payload: IMedia[];
}

export interface IGetPopularMediasFailed {
    type: typeof constants.GET_POPULAR_MEDIAS_FAILED;
    payload: string;
}

export interface IGetTrendingMedias {
    type: typeof constants.GET_TRENDING_MEDIAS;
    payload: types.media;
}

export interface IGetTrendingMediasSucceed {
    type: typeof constants.GET_TRENDING_MEDIAS_SUCCEED;
    payload: IMedia[];
}

export interface IGetTrendingMediasFailed {
    type: typeof constants.GET_TRENDING_MEDIAS_FAILED;
    payload: string;
}

export interface IGetCatalogMoviesPayload {
    // "popularity.desc"
    selectedSort: string;
    selectedGenres: string;
    releaseStartDate: string;
    releaseEndDate: string;
}

export interface IGetCatalogMovies {
    type: typeof constants.GET_CATALOG_MOVIES;
    payload: IGetCatalogMoviesPayload;
}

export interface IGetCatalogMoviesSucceed {
    type: typeof constants.GET_CATALOG_MOVIES_SUCCEED;
    payload: IMediaCatalog;
}

export interface IGetCatalogMoviesFailed {
    type: typeof constants.GET_CATALOG_MOVIES_FAILED;
    payload: string;
}

export type TState = {
    movies: string[];
    popularMedias: IMedia[];
    trendingMedias: IMedia[];
    catalogMovies: IMediaCatalog;
    // UI
    loaders: { [key: string]: boolean };
};

export type TAction =
    | IGetPopularMedias
    | IGetPopularMediasSucceed
    | IGetPopularMediasFailed
    | IGetTrendingMedias
    | IGetTrendingMediasSucceed
    | IGetTrendingMediasFailed
    | IGetCatalogMovies
    | IGetCatalogMoviesSucceed
    | IGetCatalogMoviesFailed;
