import { combineReducers } from '@reduxjs/toolkit';
import mediaReducer from './media.slice';
import movieReducer from './movie.slice';

export default combineReducers({
    media: mediaReducer,
    movie: movieReducer
});
