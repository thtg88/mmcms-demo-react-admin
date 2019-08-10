import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import ImageBrowserCommand from './ImageBrowserCommand';

/**
 * This plugin is solely responsible for adding the ImageBrowserCommand to CKEditor.
 *
 * @TODO could this be moved into another plugin for simplicity?
 */
class ImageBrowserEditing extends Plugin {
    static get pluginName() {
        return 'ImageBrowserEditing';
    }

    init() {
        const editor = this.editor;

        // Add plugin to editor
        editor.commands.add('ImageBrowser', new ImageBrowserCommand(editor));
    }
}

export default ImageBrowserEditing;
