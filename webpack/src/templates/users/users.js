import { Template } from 'features/views/template';


export class TemplateUsers extends Template {
    /**
     * @see View:defaultSettings
     * @type {Object}
     */
    modelDefaultSettings = {
        template: '',       // path to a different template for the View

        style: '',          // classes for page (each class will be added to body element having page- prefix)
        styles: {},         // set of classes that can be used throughout different sections of the template

        content: {},        // translation keys for different text/html components in the template

        service: {},        // possible service settings for templates
        services: {},       // possible services settings for templates

        pageTitle: {
            content: {
                title: 'Users'
            }
        },

        users: {
            
        }
    }
    /**
     * @see ModelView::overrideSettingsKey
     */
    overrideSettingsKey = 'templates.users';
}
