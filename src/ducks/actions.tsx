import * as constants from './constants';
import * as interfaces from './interfaces';

export const getPopularMovies = (): interfaces.TAction => ({
    type: constants.GET_POPULAR_MOVIES
});

export const getPopularMoviesSucceed = (payload: interfaces.IMovie[]): interfaces.TAction => ({
    type: constants.GET_POPULAR_MOVIES_SUCCEED,
    payload
});

export const getPopularMoviesFailed = (payload: string): interfaces.TAction => ({
    type: constants.GET_POPULAR_MOVIES_FAILED,
    payload
});
