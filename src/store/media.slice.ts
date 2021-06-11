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

const initialMediaDetail = {
    id: '',
    title: '',
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
        credits: { ...initialEntityState, data: initialCredits } as i.IStateEntity<i.ICastCrew>
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
        // MOVIE DETAIL
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
        }
    }
});

const mediaSelector = (state: i.TState) => state.media;

// selector
export const popularMediaListSelector = createSelector(
    mediaSelector,
    (state) => state.popularMediaList
);

export const selectors = {
    popularMediaListSelector: createSelector(mediaSelector, (state) => state.popularMediaList),
    mediaDetailSelector: createSelector(mediaSelector, (state) => state.detail),
    mediaCreditsSelector: createSelector(mediaSelector, (state) => state.credits)
};

export const actions = { ...slice.actions };

export default slice.reducer;
