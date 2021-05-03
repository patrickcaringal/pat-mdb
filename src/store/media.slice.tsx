import { createSlice, createSelector, createAction } from '@reduxjs/toolkit';
import * as interfaces from './interfaces';

// const createActionTemplate = (action) => ({
//     request: action,
//     success: `${action}Success`,
//     error: `${action}Error`
// });

// const x = createActionTemplate('getPopularMediaList');
// console.log(x);

export const initialState: interfaces.TState = {
    popularMediaList: [] as interfaces.IMedia[],
    loaders: {}
};
const slice = createSlice({
    name: 'media',
    initialState,
    reducers: {
        getPopularMediaList: (state, action) => {
            state.popularMediaList = [] as interfaces.IMedia[];
            state.loaders.popularMediaList = true;
        },
        getPopularMediaListSuccess: (state, action) => {
            state.popularMediaList = action.payload;
            delete state.loaders.popularMediaList;
        },
        getPopularMediaListError: (state, action) => {
            state.popularMediaList = [] as interfaces.IMedia[];
            delete state.loaders.popularMediaList;
        }
    }
});

const mediaSelector = (state: interfaces.TState) => state;

// selector
export const popularMediaListSelector = createSelector(
    mediaSelector,
    (state: interfaces.TState) => state.popularMediaList
);

export const loaderSelector = (loadingEntity) =>
    createSelector(mediaSelector, (state: interfaces.TState) => state.loaders[loadingEntity]);

export const selectors = {
    popularMediaListSelector: createSelector(
        mediaSelector,
        (state: interfaces.TState) => state.popularMediaList
    ),
    loaderSelector: (loadingEntity) =>
        createSelector(mediaSelector, (state: interfaces.TState) => state.loaders[loadingEntity])
};

// exports
// export const {
//     getPopularMediaList,
//     getPopularMediaListSuccess,
//     getPopularMediaListError
// } = slice.actions;

export const actions = { ...slice.actions };
export default slice.reducer;
