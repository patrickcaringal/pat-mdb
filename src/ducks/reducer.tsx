import * as constants from './constants';
import * as interfaces from './interfaces';

export const initialState: interfaces.TState = {
    movies: [],
    popularMedias: [] as interfaces.IMedia[],
    trendingMedias: [] as interfaces.IMedia[],
    catalogMovies: {} as interfaces.IMovieCatalog,
    catalogTVShows: {} as interfaces.ITVShowCatalog,
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

        case constants.GET_CATALOG_MOVIES: {
            return {
                ...state,
                loaders: {
                    ...state.loaders,
                    isCatalogLoading: true
                }
            };
        }

        case constants.GET_CATALOG_MOVIES_SUCCEED: {
            return {
                ...state,
                catalogMovies: action.payload,
                loaders: {
                    ...state.loaders,
                    isCatalogLoading: false
                }
            };
        }

        case constants.GET_CATALOG_MOVIES_FAILED: {
            return {
                ...state,
                catalogMovies: {} as interfaces.IMovieCatalog,
                loaders: {
                    ...state.loaders,
                    isCatalogLoading: false
                }
            };
        }

        case constants.GET_CATALOG_TV_SHOWS: {
            return {
                ...state,
                loaders: {
                    ...state.loaders,
                    isCatalogLoading: true
                }
            };
        }

        case constants.GET_CATALOG_TV_SHOWS_SUCCEED: {
            return {
                ...state,
                catalogTVShows: action.payload,
                loaders: {
                    ...state.loaders,
                    isCatalogLoading: false
                }
            };
        }

        case constants.GET_CATALOG_TV_SHOWS_FAILED: {
            return {
                ...state,
                catalogTVShows: {} as interfaces.ITVShowCatalog,
                loaders: {
                    ...state.loaders,
                    isCatalogLoading: false
                }
            };
        }

        default:
            return state;
    }
};

export default reducer;
