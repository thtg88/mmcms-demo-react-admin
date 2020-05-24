import React from 'react';
import EditResourceContainer, { withEditResource } from '../../../components/Resources/EditResource';
import PivotTabContent from '../../../components/Resources/EditResource/PivotTabContent';
import {
    createResource as createContentFieldContentValidationRule,
    destroyResource as destroyContentFieldContentValidationRule,
    setResource as setContentFieldContentValidationRule,
} from '../../../redux/contentFieldContentValidationRules/actions';
import contentFieldContentValidationRulesReducers from '../../../redux/contentFieldContentValidationRules/reducers';
import contentFieldContentValidationRulesSagas from '../../../redux/contentFieldContentValidationRules/sagas';
import {
    attributesSequenceToShow as contentFieldContentValidationRulesAttributesSequenceToShow,
    nameField as contentFieldContentValidationRulesNameField,
    reducerName as contentFieldContentValidationRulesReducerName,
    resourceBaseRoute as contentFieldContentValidationRulesResourceBaseRoute,
    resourceDisplayName as contentFieldContentValidationRulesResourceDisplayName,
    schema as contentFieldContentValidationRulesSchema,
} from '../../../redux/contentFieldContentValidationRules/schema';
import {
    clearMetadataResourceEdit,
    destroyResource,
    findResource,
    getPaginatedResources,
    recoverResource,
    setRelationshipItem,
    unsetRelationshipItem,
    updateResource,
} from '../../../redux/contentFields/actions';
import reducers from '../../../redux/contentFields/reducers';
import sagas from '../../../redux/contentFields/sagas';
import {
    attributesSequenceToShow,
    canDestroy,
    canRestore,
    canUpdate,
    nameField,
    pageSize,
    reducerName,
    resourceBaseRoute,
    resourceDisplayName,
    schema,
} from '../../../redux/contentFields/schema';
import contentModelsReducers from '../../../redux/contentModels/reducers';
import contentModelsSagas from '../../../redux/contentModels/sagas';
import {
    reducerName as contentModelsReducerName,
    resourceBaseRoute as contentModelsResourceBaseRoute,
} from '../../../redux/contentModels/schema';
import contentTypesReducers from '../../../redux/contentTypes/reducers';
import contentTypesSagas from '../../../redux/contentTypes/sagas';
import {
    reducerName as contentTypesReducerName,
} from '../../../redux/contentTypes/schema';
import {
    reducerName as contentValidationRulesReducerName,
    resourceBaseRoute as contentValidationRuleBaseRoute
} from '../../../redux/contentValidationRules/schema';
import contentValidationRulesReducers from '../../../redux/contentValidationRules/reducers';
import contentValidationRulesSagas from '../../../redux/contentValidationRules/sagas';

const additionalSagas = {
    [contentTypesReducerName]: contentTypesSagas,
    [contentModelsReducerName]: contentModelsSagas,
    [contentFieldContentValidationRulesReducerName]: contentFieldContentValidationRulesSagas,
    [contentValidationRulesReducerName]: contentValidationRulesSagas,
};

const additionalReducers = {
    [contentTypesReducerName]: contentTypesReducers,
    [contentModelsReducerName]: contentModelsReducers,
    [contentFieldContentValidationRulesReducerName]: contentFieldContentValidationRulesReducers,
    [contentValidationRulesReducerName]: contentValidationRulesReducers,
};

export const Edit = ({
    gettingResource,
    isRecovering,
    resource,
    toggleDestroyResourceModal,
    toggleRecoverResourceModal,
    ...props
}) => {
    const actions = [];
    if(isRecovering === true && canRestore === true) {
        actions.push({
            className: 'btn-success',
            disabled: gettingResource,
            iconClassName: 'fa fa-fw fa-check',
            onClick: toggleRecoverResourceModal,
            title: 'Recover '+resourceDisplayName,
            type: 'button',
        });
    } else if(canDestroy === true) {
        actions.push({
            className: 'btn-danger',
            disabled: gettingResource,
            iconClassName: 'fa fa-trash',
            onClick: toggleDestroyResourceModal,
            title: 'Remove '+resourceDisplayName,
            type: 'button',
        });
    }

    const tabs = [];
    if(resource) {
        tabs.push({
            iconClassName: 'fa fa-fw fa-check',
            name: 'content-type-content-validation-rules',
            text: 'Validation Rules',
            content: (
                <PivotTabContent
                    childAttributesSequenceToShow={contentFieldContentValidationRulesAttributesSequenceToShow}
                    childNameField={contentFieldContentValidationRulesNameField}
                    childResourceBaseRoute={contentFieldContentValidationRulesResourceBaseRoute}
                    childSchema={contentFieldContentValidationRulesSchema}
                    createChildResource={createContentFieldContentValidationRule}
                    destinationBaseRoute={contentValidationRuleBaseRoute}
                    destinationRelationshipName="content_validation_rule"
                    destroyResource={destroyContentFieldContentValidationRule}
                    parentResource={resource}
                    reducerName={contentFieldContentValidationRulesReducerName}
                    relationshipName="content_field_content_validation_rules"
                    relationshipParentIdColumn="content_field_id"
                    resourceDisplayName={contentFieldContentValidationRulesResourceDisplayName}
                    setRelationshipItem={setRelationshipItem}
                    setResource={setContentFieldContentValidationRule}
                    unsetRelationshipItem={unsetRelationshipItem}
                />
            ),
        });
    }

    return (
        <EditResourceContainer
            {...props}
            actions={actions}
            canDestroy={canDestroy}
            canRestore={canRestore}
            canUpdate={canUpdate}
            gettingResource={gettingResource}
            isRecovering={isRecovering}
            resource={resource}
            resourceBaseRoute={resourceBaseRoute}
            resourceDisplayName={resourceDisplayName}
            resourceNameField={nameField}
            tabs={tabs}
            toggleDestroyResourceModal={toggleDestroyResourceModal}
            toggleRecoverResourceModal={toggleRecoverResourceModal}
        />
    );
};

export default withEditResource({
    additionalReducers,
    additionalSagas,
    attributesSequenceToShow,
    clearMetadataResourceEdit,
    destroyResource,
    findResource,
    getPaginatedResources,
    nameField,
    pageSize,
    recoverResource,
    reducerName,
    reducers,
    resourceDisplayName,
    sagas,
    schema,
    updateResource,
    resourceBaseRoute: `${contentModelsResourceBaseRoute}/:content_model_id/${resourceBaseRoute}`,
})(Edit);
