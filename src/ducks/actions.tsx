import * as constants from './constants';
import * as interfaces from './interfaces';

export const getPopularMedias = (): interfaces.TAction => ({
    type: constants.GET_POPULAR_MOVIES
});

export const getPopularMediasSucceed = (payload: interfaces.IMedia[]): interfaces.TAction => ({
    type: constants.GET_POPULAR_MEDIAS_SUCCEED,
    payload
});

export const getPopularMediasFailed = (payload: string): interfaces.TAction => ({
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
