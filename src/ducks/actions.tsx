import * as types from './constants';

export const getMovies = (payload: any) => ({
    type: types.GET_MOVIES,
    payload
});
