import {validateTrigger, ValidationController, ValidationRules} from 'aurelia-validation';

import { Template } from 'features/views/template';
import { extend } from 'features/utils';
import { User } from 'models/user/user';



export class TemplateUsers extends Template {
    /**
     * @see ModelView::overrideSettingsKey
     */
    overrideSettingsKey = 'templates.users';
    /**
     * @see View::constructor()
     */
    constructor(...args) {
        super(...args);
        // obtain the form config from the user model
        this.formConfig = User.newInstance().toFormConfig();

        this.subscribeEvent('form:user-edit:attached', (formView) => {
            // validation rules
            ValidationRules
                .ensure('email').displayName('Email Input')
                .email().withMessage(`\${$displayName} must be an email.`)
                .required()
                .on(formView.data);
        })
    }
    /**
     * @see View::attached()
     */
    attached() {
        // display form in case edit or add actions are called
        if (this.params.action && this.params.action.match(/^(add|edit)$/)) {
            $('#modal-user-form').modal('show');
        }
    }
    /**
     * @see View:defaultSettings
     * @type {Object}
     */
    get defaultSettings() {
        return extend(true, super.defaultSettings, {
            pageTitle: {
                content: {
                    title: 'Users'
                }
            },
            users: {}
        })
    }
}
