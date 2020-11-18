import * as constants from './constants';

// State
export interface IMovie {
    id: string;
    title: string;
    genres: string[];
    poster: string;
    release_date: string;
}

// Action
export interface IGetPopularMovies {
    type: typeof constants.GET_POPULAR_MOVIES;
}

export interface IGetPopularMoviesSucceed {
    type: typeof constants.GET_POPULAR_MOVIES_SUCCEED;
    payload: IMovie[];
}

export interface IGetPopularMoviesFailed {
    type: typeof constants.GET_POPULAR_MOVIES_FAILED;
    payload: string;
}

export type TState = {
    movies: string[];
    popularMovies: IMovie[];
    // UI
    loaders: { [key: string]: boolean };
};

export type TAction = IGetPopularMovies | IGetPopularMoviesSucceed | IGetPopularMoviesFailed;
