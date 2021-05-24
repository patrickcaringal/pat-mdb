import { combineReducers } from '@reduxjs/toolkit';
import mediaReducer from './media.slice';
import movieReducer from './movie.slice';
import personReducer from './person.slice';
import tvShowReducer from './tvShow.slice';

export default combineReducers({
    media: mediaReducer,
    movie: movieReducer,
    person: personReducer,
    tvShow: tvShowReducer
});
