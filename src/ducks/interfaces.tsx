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

export type TState = {
    movies: string[];
    popularMedias: IMedia[];
    trendingMedias: IMedia[];
    // UI
    loaders: { [key: string]: boolean };
};

export type TAction =
    | IGetPopularMedias
    | IGetPopularMediasSucceed
    | IGetPopularMediasFailed
    | IGetTrendingMedias
    | IGetTrendingMediasSucceed
    | IGetTrendingMediasFailed;
