import { ValidationRules } from 'aurelia-validation';

import messg from 'messg';
import 'messg/index.css';

import { Template } from 'features/views/template';

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
     * Form settings.
     * @type {Object}
     */
    inputs = {
        basic: [
            {
                label: 'Regular Input',
                type: 'text',
                name: 'text',
                helpblock: 'Simple helpblock for regular input'
            },
            {
                label: 'Password',
                type: 'password',
            },
            {
                label: 'Email',
                type: 'email',
                name: 'email'
            },
            // {
            //     label: 'File',
            //     type: 'file',
            // },
            {
                label: 'Textarea',
                type: 'textarea',
            },
            {
                label: 'Select',
                type: 'select',
                values: [
                    { label: 'First Selectable Item', value: 0 },
                    { label: 'Second Selectable Item', value: 1 },
                    { label: 'Third Selectable Item', value: 2 },
                    { label: 'Disabled Selectable Item', value: 3, disabled: true }
                ]
            },
            {
                label: 'Checkboxes',
                type: 'checkbox',
                values: [
                    { label: 'First Selectable Item', value: 5 },
                    { label: 'Second Selectable Item', value: 6 },
                    { label: 'Third Selectable Item', value: 7 },
                    { label: 'Disabled Selectable Item', value: 8, disabled: true }
                ]
            },
            {
                label: 'Radio Buttons',
                type: 'radio',
                values: [
                    { label: 'First Selectable Item', value: 9 },
                    { label: 'Second Selectable Item', value: 10 },
                    { label: 'Third Selectable Item', value: 11 },
                    { label: 'Disabled Selectable Item', value: 12, disabled: true }
                ]
            },
            {
                label: 'Checkboxes Inline',
                type: 'checkbox',
                style: 'form-group--inline',
                values: [
                    { label: 'First Selectable Item', value: 13 },
                    { label: 'Second Selectable Item', value: 14 },
                    { label: 'Third Selectable Item', value: 15 },
                    { label: 'Disabled Selectable Item', value: 16, disabled: true }
                ]
            },
            {
                label: 'Radio Buttons Inline',
                type: 'radio',
                style: 'form-group--inline',
                values: [
                    { label: 'First Selectable Item', value: 17 },
                    { label: 'Second Selectable Item', value: 18 },
                    { label: 'Third Selectable Item', value: 19 },
                    { label: 'Disabled Selectable Item', value: 20, disabled: true }
                ]
            },
        ]
    };
    /**
     * @see View::init()
     */
    init() {
        super.init();
        this.inputs.basic.forEach((input) => {
            if (/checkbox|radio|select/.test(input.type)) {
                input.value = input.values[1];
                if (input.type === 'checkbox') {
                    input.value = [input.value];
                }
            }
        });

        this.eventsAdd('form:default:init', (form) => {
            console.log(form, form.data);
            ValidationRules
                .ensure('text').displayName('Text Input')
                    .required()
                .ensure('email').displayName('Email Input')
                    .email().withMessage(`\${$displayName} must be an email.`)
                    .required()
                .on(form.data);
        });

        this.eventsAdd('form:default:validated', (data) => {
            messg.success('Form validated succesfully.');
        });

        this.eventsAdd('form:default:invalid', (data) => {
            messg.success('Form invalid.');
        });
    }
    // /**
    //  *
    //  */
    // async submitSimpleForm() {
    //     let result = await this.vc.validate();
    //     if (result.valid) {
    //         alert('Form is valid!');
    //     } else {
    //         this.logger.warn('Not validating!', this.vc.errors);
    //     }
    // }
}
