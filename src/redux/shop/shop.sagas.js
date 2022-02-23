import { takeLatest, call, put, all } from 'redux-saga/effects';

import { firestore, convertCollectionToMap } from '../../firebase/firebase.utils';

import { fetchCollectionsSuccess, fetchCollectionsFailure } from './shop.actions';

import ShopActionTypes from './shop.types';

export function* fetchCollectionsStartAsync() {
    yield console.log('Featch collections');

    try{
        const collectionRef = firestore.collection("collections");
        const snapshot = yield collectionRef.get();
        const collctionsMap = yield call(convertCollectionToMap, snapshot);
        
        // Dispatch object
        yield put(fetchCollectionsSuccess(collctionsMap));

    }catch(error){
        yield put(fetchCollectionsFailure(error.message));
    }


    // Code using Promise pattern
    // collectionRef
    //   .get()
    //   .then((snapshot) => {
    //     const collectionsMap = convertCollectionToMap(snapshot);
    //     dispatch(fetchCollectionsSuccess(collectionsMap));
    //   })
    //   .catch((error) => dispatch(fetchCollectionsFailure(error.message)));
}

export function* fetchCollectionsStart() {
    yield takeLatest(
        ShopActionTypes.FETCH_COLLECTIONS_START,
        fetchCollectionsStartAsync);
}

export function* shopSagas() {
    yield all([call(fetchCollectionsStart)]);
}