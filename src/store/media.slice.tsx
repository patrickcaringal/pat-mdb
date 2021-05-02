import { createSlice, createSelector } from '@reduxjs/toolkit';
import * as interfaces from './interfaces';

export const initialState: interfaces.TState = {
    popularMediaList: [] as interfaces.IMedia[]
};
const slice = createSlice({
    name: 'media',
    initialState,
    reducers: {
        getPopularMediaList: (state, action) => {
            state.popularMediaList = [] as interfaces.IMedia[];
        }
    }
});

const mediaSelector = (state: interfaces.TState) => state;

// selector
export const popularMediaListSelector = createSelector(
    mediaSelector,
    (state: interfaces.TState) => state.popularMediaList
);

// exports
export const { getPopularMediaList } = slice.actions;
export default slice.reducer;
