import Command from '@ckeditor/ckeditor5-core/src/command';

/**
 * This is where all magic happens.
 * This CKEditor Command defines the logic behind selecting files to upload to the server.
 * This is done by using custom callbacks, in order to achieve maximum customization
 * from the app point of view, making it not tied to a particular implementation,
 * e.g. XHR requests, or Redux, or fetch API.
 *
 * Please note: fetch is used in this case to simplify conversion from a base64 image
 * (coming from the evtData), to a File object. If your project requires to support
 * systems not compatible with fetch (e.g. old browsers), you may want to polyfill it,
 * to avoid errors after an image has been edited.
 *
 * @TODO can we remove on change event listeners?
 * @TODO can we remove the refresh method?
 */
class ImageBrowserCommand extends Command {
    /**
     * The constructor initializes all the event listeners for the commands,
     * which are going to get triggered from either outside of the scope of CKEditor,
     * e.g. other part of the application, or other CKEditor plugins.
     */
    constructor(editor) {
        super(editor);

        // Remove default document listener to lower its priority.
        this.stopListening(editor.model.document, 'change');

        // Lower this command listener priority to be sure that refresh() will be called after link & image refresh.
        this.listenTo(editor.model.document, 'change', () => this.refresh(), {priority: 'low'});

        // A file has been chosen, but the user does not desire
        // to modify the image before insertion
        this.on('file:choose', (evt, evtData) => {
            // We simply want to insert the image straight into content

            editor.execute('imageInsert', {source: `${evtData.baseUrl}${evtData.url}`});
        });

        // A file has been chosen, and the user has decided to modify the image,
        // e.g. crop, or rotate.
        // file:choose:resizeImage seems to fire event above
        // TODO file with CKEditor issue?
        this.on('file:resizeImage', (evt, evtData) => {
            // Get the plugin configuration
            const imageBrowserConfig = editor.config.get('imageBrowser');

            if(
                imageBrowserConfig
                && imageBrowserConfig.onUploadRequest
                && typeof imageBrowserConfig.onUploadRequest === 'function'
            ) {
                // If the onUploadRequest is a valid function
                // We process the file and fire the callback
                // Which is meant to upload the image to the server,
                // and call the resolve method (if successful),
                // or the reject one (if unsuccessful).
                // This is done in order to keep consistency
                // with a generic CKEditor file upload adapter
                // (see https://ckeditor.com/docs/ckeditor5/latest/framework/guides/deep-dive/upload-adapter.html#the-complete-implementation),
                // which requires an upload method to return a Promise,
                // which can then either resolve or reject.

                // Get the fileData (base64), from the event
                const fileData = evtData.data;

                // Deduct the MIME type by performing string operation on the data
                const mimeType = evtData.data.substring('data:'.length, evtData.data.indexOf(';base64'));

                // Get file extension from the MIME type
                const fileExtension = mimeType.substring(mimeType.indexOf('/') + 1);

                // We then proceeding fetching the data in order to convert it
                // to a File object, dirty quick hack, thanks to:
                // https://stackoverflow.com/a/30407840
                fetch(fileData)
                    .then(res => res.arrayBuffer())
                    .then(buf => new File([buf], `image.${fileExtension}`, {type: mimeType}))
                    .then(file => {
                        // Our resolve method executes the CKEditor own imageInsert command
                        // with the default source, again inline with what a generic file uploader should do:
                        // https://ckeditor.com/docs/ckeditor5/latest/framework/guides/deep-dive/upload-adapter.html#the-complete-implementation
                        const resolve = data => {
                            if(
                                imageBrowserConfig.onUploadResolve
                                && typeof imageBrowserConfig.onUploadResolve === 'function'
                            ) {
                                // In case the app needs to execute anything in particular,
                                // when the image upload has been resolved

                                // TODO should we pass data to it?
                                imageBrowserConfig.onUploadResolve();
                            }

                            editor.execute('imageInsert', {source: data.default});
                        };

                        const reject = () => {
                            if(
                                imageBrowserConfig.onUploadReject
                                && typeof imageBrowserConfig.onUploadReject === 'function'
                            ) {
                                // In case the app needs to execute anything in particular,
                                // when the image upload has been rejected

                                imageBrowserConfig.onUploadReject();
                            }

                            // TODO could we perhaps leave the implementation to onReject?
                            alert('Couldn\'t upload file.');
                        };

                        imageBrowserConfig.onUploadRequest(file, resolve, reject);
                    });
            }
        });
    }

    refresh() {
        const editor = this.editor;
        const imageCommand = editor.commands.get('imageUpload');
        const linkCommand = editor.commands.get('link');

        // The ImageBrowser command is enabled when one of image or link command is enabled.
        this.isEnabled = imageCommand
            && linkCommand
            && (
                imageCommand.isEnabled
                || linkCommand.isEnabled
            );
    }

    execute() {
        // Get imageBrowser plugin config
        const imageBrowserConfig = this.editor.config.get('imageBrowser');

        if(
            imageBrowserConfig
            && imageBrowserConfig.onExecute
            && typeof imageBrowserConfig.onExecute === 'function'
        ) {
            // If an onExecute callback has been provided,
            // We execute the callback, leaving the implementation to the application.
            imageBrowserConfig.onExecute();
        }
    }
}

export default ImageBrowserCommand;
