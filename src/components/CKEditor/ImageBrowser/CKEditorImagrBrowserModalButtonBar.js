import React from 'react';
import { Button } from 'reactstrap';

const CKEditorImagrBrowserModalButtonBar = ({
    closeImageBrowser,
    isEditing,
    isSaving,
    onChoose,
    onSave,
    saveButtonIconClassName,
    saveButtonText,
    selectedImage,
    setIsEditing,
}) => {
    return (
        <>
            {
                selectedImage !== null
                    ? (
                        isEditing === true
                            ? (
                                <>
                                    <Button
                                        type="button"
                                        onClick={() => setIsEditing(false)}
                                    >
                                        <i className="fa fa-fw fa-chevron-left"></i>
                                        {' '}
                                        Back
                                    </Button>
                                    <Button
                                        type="button"
                                        disabled={isSaving}
                                        onClick={onSave}
                                    >
                                        <i className={saveButtonIconClassName}></i>
                                        {' '}
                                        {saveButtonText}
                                    </Button>
                                </>
                            )
                            : (
                                <>
                                    <Button
                                        type="button"
                                        onClick={() => setIsEditing(true)}
                                    >
                                        <i className="fa fa-fw fa-pencil"></i>
                                        {' '}
                                        Edit
                                    </Button>
                                    <Button
                                        type="button"
                                        onClick={onChoose}
                                    >
                                        <i className="fa fa-fw fa-check"></i>
                                        {' '}
                                        Choose
                                    </Button>
                                </>
                            )
                    )
                    : null
            }
            <Button
                type="button"
                color="secondary"
                onClick={closeImageBrowser}
            >
                <i className="fa fa-fw fa-times"></i>
                {' '}
                Cancel
            </Button>
        </>
    );
};

export default CKEditorImagrBrowserModalButtonBar;
