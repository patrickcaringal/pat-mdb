import { createSlice, createSelector } from '@reduxjs/toolkit';
import { IStateEntity, IMediaDetail, TState } from './interfaces';

const initialEntityState = { data: [], fetching: false, fetchFailed: false };

const slice = createSlice({
    name: 'movie',
    initialState: {
        detail: { ...initialEntityState, data: {} } as IStateEntity<IMediaDetail>
    },
    reducers: {
        getMovieDetail: (state, action) => {
            state.detail.data = {} as IMediaDetail;
            state.detail.fetching = true;
            state.detail.fetchFailed = false;
        },
        getMovieDetailSuccess: (state, action) => {
            state.detail.data = action.payload;
            state.detail.fetching = false;
            state.detail.fetchFailed = false;
        },
        getMovieDetailFail: (state, action) => {
            state.detail.data = {} as IMediaDetail;
            state.detail.fetching = false;
            state.detail.fetchFailed = true;
        }
    }
});

const mediaSelector = (state: TState) => state.movie;

// selector
export const selectors = {
    movieDetailSelector: createSelector(mediaSelector, (state) => state.detail)
};

export const actions = { ...slice.actions };

export default slice.reducer;