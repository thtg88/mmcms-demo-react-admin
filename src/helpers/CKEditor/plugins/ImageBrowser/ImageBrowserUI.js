import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';

/**
 * This plugin initializes the button that is going to appear on CKEditor's toolbar.
 * This requires a simple init method, to add the button with its description,
 * and associate its "execute" event (like "onClick" basically) to trigger the ImageBrowser command,
 * which is the view where all the images stored are shown.
 */
class ImageBrowserUI extends Plugin {
    static get pluginName() {
        return 'ImageBrowserUI';
    }

    init() {
        const editor = this.editor;

        editor.ui.componentFactory.add('imageBrowser', locale => {
            // Get the ImageBrowser command from the editor
            // const command = editor.commands.get('ImageBrowser');
            // Create a new button
            const button = new ButtonView(locale);

            // Set button attributes
            button.set({
                label: 'Browse images',
                // CKEditor requires an SVG but importing at the top seems
                // to simply import the path with Create React App ^2.1.8
                // So we literally put it in as a string.
                // This comes from https://github.com/ckeditor/ckeditor5-ckfinder/blob/master/theme/icons/browse-files.svg
                icon: '<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M11.627 16.5a3.496 3.496 0 0 1 0 0zm5.873-.196a3.484 3.484 0 0 1 0 0zm0-7.001V8h-13v8.5h4.341c.191.54.457 1.044.785 1.5H2a1.5 1.5 0 0 1-1.5-1.5v-13A1.5 1.5 0 0 1 2 2h4.5a1.5 1.5 0 0 1 1.06.44L9.122 4H16a1.5 1.5 0 0 1 1.5 1.5v1A1.5 1.5 0 0 1 19 8v2.531a6.027 6.027 0 0 0-1.5-1.228zM16 6.5v-1H8.5l-2-2H2v13h1V8a1.5 1.5 0 0 1 1.5-1.5H16z"/><path d="M14.5 19.5a5 5 0 1 1 0-10 5 5 0 0 1 0 10zM15 14v-2h-1v2h-2v1h2v2h1v-2h2v-1h-2z"/></svg>',
                tooltip: true,
            });

            // Bind on execute event
            button.on('execute', () => {
                editor.execute('ImageBrowser');
                editor.editing.view.focus();
            });

            return button;
        });
    }
}

export default ImageBrowserUI;
