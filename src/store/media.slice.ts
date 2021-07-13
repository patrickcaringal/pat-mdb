import { createSlice, createSelector, createAction } from '@reduxjs/toolkit';
import * as i from './interfaces';

// const createActionTemplate = (action) => ({
//     request: action,
//     success: `${action}Success`,
//     error: `${action}Error`
// });

// const x = createActionTemplate('getPopularMediaList');
// console.log(x);

const initialEntityState = { data: [], fetching: false, fetchFailed: false };

const initialSearchCount = {
    query: '',
    movies: {
        label: '',
        total_pages: 0,
        total_results: 0
    },
    tvShow: {
        label: '',
        total_pages: 0,
        total_results: 0
    },
    person: {
        label: '',
        total_pages: 0,
        total_results: 0
    }
} as i.ISearchCount;

const initialMediaDetail = {
    id: '',
    title: '',
    overview: '',
    genres: [],
    poster: '',
    release_date: '',
    media: i.media_type.MOVIE,
    banner: '',
    budget: 0,
    director: [],
    revenue: 0,
    runtime: 0,
    tagline: '',
    vote_average: 0,
    vote_count: 0,
    cast: [] as i.IPerson[],
    photos: [] as string[],
    videos: [] as i.IVideo[],
    production_companies: [] as i.ICompany[],
    keywords: [] as i.IKeyword[],
    recommendations: [] as i.IMedia[]
} as i.IMediaDetail;

const initialSeasonDetail = {
    ...initialMediaDetail,
    seasonNumber: 0,
    episodes: []
} as i.ISeasonDetail;

const initialCredits = {
    cast: [],
    crew: []
} as i.ICastCrew;

const slice = createSlice({
    name: 'media',
    initialState: {
        popularMediaList: { ...initialEntityState } as i.IStateEntity<i.IMedia[]>,
        detail: { ...initialEntityState, data: initialMediaDetail } as i.IStateEntity<
            i.IMediaDetail
        >,
        seasonDetail: { ...initialEntityState, data: initialSeasonDetail } as i.IStateEntity<
            i.ISeasonDetail
        >,
        credits: { ...initialEntityState, data: initialCredits } as i.IStateEntity<i.ICastCrew>,
        searchCount: {
            ...initialEntityState,
            data: initialSearchCount
        } as i.IStateEntity<i.ISearchCount>
    },
    reducers: {
        getPopularMediaList: (state) => {
            state.popularMediaList.data = [] as i.IMedia[];
            state.popularMediaList.fetching = true;
            state.popularMediaList.fetchFailed = false;
        },
        getPopularMediaListSuccess: (state, action) => {
            state.popularMediaList.data = action.payload;
            state.popularMediaList.fetching = false;
            state.popularMediaList.fetchFailed = false;
        },
        getPopularMediaListFail: (state, action) => {
            state.popularMediaList.data = [] as i.IMedia[];
            state.popularMediaList.fetching = false;
            state.popularMediaList.fetchFailed = true;
        },
        // MEDIA DETAIL
        getMediaDetail: (state, action) => {
            state.detail.data = initialMediaDetail;
            state.detail.fetching = true;
            state.detail.fetchFailed = false;
        },
        getMediaDetailSuccess: (state, action) => {
            state.detail.data = action.payload;
            state.detail.fetching = false;
            state.detail.fetchFailed = false;
        },
        getMediaDetailFail: (state, action) => {
            state.detail.data = initialMediaDetail;
            state.detail.fetching = false;
            state.detail.fetchFailed = true;
        },
        // SEASON DETAIL
        getSeasonDetail: (state, action) => {
            state.seasonDetail.data = initialSeasonDetail;
            state.seasonDetail.fetching = true;
            state.seasonDetail.fetchFailed = false;
        },
        getSeasonDetailSuccess: (state, action) => {
            state.seasonDetail.data = action.payload;
            state.seasonDetail.fetching = false;
            state.seasonDetail.fetchFailed = false;
        },
        getSeasonDetailFail: (state, action) => {
            state.seasonDetail.data = initialSeasonDetail;
            state.seasonDetail.fetching = false;
            state.seasonDetail.fetchFailed = true;
        },
        // CREDITS
        getMediaCredits: (state, action) => {
            state.credits.data = initialCredits;
            state.credits.fetching = true;
            state.credits.fetchFailed = false;
        },
        getMediaCreditsSuccess: (state, action) => {
            state.credits.data = action.payload;
            state.credits.fetching = false;
            state.credits.fetchFailed = false;
        },
        getMediaCreditsFail: (state, action) => {
            state.credits.data = initialCredits;
            state.credits.fetching = false;
            state.credits.fetchFailed = true;
        },
        // SEARCH
        getSearchCount: (state, action) => {
            state.searchCount.data = initialSearchCount;
            state.searchCount.fetching = true;
            state.searchCount.fetchFailed = false;
        },
        getSearchCountSuccess: (state, action) => {
            state.searchCount.data = action.payload;
            state.searchCount.fetching = false;
            state.searchCount.fetchFailed = false;
        },
        getSearchCountFail: (state, action) => {
            state.searchCount.data = initialSearchCount;
            state.searchCount.fetching = false;
            state.searchCount.fetchFailed = true;
        }
    }
});

const mediaSelector = (state: i.TState) => state.media;

// selector
// export const popularMediaListSelector = createSelector(
//     mediaSelector,
//     (state) => state.popularMediaList
// );

export const selectors = {
    searchCountSelector: createSelector(mediaSelector, (state) => state.searchCount),
    popularMediaListSelector: createSelector(mediaSelector, (state) => state.popularMediaList),
    mediaDetailSelector: createSelector(mediaSelector, (state) => state.detail),
    seasonDetailSelector: createSelector(mediaSelector, (state) => state.seasonDetail),
    mediaCreditsSelector: createSelector(mediaSelector, (state) => state.credits)
};

export const actions = { ...slice.actions };

export default slice.reducer;
