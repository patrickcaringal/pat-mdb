import * as constants from './constants';
import * as interfaces from './interfaces';

export const initialState: interfaces.TState = {
    movies: [],
    popularMovies: [] as interfaces.IMovie[],
    trendingMovies: [] as interfaces.IMovie[],
    // UI
    loaders: {}
};

const reducer = (
    state: interfaces.TState = initialState,
    action: interfaces.TAction
): interfaces.TState => {
    switch (action.type) {
        case constants.GET_POPULAR_MOVIES: {
            return {
                ...state,
                loaders: {
                    ...state.loaders,
                    isPopularLoading: true
                }
            };
        }

        case constants.GET_POPULAR_MOVIES_SUCCEED: {
            return {
                ...state,
                popularMovies: action.payload,
                loaders: {
                    ...state.loaders,
                    isPopularLoading: false
                }
            };
        }

        case constants.GET_POPULAR_MOVIES_FAILED: {
            return {
                ...state,
                popularMovies: [],
                loaders: {
                    ...state.loaders,
                    isPopularLoading: false
                }
            };
        }

        case constants.GET_TRENDING_MOVIES: {
            return {
                ...state,
                loaders: {
                    ...state.loaders,
                    isTrendingLoading: true
                }
            };
        }

        case constants.GET_TRENDING_MOVIES_SUCCEED: {
            return {
                ...state,
                trendingMovies: action.payload,
                loaders: {
                    ...state.loaders,
                    isTrendingLoading: false
                }
            };
        }

        case constants.GET_TRENDING_MOVIES_FAILED: {
            return {
                ...state,
                loaders: {
                    ...state.loaders,
                    isTrendingLoading: false
                }
            };
        }

        default:
            return state;
    }
};

export default reducer;
