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
            name: 'password',
            placeholder: 'Password (Validation set, but triggered when change)',
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
            // bindByModel: true,
            label: 'Select',
            name: 'select',
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
            name: 'textarea',
            type: 'textarea',
            style: 'col-md-12'
        },
        {
            // bindByModel: true,
            label: 'Single Checkbox',
            type: 'checkbox',
            name: 'check0',
            values: [
                { label: 'First Selectable Item', value: 21 },
            ],
            style: 'col-md-12'
        },
        {
            // bindByModel: true,
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
            // bindByModel: true,
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
            // bindByModel: true,
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
            // bindByModel: true,
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
            // attach the input list
            // @NOTE This practice is not recommended for production. We just used this for the demo purpose.
            form.settings.inputs = this.inputs;

            // setting default values for validated fields
            form.text = 'Valid Content';
            form.email = 'Invalid Content (Wrong value, Validation trigger when changed)';

            // just setting default vaules for checkable inputs
            this.inputs.forEach((input) => {
                if (/checkbox|radio|select/.test(input.type)) {
                    let index = input.values.length > 1 ? this.random() % input.values.length : 0;
                    // form[input.name] = input.values[];
                    // form[input.name] = input.values[index];
                    form[input.name] = input.values[index].value;
                    if (input.type === 'checkbox') {
                        form[input.name] = [form[input.name]];
                    }
                }
            });
            console.log('data', form.getData());
            // validation rules
            ValidationRules
                .ensure('text').displayName('Text Input')
                .required()
                .ensure('password').displayName('Password Input')
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
    /**
     * @return {Number}
     */
    random() {
        let rand = (Math.random() + Math.random() + Math.random() + Math.random() + Math.random() + Math.random()) / 3;
        return Math.floor(rand * 100);
    }
}
