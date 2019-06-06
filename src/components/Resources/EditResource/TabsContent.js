import React from 'react';
import PropTypes from 'prop-types';
import { TabContent, TabPane } from 'reactstrap';
import GenerateVariantsTabPaneContent from './GenerateVariantsTabPaneContent';
import SeoTabContent from './SeoTabContent';
import ResourceForm from '../ResourceForm';
import FormImageCategoryDropzones from '../../FormImageCategoryDropzones';
import SpinnerLoader from '../../SpinnerLoader';

const TabsContent = ({
    activeTab,
    dispatchedValuesSearchers,
    formSchema,
    gettingResource,
    handleCKEditorImageFileUpload,
    handleUpdateResource,
    isRecovering,
    resource,
    resourceDisplayName,
    resourceTableName,
    resourceUnchanged,
    tabs,
    updateInputValue,
    updatingResource,
}) => {
    const updateButtonIconClassName = updatingResource === true
        ? 'fa fa-fw fa-spinner fa-spin'
        : 'fa fa-fw fa-save';

    return (
        <TabContent activeTab={activeTab} className="mb-4">
            <TabPane tabId="details">
                {
                    gettingResource
                        ? <SpinnerLoader />
                        : (
                            <ResourceForm
                                dispatchedValuesSearchers={dispatchedValuesSearchers}
                                formSchema={formSchema}
                                isRecovering={isRecovering}
                                onCKEditorImageUpload={handleCKEditorImageFileUpload}
                                onInputChange={updateInputValue}
                                onSubmit={handleUpdateResource}
                                submitButtonClassName="warning"
                                submitButtonDisabled={isRecovering || resourceUnchanged || updatingResource}
                                submitButtonIconClassName={updateButtonIconClassName}
                                submitButtonText="Update"
                            />
                        )
                }
            </TabPane>
            {
                !isRecovering && tabs && tabs.length
                    ? (
                        tabs.map((tab, idx) => {
                            const key = `tabPane_${tab.name}_${idx}`;

                            if(tab.content || tab.content === null) {
                                return (
                                    <TabPane key={key} tabId={tab.name}>
                                        {
                                            activeTab === tab.name || tab.dontUnmountTabContent
                                                ? tab.content
                                                : null
                                        }
                                    </TabPane>
                                );
                            }

                            // If no tab content is provided, we can try and get the default one

                            if(tab.name === 'add-variants') {
                                return (
                                    <TabPane key={key} tabId={tab.name}>
                                        {
                                            activeTab === tab.name
                                                ? <GenerateVariantsTabPaneContent parentResource={resource} />
                                                : null
                                        }
                                    </TabPane>
                                );
                            }

                            if(tab.name === 'images') {
                                return (
                                    <TabPane key={key} tabId={tab.name}>
                                        {
                                            activeTab === tab.name
                                                ? (
                                                    <FormImageCategoryDropzones
                                                        parentResource={resource}
                                                        parentResourceTableName={resourceTableName}
                                                    />
                                                )
                                                : null
                                        }
                                    </TabPane>
                                );
                            }

                            if(tab.name === 'seo') {
                                return (
                                    <TabPane key={key} tabId={tab.name}>
                                        {
                                            activeTab === tab.name
                                                ? (
                                                    <SeoTabContent
                                                        parentResource={resource}
                                                        parentResourceDisplayName={resourceDisplayName}
                                                        parentResourceTableName={resourceTableName}
                                                    />
                                                )
                                                : null
                                        }
                                    </TabPane>
                                );
                            }

                            return (
                                <TabPane key={key} tabId={tab.name}>
                                    <p>No content available for this tab yet, please try again later.</p>
                                </TabPane>
                            );
                        })
                    )
                    : null
            }
        </TabContent>
    );
};

TabsContent.propTypes = {
    activeTab: PropTypes.string,
    formSchema: PropTypes.object,
    gettingResource: PropTypes.bool,
    handleCKEditorImageFileUpload: PropTypes.func,
    handleUpdateResource: PropTypes.func,
    isRecovering: PropTypes.bool,
    resource: PropTypes.object,
    resourceDisplayName: PropTypes.string,
    resourceUnchanged: PropTypes.bool,
    tabs: PropTypes.arrayOf(
        PropTypes.shape({
            dontUnmountTabContent: PropTypes.bool,
            name: PropTypes.string.isRequired,
        })
    ),
    updateButtonIconClassName: PropTypes.string,
    updateInputValue: PropTypes.func,
    updatingResource: PropTypes.bool,
};

export default TabsContent;
