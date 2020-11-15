import * as types from './constants';

export const initialState: {
    movies: string[];
} = {
    movies: []
};

const reducer = (state = initialState, action: any) => {
    switch (action.type) {
        case types.GET_MOVIES: {
            return {
                ...state,
                movies: ['Lord']
            };
        }

        default:
            return state;
    }
};

export default reducer;
