import { all, call, delay, put, takeLatest } from 'redux-saga/effects';
import { actions } from './media.slice';
import * as interfaces from './interfaces';
import http, { getQueryString } from '../utils/http';

function* getPopularMediasSaga(action) {
    const { media, onSuccess } = action.payload;
    try {
        const { data }: { data: interfaces.IMedia[] } = yield call(http.get, `${media}/trending`);
        yield delay(500);
        // onSuccess();
        yield put(actions.getPopularMediaListSuccess(data));
    } catch (error) {
        console.log(error);
        yield put(actions.getPopularMediaListFail('Error'));
    }
}

export default function* rootSaga() {
    yield all([yield takeLatest(actions.getPopularMediaList.type, getPopularMediasSaga)]);
}
