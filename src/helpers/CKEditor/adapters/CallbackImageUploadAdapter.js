/**
 * This class has been implemented simply to fire a callback when the upload is initiated,
 * this is so the control is left to the Redux implementation in the related HOC.
 * If you wish to have a deeper understanding of upload adapters,
 *
 * @see https://ckeditor.com/docs/ckeditor5/latest/framework/guides/deep-dive/upload-adapter.html
 */
class CallbackImageUploadAdapter {
    constructor(loader, onUploadRequest) {
        // The file loader instance to use during the upload.
        this.loader = loader;

        this._onUploadRequest = onUploadRequest;
    }

    // Starts the upload process.
    upload() {
        return this.loader.file
            .then(file => new Promise((resolve, reject) => {
                this._sendRequest(file, resolve, reject);
            }));
    }

    // Aborts the upload process.
    abort() {
        // Abort is not supported for this uploader
    }

    // Prepares the data and sends the request.
    _sendRequest(file, resolve, reject) {
        if(this._onUploadRequest && typeof this._onUploadRequest === 'function') {
            // This fires the onUploadRequest,
            // which will deal with firing the actual HTTP request
            this._onUploadRequest(file, resolve, reject);
        }
    }
}

export default CallbackImageUploadAdapter;
