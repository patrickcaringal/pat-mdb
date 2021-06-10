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

const initialCredits = {
    cast: [],
    crew: []
} as i.ICastCrew;

const slice = createSlice({
    name: 'media',
    initialState: {
        popularMediaList: { ...initialEntityState } as i.IStateEntity<i.IMedia[]>,
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
    mediaCreditsSelector: createSelector(mediaSelector, (state) => state.credits)
};

export const actions = { ...slice.actions };

export default slice.reducer;
