import * as constants from './constants';
import * as interfaces from './interfaces';

export const initialState: interfaces.TState = {
    movies: [],
    popularMedias: [] as interfaces.IMedia[],
    trendingMedias: [] as interfaces.IMedia[],
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

        case constants.GET_POPULAR_MEDIAS_SUCCEED: {
            return {
                ...state,
                popularMedias: action.payload,
                loaders: {
                    ...state.loaders,
                    isPopularLoading: false
                }
            };
        }

        case constants.GET_POPULAR_MEDIAS_FAILED: {
            return {
                ...state,
                popularMedias: [],
                loaders: {
                    ...state.loaders,
                    isPopularLoading: false
                }
            };
        }

        case constants.GET_TRENDING_MEDIAS: {
            return {
                ...state,
                loaders: {
                    ...state.loaders,
                    isTrendingLoading: true
                }
            };
        }

        case constants.GET_TRENDING_MEDIAS_SUCCEED: {
            return {
                ...state,
                trendingMedias: action.payload,
                loaders: {
                    ...state.loaders,
                    isTrendingLoading: false
                }
            };
        }

        case constants.GET_TRENDING_MEDIAS_FAILED: {
            return {
                ...state,
                trendingMedias: [],
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
