import { createSlice, createSelector } from '@reduxjs/toolkit';
import { IStateEntity, IMediaDetail, TState } from './interfaces';

const initialEntityState = { data: [], fetching: false, fetchFailed: false };

const slice = createSlice({
    name: 'tvshow',
    initialState: {
        detail: { ...initialEntityState, data: {} } as IStateEntity<IMediaDetail>
    },
    reducers: {
        getTVShowDetail: (state, action) => {
            state.detail.data = {} as IMediaDetail;
            state.detail.fetching = true;
            state.detail.fetchFailed = false;
        },
        getTVShowDetailSuccess: (state, action) => {
            state.detail.data = action.payload;
            state.detail.fetching = false;
            state.detail.fetchFailed = false;
        },
        getTVShowDetailFail: (state, action) => {
            state.detail.data = {} as IMediaDetail;
            state.detail.fetching = false;
            state.detail.fetchFailed = true;
        }
    }
});

const mediaSelector = (state: TState) => state.tvShow;

// selector
export const selectors = {
    tvShowDetailSelector: createSelector(mediaSelector, (state) => state.detail)
};

export const actions = { ...slice.actions };

export default slice.reducer;