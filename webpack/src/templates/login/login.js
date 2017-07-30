import { inject } from 'aurelia-framework';

import { AuthorizeStep as AuthorizeStep } from 'features/authorize-step/authorize-step';
import { Template } from 'features/views/template';
/**
 *
 */
@inject(AuthorizeStep)
export class TemplateLogin extends Template {
    /**
     * @see View:defaultSettings
     * @type {Object}
     */
    defaultSettings = {
        template: '',       // path to a different template for the View

        style: '',          // classes for page (each class will be added to body element having page- prefix)
        styles: {},         // set of classes that can be used throughout different sections of the template

        content: {},        // translation keys for different text/html components in the template

        service: {},        // possible service settings for templates
        services: {},       // possible services settings for templates

        pageTitle: {
            content: {
                title: 'Login'
            }
        }
    };
    /**
     * @see View::overrideSettingsKey
     */
    overrideSettingsKey = 'templates.login';
    /**
     * Constructor
     * @see Base::constructor() for the rest of the arguments
     * @param {AuthorizeStep} authStep Authorization step
     */
    constructor(authStep, ...args) {
        super(...args);
        this.authStep = authStep;

        this.user = 'bogdan.arvinte@eestec.ro';
        this.pass = 'logmein';
    }
}
