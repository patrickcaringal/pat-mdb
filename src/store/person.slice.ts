import { createSlice, createSelector } from '@reduxjs/toolkit';
import { IStateEntity, IPersonDetail, TState } from './interfaces';

const initialEntityState = { data: [], fetching: false, fetchFailed: false };

const slice = createSlice({
    name: 'person',
    initialState: {
        detail: { ...initialEntityState, data: {} } as IStateEntity<IPersonDetail>
    },
    reducers: {
        getPersonDetail: (state, action) => {
            state.detail.data = {} as IPersonDetail;
            state.detail.fetching = true;
            state.detail.fetchFailed = false;
        },
        getPersonDetailSuccess: (state, action) => {
            state.detail.data = action.payload;
            state.detail.fetching = false;
            state.detail.fetchFailed = false;
        },
        getPersonDetailFail: (state, action) => {
            state.detail.data = {} as IPersonDetail;
            state.detail.fetching = false;
            state.detail.fetchFailed = true;
        }
    }
});

const mediaSelector = (state: TState) => state.person;

// selector
export const selectors = {
    personDetailSelector: createSelector(mediaSelector, (state) => state.detail)
};

export const actions = { ...slice.actions };

export default slice.reducer;
