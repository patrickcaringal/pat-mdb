import * as constants from './constants';

// State
export interface IMovie {
    id: string;
    title: string;
    genres: string[];
    poster_path: string;
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

export interface IRequestObj {
    isLoading: boolean;
    isSucceed: boolean;
    isFailed: boolean;
}

export type TState = {
    movies: string[];
    popularMovies: IMovie[];
    // UI
    request: IRequestObj;
};

export type TAction = IGetPopularMovies | IGetPopularMoviesSucceed | IGetPopularMoviesFailed;
