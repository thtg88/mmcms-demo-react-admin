import React, { useState } from 'react';
import PropTypes from 'prop-types';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import CKEditorImageBrowserModal from './ImageBrowser';
import { CallbackImageUploadAdapterPlugin, ImageBrowser } from '../../helpers/CKEditor';

const CKEditorFormInput = ({
    disabled,
    name,
    onChange,
    onImageUpload,
    value,
}) => {
    const [isImageBrowserOpen, setIsImageBrowserOpen] = useState(false);
    const [imageBrowserCommand, setImageBrowserCommand] = useState(null);
    const [ckEditorConfig, setCkEditorConfig] = useState(null);

    return (
        <>
            <CKEditor
                config={{
                    extraPlugins: [
                        CallbackImageUploadAdapterPlugin,
                        ImageBrowser,
                    ],
                    callbackImageUploadAdapterPlugin: {onUploadRequest: onImageUpload},
                    imageBrowser: {
                        onUploadRequest: onImageUpload,
                        // onUploadResolve gets defined at runtime by CKEditorImageBrowserModal
                        // onUploadResolve: () => {},
                        // onUploadReject: () => {},
                        onExecute: () => setIsImageBrowserOpen(true),
                    },
                    // Enable the imageBrowser button in the toolbar.
                    toolbar: [
                        'heading',
                        'bold',
                        'italic',
                        'link',
                        'bulletedList',
                        'numberedList',
                        'imageUpload',
                        'imageBrowser',
                        'blockQuote',
                        'insertTable',
                        'mediaEmbed',
                        'undo',
                        'redo',
                    ],
                }}
                data={value}
                disabled={disabled}
                editor={ClassicEditor}
                onInit={editor => {
                    setImageBrowserCommand(editor.commands.get('ImageBrowser'));
                    setCkEditorConfig(editor.config);
                }}
                onChange={(event, editor) => {
                    const target = {
                        name,
                        value: editor.getData(),
                    };
                    onChange({ target });
                }}
            />
            <CKEditorImageBrowserModal
                imageBrowserCommand={imageBrowserCommand}
                ckEditorConfig={ckEditorConfig}
                isImageBrowserOpen={isImageBrowserOpen}
                setIsImageBrowserOpen={setIsImageBrowserOpen}
            />
        </>
    );
};

CKEditorFormInput.propTypes = {
    disabled: PropTypes.bool,
    onImageUpload: PropTypes.func.isRequired,
    value: PropTypes.string,
};

export default CKEditorFormInput;
