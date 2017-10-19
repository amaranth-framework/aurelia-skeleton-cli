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

        this.subscribeEvent('model:user:attached', async (user) => {
            if (!user || !user.parent || user.parent !== this) {
                return;
            }
            this.user = user;
            if (this.params.action && this.params.action === 'edit') {
                await this.user.load(this.params.id);
            }
        });

        this.subscribeEvent('model:user:validated', async (user) => {
            await user.save();
            $('#modal-user-form').modal('hide');
        });
    }
    /**
     * @see View::attached()
     */
    attached() {
        // display form in case edit or add actions are called
        if (this.params.action && this.params.action.match(/^(add|edit)$/)) {
            $('#modal-user-form')
                .modal('show')
                .on('hidden.bs.modal', () => this.router.navigateToRoute('users'));
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
    // /**
    //  * @see View::detached()
    //  */
    // detached() {
    //     super.detached();
    //     $('#modal-user-form').modal('hide');
    // }
}
