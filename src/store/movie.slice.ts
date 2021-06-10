import { createSlice, createSelector } from '@reduxjs/toolkit';
import * as i from './interfaces';

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
    name: 'movie',
    initialState: {
        detail: { ...initialEntityState, data: initialMediaDetail } as i.IStateEntity<
            i.IMediaDetail
        >,
        credits: { ...initialEntityState, data: initialCredits } as i.IStateEntity<i.ICastCrew>
    },
    reducers: {
        // MOVIE DETAIL
        getMovieDetail: (state, action) => {
            state.detail.data = initialMediaDetail;
            state.detail.fetching = true;
            state.detail.fetchFailed = false;
        },
        getMovieDetailSuccess: (state, action) => {
            state.detail.data = action.payload;
            state.detail.fetching = false;
            state.detail.fetchFailed = false;
        },
        getMovieDetailFail: (state, action) => {
            state.detail.data = initialMediaDetail;
            state.detail.fetching = false;
            state.detail.fetchFailed = true;
        }
        // CREDITS
        // getMovieCredits: (state, action) => {
        //     state.credits.data = initialCredits;
        //     state.credits.fetching = true;
        //     state.credits.fetchFailed = false;
        // },
        // getMovieCreditsSuccess: (state, action) => {
        //     state.credits.data = action.payload;
        //     state.credits.fetching = false;
        //     state.credits.fetchFailed = false;
        // },
        // getMovieCreditsFail: (state, action) => {
        //     state.credits.data = initialCredits;
        //     state.credits.fetching = false;
        //     state.credits.fetchFailed = true;
        // }
    }
});

const mediaSelector = (state: i.TState) => state.movie;

// selector
export const selectors = {
    movieDetailSelector: createSelector(mediaSelector, (state) => state.detail)
    // movieCreditsSelector: createSelector(mediaSelector, (state) => state.credits)
};

export const actions = { ...slice.actions };

export default slice.reducer;
