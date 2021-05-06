import { combineReducers } from '@reduxjs/toolkit';
import mediasReducer from './media.slice';

export default combineReducers({
    media: mediasReducer
});
