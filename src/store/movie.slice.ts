import { createSlice, createSelector } from '@reduxjs/toolkit';
import * as interfaces from './interfaces';

const initialEntityState = { data: [], fetching: false, fetchFailed: false };

const slice = createSlice({
    name: 'movie',
    initialState: {
        popularMediaList: { ...initialEntityState } as interfaces.IStateEntity<interfaces.IMedia[]>
    },
    reducers: {
        getPopularMediaList: (state, action) => {
            state.popularMediaList.data = [] as interfaces.IMedia[];
            state.popularMediaList.fetching = true;
            state.popularMediaList.fetchFailed = false;
        },
        getPopularMediaListSuccess: (state, action) => {
            state.popularMediaList.data = action.payload;
            state.popularMediaList.fetching = false;
            state.popularMediaList.fetchFailed = false;
        },
        getPopularMediaListFail: (state, action) => {
            state.popularMediaList.data = [] as interfaces.IMedia[];
            state.popularMediaList.fetching = false;
            state.popularMediaList.fetchFailed = true;
        }
    }
});

const mediaSelector = (state: interfaces.TState) => state.media;

// selector
export const popularMediaListSelector = createSelector(
    mediaSelector,
    (state) => state.popularMediaList
);

export const selectors = {
    popularMediaListSelector: createSelector(mediaSelector, (state) => state.popularMediaList)
};

export const actions = { ...slice.actions };

export default slice.reducer;
