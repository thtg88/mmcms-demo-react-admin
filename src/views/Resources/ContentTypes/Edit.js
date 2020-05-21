import React from 'react';
import EditResource, { withEditResource } from '../../../components/Resources/EditResource';
import PivotTabContent from '../../../components/Resources/EditResource/PivotTabContent';
import contentMigrationMethodsReducers from '../../../redux/contentMigrationMethods/reducers';
import contentMigrationMethodsSagas from '../../../redux/contentMigrationMethods/sagas';
import {
    reducerName as contentMigrationMethodsReducerName
} from '../../../redux/contentMigrationMethods/schema';
import {
    createResource as createContentTypeContentValidationRule,
    destroyResource as destroyContentTypeContentValidationRule,
    setResource as setContentTypeContentValidationRule,
} from '../../../redux/contentTypeContentValidationRules/actions';
import contentTypeContentValidationRulesReducers from '../../../redux/contentTypeContentValidationRules/reducers';
import contentTypeContentValidationRulesSagas from '../../../redux/contentTypeContentValidationRules/sagas';
import {
    attributesSequenceToShow as contentTypeContentValidationRulesAttributesSequenceToShow,
    nameField as contentTypeContentValidationRulesNameField,
    reducerName as contentTypeContentValidationRulesReducerName,
    resourceBaseRoute as contentTypeContentValidationRulesResourceBaseRoute,
    resourceDisplayName as contentTypeContentValidationRulesResourceDisplayName,
    schema as contentTypeContentValidationRulesSchema,
} from '../../../redux/contentTypeContentValidationRules/schema';
import {
    clearMetadataResourceEdit,
    destroyResource,
    findResource,
    getPaginatedResources,
    recoverResource,
    setRelationshipItem,
    unsetRelationshipItem,
    updateResource,
} from '../../../redux/contentTypes/actions';
import reducers from '../../../redux/contentTypes/reducers';
import sagas from '../../../redux/contentTypes/sagas';
import {
    attributesSequenceToShow,
    canDestroy,
    canRestore,
    nameField,
    pageSize,
    reducerName,
    resourceBaseRoute,
    resourceDisplayName,
    schema,
} from '../../../redux/contentTypes/schema';
import {
    reducerName as contentValidationRulesReducerName,
    resourceBaseRoute as contentValidationRuleBaseRoute
} from '../../../redux/contentValidationRules/schema';
import contentValidationRulesReducers from '../../../redux/contentValidationRules/reducers';
import contentValidationRulesSagas from '../../../redux/contentValidationRules/sagas';

const additionalSagas = {
    [contentMigrationMethodsReducerName]: contentMigrationMethodsSagas,
    [contentTypeContentValidationRulesReducerName]: contentTypeContentValidationRulesSagas,
    [contentValidationRulesReducerName]: contentValidationRulesSagas,
};

const additionalReducers = {
    [contentMigrationMethodsReducerName]: contentMigrationMethodsReducers,
    [contentTypeContentValidationRulesReducerName]: contentTypeContentValidationRulesReducers,
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
                    childAttributesSequenceToShow={contentTypeContentValidationRulesAttributesSequenceToShow}
                    childNameField={contentTypeContentValidationRulesNameField}
                    childResourceBaseRoute={contentTypeContentValidationRulesResourceBaseRoute}
                    childSchema={contentTypeContentValidationRulesSchema}
                    createChildResource={createContentTypeContentValidationRule}
                    destinationBaseRoute={contentValidationRuleBaseRoute}
                    destinationRelationshipName="validation_rule"
                    destroyResource={destroyContentTypeContentValidationRule}
                    parentResource={resource}
                    reducerName={contentTypeContentValidationRulesReducerName}
                    relationshipName="content_type_content_validation_rules"
                    relationshipParentIdColumn="content_type_id"
                    resourceDisplayName={contentTypeContentValidationRulesResourceDisplayName}
                    setRelationshipItem={setRelationshipItem}
                    setResource={setContentTypeContentValidationRule}
                    unsetRelationshipItem={unsetRelationshipItem}
                />
            ),
        });
    }

    return (
        <EditResource
            {...props}
            actions={actions}
            canDestroy={canDestroy}
            gettingResource={gettingResource}
            isRecovering={isRecovering}
            resource={resource}
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
    resourceBaseRoute,
    resourceDisplayName,
    sagas,
    schema,
    updateResource,
})(Edit);
