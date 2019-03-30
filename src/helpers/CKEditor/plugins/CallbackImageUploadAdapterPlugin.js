import CallbackImageUploadAdapter from '../adapters/CallbackImageUploadAdapter';

const CallbackImageUploadAdapterPlugin = (editor) => {
    editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
        // We configure the callback to the upload script in your back-end here
        return new CallbackImageUploadAdapter(
            loader,
            editor.config._config.callbackImageUploadAdapterPlugin.onUploadRequest
        );
    };
}

export default CallbackImageUploadAdapterPlugin;
