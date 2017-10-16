import {validateTrigger, ValidationController, ValidationRules} from 'aurelia-validation';

import messg from 'messg';
import 'messg/index.css';

import {Template} from 'features/views/template';
import {extend} from 'features/utils';

export class TemplateForms extends Template {
    /**
     * @see ModelView::overrideSettingsKey
     */
    overrideSettingsKey = 'templates.forms';
    /**
     * Form settings.
     * @type {Object}
     */
    inputs =[
        {
            label: 'Regular Input',
            type: 'text',
            name: 'text',
            helpblock: 'Simple helpblock for regular input',
            style: 'col-md-6'
        },
        {
            label: 'Password',
            type: 'password',
            style: 'col-md-6'
        },
        {
            label: 'Email',
            type: 'email',
            name: 'email',
            style: 'col-md-6'
        },
        {
            label: 'Select',
            type: 'select',
            values: [
                { label: 'First Selectable Item', value: 0 },
                { label: 'Second Selectable Item', value: 1 },
                { label: 'Third Selectable Item', value: 2 },
                { label: 'Disabled Selectable Item', value: 3, disabled: true }
            ],
            style: 'col-md-6'
        },
        // {
        //     label: 'File',
        //     type: 'file',
        // },
        {
            label: 'Textarea',
            type: 'textarea',
            style: 'col-md-12'
        },
        {
            label: 'Checkboxes',
            type: 'checkbox',
            name: 'check1',
            values: [
                { label: 'First Selectable Item', value: 5 },
                { label: 'Second Selectable Item', value: 6 },
                { label: 'Third Selectable Item', value: 7 },
                { label: 'Disabled Selectable Item', value: 8, disabled: true }
            ],
            style: 'col-md-6'
        },
        {
            label: 'Radio Buttons',
            type: 'radio',
            name: 'check2',
            values: [
                { label: 'First Selectable Item', value: 9 },
                { label: 'Second Selectable Item', value: 10 },
                { label: 'Third Selectable Item', value: 11 },
                { label: 'Disabled Selectable Item', value: 12, disabled: true }
            ],
            style: 'col-md-6'
        },
        {
            label: 'Checkboxes Inline',
            type: 'checkbox',
            style: 'form-group--inline col-md-12',
            name: 'check3',
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
            style: 'form-group--inline col-md-12',
            name: 'check4',
            values: [
                { label: 'First Selectable Item', value: 17 },
                { label: 'Second Selectable Item', value: 18 },
                { label: 'Third Selectable Item', value: 19 },
                { label: 'Disabled Selectable Item', value: 20, disabled: true }
            ]
        }
    ];
    /**
     * @see View::constructor()
     */
    constructor(...args) {
        super(...args);

        this.subscribeEvent('form:basic-form:init', (form) => {
            // setting default values for validated fields
            form.text = 'Valid Content';
            form.email = 'Invalid Content';

            // just setting default vaules for checkable inputs
            this.inputs.forEach((input) => {
                if (/checkbox|radio|select/.test(input.type)) {
                    form[form.bindingName(input)] = input.values[1];
                    if (input.type === 'checkbox') {
                        form[form.bindingName(input)] = [form[form.bindingName(input)]];
                    }
                }
            });
            // validation rules
            ValidationRules
                .ensure('text').displayName('Text Input')
                .required()
                .ensure('email').displayName('Email Input')
                .email().withMessage(`\${$displayName} must be an email.`)
                .required()
                .on(form);
        });

        this.subscribeEvent('form:basic-form:validated', (data) => messg.success('Form validated succesfully.'));

        this.subscribeEvent('form:basic-form:invalid', () => messg.warning('Form invalid.'));
    }
    /**
     * @see View::defaultSettings()
     * @return {Object}
     */
    get defaultSettings() {
        return extend(true, super.defaultSettings, {
            pageTitle: {
                content: {
                    title: 'Forms'
                }
            },
            form: {
                name: 'basic-form'
            }
        })
    }
}
