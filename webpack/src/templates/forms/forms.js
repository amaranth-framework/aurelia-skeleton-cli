/**
 * For full aurelia-validation documentation, please read: 
 * http://aurelia.io/hub.html#/doc/article/aurelia/validation/latest/validation-basics/2
 */
import { inject, NewInstance } from 'aurelia-framework';
import { validateTrigger, ValidationController, ValidationRules } from 'aurelia-validation';

import { Template } from 'features/views/template';

@inject(NewInstance.of(ValidationController))
export class TemplateForms extends Template {
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
                title: 'Forms'
            }
        }
    }
    /**
     * @see ModelView::overrideSettingsKey
     */
    overrideSettingsKey = 'templates.forms';
    /**
     * Used for input samples.
     * @type Number
     */
    index = 1;
    /**
     * @see Base::constructor()
     * @see View::constructor()
     * @param {any} validationController 
     */
    constructor(validationController, ...args) {
        super(...args);
        /**
         * @type ValidationController
         */
        this.vc = validationController;
        this.vc.validateTrigger = validateTrigger.blur;

        this.form = {};
    }
    /**
     * 
     */
    attached() {
        ValidationRules
            .ensure('input').displayName('Text Input')
                .required()
            .ensure('email').displayName('Email Input')
                .email().withMessage(`\${$displayName} must be an email.`)
                .required()
            .on(this.form);
    }
    /**
     * 
     */
    async submitSimpleForm() {
        let result = await this.vc.validate();
        if (result.valid) {
            alert('Form is valid!');
        } else {
            this.logger.warn('Not validating!', this.vc.errors);
        }
    }
}
