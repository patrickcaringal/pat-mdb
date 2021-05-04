import { createSlice, createSelector, createAction } from '@reduxjs/toolkit';
import * as interfaces from './interfaces';

// const createActionTemplate = (action) => ({
//     request: action,
//     success: `${action}Success`,
//     error: `${action}Error`
// });

// const x = createActionTemplate('getPopularMediaList');
// console.log(x);

const initialEntityState = { data: [], fetching: false, fetchFailed: false };

export const initialState: interfaces.TState = {
    popularMediaList: { ...initialEntityState } as interfaces.IStateEntity<interfaces.IMedia[]>
};

const slice = createSlice({
    name: 'media',
    initialState,
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

const mediaSelector = (state: interfaces.TState) => state;

// selector
export const popularMediaListSelector = createSelector(
    mediaSelector,
    (state: interfaces.TState) => state.popularMediaList
);

// export const loaderSelector = (loadingEntity) =>
//     createSelector(mediaSelector, (state: interfaces.TState) => state.loaders[loadingEntity]);

export const selectors = {
    popularMediaListSelector: createSelector(
        mediaSelector,
        (state: interfaces.TState) => state.popularMediaList
    )
    // loaderSelector: (loadingEntity) =>
    //     createSelector(mediaSelector, (state: interfaces.TState) => state.loaders[loadingEntity])
};

// exports
// export const {
//     getPopularMediaList,
//     getPopularMediaListSuccess,
//     getPopularMediaListError
// } = slice.actions;

export const actions = { ...slice.actions };
export default slice.reducer;
