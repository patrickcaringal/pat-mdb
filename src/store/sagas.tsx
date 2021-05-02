import { all, call, delay, takeLatest } from 'redux-saga/effects';
import { getPopularMediaList } from './media.slice';
import * as interfaces from './interfaces';
import http, { getQueryString } from '../utils/http';

function* getPopularMediasSaga(action) {
    const { media } = action.payload;
    try {
        const { data }: { data: interfaces.IMedia[] } = yield call(http.get, `${media}/popular`);
        yield delay(500);
        // yield put(actions.getPopularMediasSucceed(data));
    } catch (error) {
        console.log(error);
        // yield put(actions.getPopularMediasFailed('Error'));
    }
}

export default function* rootSaga() {
    yield all([yield takeLatest(getPopularMediaList.type, getPopularMediasSaga)]);
}
