import {
    all,
    call,
    fork,
    put,
    takeEvery,
} from 'redux-saga/effects';
import actions from './actions';
import {
    createResource,
    destroyResource,
    findResource,
    generateVariants,
    getAllResources,
    getPaginatedResources,
    getClubOrderLines,
    publishResource,
    recoverResource,
    searchResources,
    unpublishResource,
    updateResource,
} from './helper';
import {
    createResourceRequestBase,
    destroyResourceRequestBase,
    findResourceRequestBase,
    generateVariantsResourceRequestBase,
    getAllResourcesRequestBase,
    getPaginatedResourcesRequestBase,
    publishResourceRequestBase,
    recoverResourceRequestBase,
    searchResourcesRequestBase,
    unpublishResourceRequestBase,
    updateResourceRequestBase,
} from '../base/sagas';

export const createResourceRequest = createResourceRequestBase(actions, createResource);

export const destroyResourceRequest = destroyResourceRequestBase(actions, destroyResource);

export const findResourceRequest = findResourceRequestBase(actions, findResource);

export const generateVariantsResourceRequest = generateVariantsResourceRequestBase(actions, generateVariants);

export const getAllResourcesRequest = getAllResourcesRequestBase(actions, getAllResources);

export const getPaginatedResourcesRequest = getPaginatedResourcesRequestBase(actions, getPaginatedResources);

function* getClubOrderLinesRequest() {
    yield takeEvery(actions.GET_CLUB_ORDER_LINES_REQUEST, function*({ payload }) {
        const { data } = payload;

        try {
            const result = yield call(getClubOrderLines, data);

            if (result.resources) {
                yield put({
                    type: actions.GET_CLUB_ORDER_LINES_SUCCESS,
                    payload: result
                });
            } else {
                yield put({
                    type: actions.GET_CLUB_ORDER_LINES_ERROR,
                    error: result.error || result.errors || result
                });
            }
        } catch(err) {
            yield put({
                type: actions.GET_CLUB_ORDER_LINES_ERROR,
                error: 'Internal server error'
            });
        }
    });
};

export const publishResourceRequest = publishResourceRequestBase(actions, publishResource);

export const recoverResourceRequest = recoverResourceRequestBase(actions, recoverResource);

export const searchResourcesRequest = searchResourcesRequestBase(actions, searchResources);

export const unpublishResourceRequest = unpublishResourceRequestBase(actions, unpublishResource);

export const updateResourceRequest = updateResourceRequestBase(actions, updateResource);

export default function* rootSaga() {
    yield all([
        fork(createResourceRequest),
        fork(destroyResourceRequest),
        fork(findResourceRequest),
        fork(generateVariantsResourceRequest),
        fork(getAllResourcesRequest),
        fork(getPaginatedResourcesRequest),
        fork(getClubOrderLinesRequest),
        fork(publishResourceRequest),
        fork(recoverResourceRequest),
        fork(searchResourcesRequest),
        fork(unpublishResourceRequest),
        fork(updateResourceRequest),
    ]);
}
