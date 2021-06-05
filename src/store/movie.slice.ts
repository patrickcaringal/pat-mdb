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

const slice = createSlice({
    name: 'movie',
    initialState: {
        detail: { ...initialEntityState, data: initialMediaDetail } as i.IStateEntity<
            i.IMediaDetail
        >
    },
    reducers: {
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
    }
});

const mediaSelector = (state: i.TState) => state.movie;

// selector
export const selectors = {
    movieDetailSelector: createSelector(mediaSelector, (state) => state.detail)
};

export const actions = { ...slice.actions };

export default slice.reducer;
