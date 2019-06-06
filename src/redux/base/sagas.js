import { takeEvery, put, call } from 'redux-saga/effects';

export const createResourceRequestBase = (actions, createResource) => function* () {
    yield takeEvery(actions.CREATE_RESOURCE_REQUEST, function*({ payload }) {
        const { data } = payload;

        try {
            const result = yield call(createResource, data);

            if (result.resource) {
                yield put({
                    type: actions.CREATE_RESOURCE_SUCCESS,
                    payload: result
                });
            } else {
                yield put({
                    type: actions.CREATE_RESOURCE_ERROR,
                    error: result.error || result.errors || result
                });
            }
        } catch(err) {
            yield put({
                type: actions.CREATE_RESOURCE_ERROR,
                error: 'Internal server error'
            });
        }
    });
};

export const destroyResourceRequestBase = (actions, destroyResource) => function* () {
   yield takeEvery(actions.DESTROY_RESOURCE_REQUEST, function*({ payload }) {
       const { data } = payload;

       try {
           const result = yield call(destroyResource, data);

           if (result.resource) {
               yield put({
                   type: actions.DESTROY_RESOURCE_SUCCESS,
                   payload: result
               });
           } else {
               yield put({
                   type: actions.DESTROY_RESOURCE_ERROR,
                   error: result.error || result.errors || result
               });
           }
       } catch(err) {
           yield put({
               type: actions.DESTROY_RESOURCE_ERROR,
               error: 'Internal server error'
           });
       }
   });
};

export const findResourceRequestBase = (actions, findResource) => function* () {
    yield takeEvery(actions.FIND_RESOURCE_REQUEST, function*({ payload }) {
        const { data } = payload;

        try {
            const result = yield call(findResource, data);

            if (result.resource) {
                yield put({
                    type: actions.FIND_RESOURCE_SUCCESS,
                    payload: result
                });
            } else {
                yield put({
                    type: actions.FIND_RESOURCE_ERROR,
                    error: result.error || result.errors || result
                });
            }
        } catch(err) {
            yield put({
                type: actions.FIND_RESOURCE_ERROR,
                error: 'Internal server error'
            });
        }
    });
};

export const generateVariantsResourceRequestBase = (actions, generateVariants) => function* () {
    yield takeEvery(actions.GENERATE_VARIANTS_RESOURCE_REQUEST, function*({ payload }) {
        const { data } = payload;

        try {
            const result = yield call(generateVariants, data);

            if (result.resources) {
                if(result.resources.length) {
                    yield put({
                        type: actions.GENERATE_VARIANTS_RESOURCE_SUCCESS,
                        payload: result,
                    });
                } else {
                    yield put({
                        type: actions.GENERATE_VARIANTS_RESOURCE_WARNING,
                        warning: 'No variants generated.',
                    });
                }
            } else {
                yield put({
                    type: actions.GENERATE_VARIANTS_RESOURCE_ERROR,
                    error: result.error || result.errors || result,
                });
            }
        } catch(err) {
            console.log(err);
            yield put({
                type: actions.GENERATE_VARIANTS_RESOURCE_ERROR,
                error: 'Internal server error',
            });
        }
    });
};

export const getAllResourcesRequestBase = (actions, getAllResources) => function* () {
    yield takeEvery(actions.GET_ALL_RESOURCES_REQUEST, function*({ payload }) {
        const { data } = payload;

        try {
            const result = yield call(getAllResources, data);

            if (result.resources) {
                yield put({
                    type: actions.GET_ALL_RESOURCES_SUCCESS,
                    payload: result
                });
            } else {
                yield put({
                    type: actions.GET_ALL_RESOURCES_ERROR,
                    error: result.error || result.errors || result
                });
            }
        } catch(err) {
            yield put({
                type: actions.GET_ALL_RESOURCES_ERROR,
                error: 'Internal server error'
            });
        }
    });
};

export const getPaginatedResourcesRequestBase = (actions, getPaginatedResources) => function* () {
    yield takeEvery(actions.GET_PAGINATED_RESOURCES_REQUEST, function* ({ payload }) {
        const { data } = payload;

        try {
            const result = yield call(getPaginatedResources, data);

            if (result.data) {
                yield put({
                    type: actions.GET_PAGINATED_RESOURCES_SUCCESS,
                    payload: result
                });
            } else {
                yield put({
                    type: actions.GET_PAGINATED_RESOURCES_ERROR,
                    error: result.error || result.errors || result
                });
            }
        } catch(err) {
            yield put({
                type: actions.GET_PAGINATED_RESOURCES_ERROR,
                error: 'Internal server error'
            });
        }
    });
};

export const publishResourceRequestBase = (actions, publishResource) => function* () {
    yield takeEvery(actions.PUBLISH_RESOURCE_REQUEST, function*({ payload }) {
        const { data } = payload;

        try {
            const result = yield call(publishResource, data);

            if (result.resource) {
                yield put({
                    type: actions.PUBLISH_RESOURCE_SUCCESS,
                    payload: result
                });
            } else {
                yield put({
                    type: actions.PUBLISH_RESOURCE_ERROR,
                    error: result.error || result.errors || result
                });
            }
        } catch(err) {
            yield put({
                type: actions.PUBLISH_RESOURCE_ERROR,
                error: 'Internal server error'
            });
        }
    });
};

export const recoverResourceRequestBase = (actions, recoverResource) => function* () {
   yield takeEvery(actions.RECOVER_RESOURCE_REQUEST, function*({ payload }) {
       const { data } = payload;

       try {
           const result = yield call(recoverResource, data);

           if (result.resource) {
               yield put({
                   type: actions.RECOVER_RESOURCE_SUCCESS,
                   payload: result
               });
           } else {
               yield put({
                   type: actions.RECOVER_RESOURCE_ERROR,
                   error: result.error || result.errors || result
               });
           }
       } catch(err) {
           yield put({
               type: actions.RECOVER_RESOURCE_ERROR,
               error: 'Internal server error'
           });
       }
   });
};

export const regenerateResourceRequestBase = (actions, regenerateResource) => function* () {
   yield takeEvery(actions.REGENERATE_RESOURCE_REQUEST, function*({ payload }) {
       const { data } = payload;

       try {
           const result = yield call(regenerateResource, data);

           if (result.resource) {
               yield put({
                   type: actions.REGENERATE_RESOURCE_SUCCESS,
                   payload: result
               });
           } else {
               yield put({
                   type: actions.REGENERATE_RESOURCE_ERROR,
                   error: result.error || result.errors || result
               });
           }
       } catch(err) {
           yield put({
               type: actions.REGENERATE_RESOURCE_ERROR,
               error: 'Internal server error'
           });
       }
   });
};

export const regenerateThumbnailsRequestBase = (actions, regenerateThumbnails) => function* () {
   yield takeEvery(actions.REGENERATE_THUMBNAILS_REQUEST, function*({ payload }) {
       const { data } = payload;

       try {
           const result = yield call(regenerateThumbnails, data);

           if (result.resources) {
               yield put({
                   type: actions.REGENERATE_THUMBNAILS_SUCCESS,
                   payload: result
               });
           } else {
               yield put({
                   type: actions.REGENERATE_THUMBNAILS_ERROR,
                   error: result.error || result.errors || result
               });
           }
       } catch(err) {
           yield put({
               type: actions.REGENERATE_THUMBNAILS_ERROR,
               error: 'Internal server error'
           });
       }
   });
};

export const searchResourcesRequestBase = (actions, searchResources) => function* () {
    yield takeEvery(actions.SEARCH_RESOURCES_REQUEST, function*({ payload }) {
        const { data } = payload;

        try {
            const result = yield call(searchResources, data);

            if (result.resources) {
                yield put({
                    type: actions.SEARCH_RESOURCES_SUCCESS,
                    payload: result
                });
            } else {
                yield put({
                    type: actions.SEARCH_RESOURCES_ERROR,
                    error: result.error || result.errors || result
                });
            }
        } catch(err) {
            yield put({
                type: actions.SEARCH_RESOURCES_ERROR,
                error: 'Internal server error'
            });
        }
    });
};

export const setSequenceResourcesRequestBase = (actions, setSequenceResources) => function* () {
    yield takeEvery(actions.SET_SEQUENCE_RESOURCES_REQUEST, function*({ payload }) {
        const { data } = payload;

        try {
            const result = yield call(setSequenceResources, data);

            if (result.resources) {
                yield put({
                    type: actions.SET_SEQUENCE_RESOURCES_SUCCESS,
                    payload: result
                });
            } else {
                yield put({
                    type: actions.SET_SEQUENCE_RESOURCES_ERROR,
                    error: result.error || result.errors || result
                });
            }
        } catch(err) {
            yield put({
                type: actions.SET_SEQUENCE_RESOURCES_ERROR,
                error: 'Internal server error'
            });
        }
    });
};

export const unpublishResourceRequestBase = (actions, unpublishResource) => function* () {
    yield takeEvery(actions.UNPUBLISH_RESOURCE_REQUEST, function*({ payload }) {
        const { data } = payload;

        try {
            const result = yield call(unpublishResource, data);

            if (result.resource) {
                yield put({
                    type: actions.UNPUBLISH_RESOURCE_SUCCESS,
                    payload: result
                });
            } else {
                yield put({
                    type: actions.UNPUBLISH_RESOURCE_ERROR,
                    error: result.error || result.errors || result
                });
            }
        } catch(err) {
            yield put({
                type: actions.UNPUBLISH_RESOURCE_ERROR,
                error: 'Internal server error'
            });
        }
    });
};

export const updateAttributesResourceRequestBase = (actions, updateAttributesResource) => function* () {
    yield takeEvery(actions.UPDATE_ATTRIBUTES_RESOURCE_REQUEST, function*({ payload }) {
        const { data } = payload;

        try {
            const result = yield call(updateAttributesResource, data);

            if (result.resource) {
                yield put({
                    type: actions.UPDATE_ATTRIBUTES_RESOURCE_SUCCESS,
                    payload: result
                });
            } else {
                yield put({
                    type: actions.UPDATE_ATTRIBUTES_RESOURCE_ERROR,
                    error: result.error || result.errors || result
                });
            }
        } catch(err) {
            yield put({
                type: actions.UPDATE_ATTRIBUTES_RESOURCE_ERROR,
                error: 'Internal server error'
            });
        }
    });
};

export const updateResourceRequestBase = (actions, updateResource) => function* () {
    yield takeEvery(actions.UPDATE_RESOURCE_REQUEST, function*({ payload }) {
        const { data } = payload;

        try {
            const result = yield call(updateResource, data);

            if (result.resource) {
                yield put({
                    type: actions.UPDATE_RESOURCE_SUCCESS,
                    payload: result
                });
            } else {
                yield put({
                    type: actions.UPDATE_RESOURCE_ERROR,
                    error: result.error || result.errors || result
                });
            }
        } catch(err) {
            yield put({
                type: actions.UPDATE_RESOURCE_ERROR,
                error: 'Internal server error'
            });
        }
    });
};
