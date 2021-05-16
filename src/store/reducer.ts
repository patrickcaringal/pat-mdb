import { combineReducers } from '@reduxjs/toolkit';
import mediaReducer from './media.slice';
import movieReducer from './movie.slice';
import tvShowReducer from './tvShow.slice';

export default combineReducers({
    media: mediaReducer,
    movie: movieReducer,
    tvShow: tvShowReducer
});
