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

export const getTrendingMovies = (): interfaces.TAction => ({
    type: constants.GET_TRENDING_MOVIES
});

export const getTrendingMoviesSucceed = (payload: interfaces.IMedia[]): interfaces.TAction => ({
    type: constants.GET_TRENDING_MOVIES_SUCCEED,
    payload
});

export const getTrendingMoviesFailed = (payload: string): interfaces.TAction => ({
    type: constants.GET_TRENDING_MOVIES_FAILED,
    payload
});
