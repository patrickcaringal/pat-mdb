import { createReducer, createSlice } from '@reduxjs/toolkit';
import * as constants from './constants';
import * as interfaces from './interfaces';
import * as actions from './actions';

export const initialState: interfaces.TState = {
    movies: [],
    popularMedias: [] as interfaces.IMedia[],
    trendingMedias: [] as interfaces.IMedia[],
    catalogMovies: {} as interfaces.IMovieCatalog,
    catalogTVShows: {} as interfaces.ITVShowCatalog,
    catalogPeople: {} as interfaces.IPeopleCatalog,
    movieDetail: {} as interfaces.IMediaDetail,
    // UI
    loaders: {}
};

// export default createReducer(initialState, {
//     [actions.getPopularMedias2.type]: (state, action) => {
//         state.popularMedias = [] as interfaces.IMedia[];
//         state.loaders.isPopularLoading = true;
//     }
// });

const slice = createSlice({
    name: 'media',
    initialState: initialState,
    reducers: {
        GET_POPULAR_MOVIES: (state, action) => {
            state.popularMedias = [] as interfaces.IMedia[];
            state.loaders.isPopularLoading = true;
        }
    }
});

// Selector
export const getPopularMedias = (state) => state.popularMedias;
// store.getState().popularMedias

export const { GET_POPULAR_MOVIES } = slice.actions;
export default slice.reducer;

// const reducer = (
//     state: interfaces.TState = initialState,
//     action: interfaces.TAction
// ): interfaces.TState => {
//     switch (action.type) {
//         case actions.getPopularMedias2.type: {
//             return {
//                 ...state,
//                 popularMedias: [] as interfaces.IMedia[],
//                 loaders: {
//                     ...state.loaders,
//                     isPopularLoading: true
//                 }
//             };
//         }

//         case constants.GET_POPULAR_MEDIAS_SUCCEED: {
//             return {
//                 ...state,
//                 popularMedias: action.payload,
//                 loaders: {
//                     ...state.loaders,
//                     isPopularLoading: false
//                 }
//             };
//         }

//         case constants.GET_POPULAR_MEDIAS_FAILED: {
//             return {
//                 ...state,
//                 popularMedias: [],
//                 loaders: {
//                     ...state.loaders,
//                     isPopularLoading: false
//                 }
//             };
//         }

//         case constants.GET_TRENDING_MEDIAS: {
//             return {
//                 ...state,
//                 loaders: {
//                     ...state.loaders,
//                     isTrendingLoading: true
//                 }
//             };
//         }

//         case constants.GET_TRENDING_MEDIAS_SUCCEED: {
//             return {
//                 ...state,
//                 trendingMedias: action.payload,
//                 loaders: {
//                     ...state.loaders,
//                     isTrendingLoading: false
//                 }
//             };
//         }

//         case constants.GET_TRENDING_MEDIAS_FAILED: {
//             return {
//                 ...state,
//                 trendingMedias: [],
//                 loaders: {
//                     ...state.loaders,
//                     isTrendingLoading: false
//                 }
//             };
//         }

//         case constants.GET_CATALOG_MOVIES: {
//             return {
//                 ...state,
//                 loaders: {
//                     ...state.loaders,
//                     isCatalogLoading: true
//                 }
//             };
//         }

//         case constants.GET_CATALOG_MOVIES_SUCCEED: {
//             return {
//                 ...state,
//                 catalogMovies: action.payload,
//                 loaders: {
//                     ...state.loaders,
//                     isCatalogLoading: false
//                 }
//             };
//         }

//         case constants.GET_CATALOG_MOVIES_FAILED: {
//             return {
//                 ...state,
//                 catalogMovies: {} as interfaces.IMovieCatalog,
//                 loaders: {
//                     ...state.loaders,
//                     isCatalogLoading: false
//                 }
//             };
//         }

//         case constants.GET_CATALOG_TV_SHOWS: {
//             return {
//                 ...state,
//                 loaders: {
//                     ...state.loaders,
//                     isCatalogLoading: true
//                 }
//             };
//         }

//         case constants.GET_CATALOG_TV_SHOWS_SUCCEED: {
//             return {
//                 ...state,
//                 catalogTVShows: action.payload,
//                 loaders: {
//                     ...state.loaders,
//                     isCatalogLoading: false
//                 }
//             };
//         }

//         case constants.GET_CATALOG_TV_SHOWS_FAILED: {
//             return {
//                 ...state,
//                 catalogTVShows: {} as interfaces.ITVShowCatalog,
//                 loaders: {
//                     ...state.loaders,
//                     isCatalogLoading: false
//                 }
//             };
//         }

//         case constants.GET_CATALOG_PEOPLE: {
//             return {
//                 ...state,
//                 loaders: {
//                     ...state.loaders,
//                     isCatalogLoading: true
//                 }
//             };
//         }

//         case constants.GET_CATALOG_PEOPLE_SUCCEED: {
//             return {
//                 ...state,
//                 catalogPeople: action.payload,
//                 loaders: {
//                     ...state.loaders,
//                     isCatalogLoading: false
//                 }
//             };
//         }

//         case constants.GET_CATALOG_PEOPLE_FAILED: {
//             return {
//                 ...state,
//                 catalogPeople: {} as interfaces.IPeopleCatalog,
//                 loaders: {
//                     ...state.loaders,
//                     isCatalogLoading: false
//                 }
//             };
//         }

//         // Movie detail
//         case constants.GET_MOVIE_DETAIL: {
//             return {
//                 ...state,
//                 loaders: {
//                     ...state.loaders,
//                     isMovieDetailLoading: true
//                 }
//             };
//         }

//         case constants.GET_MOVIE_DETAIL_SUCCEED: {
//             return {
//                 ...state,
//                 movieDetail: action.payload,
//                 loaders: {
//                     ...state.loaders,
//                     isMovieDetailLoading: false
//                 }
//             };
//         }

//         case constants.GET_MOVIE_DETAIL_FAILED: {
//             return {
//                 ...state,
//                 movieDetail: {} as interfaces.IMediaDetail,
//                 loaders: {
//                     ...state.loaders,
//                     isMovieDetailLoading: false
//                 }
//             };
//         }

//         default:
//             return state;
//     }
// };

// export default reducer;
