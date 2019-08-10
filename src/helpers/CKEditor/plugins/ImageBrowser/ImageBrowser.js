import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import ImageBrowserUI from './ImageBrowserUI';
import ImageBrowserEditing from './ImageBrowserEditing';

/**
 * The ImageBrowser feature, a bridge between the CKEditor 5 WYSIWYG editor and the
 * ImageBrowser file manager and uploader.
 *
 * This is a "glue" plugin which enables:
 *
 * * ImageBrowserEditing,
 * * ImageBrowserUI.
 */
class ImageBrowser extends Plugin {
    static get pluginName() {
        return 'ImageBrowser';
    }

    static get requires() {
        return [
            ImageBrowserEditing,
            ImageBrowserUI,
        ];
    }
}

export default ImageBrowser;
