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

        this.subscribeEvent('model:user:attached', async (formView) => {
            if (!formView.parent || formView.parent !== this) {
                return;
            }
            this.formView = formView;
            console.log('edit', formView);
            if (this.params.action && this.params.action === 'edit') {
                await this.formView.load(this.params.id);
            }
        });

        this.subscribeEvent('form:user:validated', async (formView) => {
            let user = User.newInstance();
            if (this.params.action && this.params.action === 'edit') {
                await user.load(this.params.id);
            }
            user.setData(this.formView.data);
            await user.save();
            this.router.navigateToRoute('users');
        });
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
