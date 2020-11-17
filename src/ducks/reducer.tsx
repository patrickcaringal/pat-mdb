import * as constants from './constants';
import * as interfaces from './interfaces';

export const initialState: interfaces.TState = {
    movies: [],
    popularMovies: [] as interfaces.IMovie[],
    // UI
    request: {} as interfaces.IRequestObj
};

const reducer = (
    state: interfaces.TState = initialState,
    action: interfaces.TAction
): interfaces.TState => {
    switch (action.type) {
        case constants.GET_POPULAR_MOVIES: {
            return {
                ...state,
                request: {
                    isLoading: true,
                    isSucceed: false,
                    isFailed: false
                }
            };
        }

        case constants.GET_POPULAR_MOVIES_SUCCEED: {
            return {
                ...state,
                popularMovies: action.payload,
                request: {
                    isLoading: false,
                    isSucceed: true,
                    isFailed: false
                }
            };
        }

        case constants.GET_POPULAR_MOVIES_FAILED: {
            return {
                ...state,
                request: {
                    isLoading: false,
                    isSucceed: false,
                    isFailed: true
                }
            };
        }

        default:
            return state;
    }
};

export default reducer;
