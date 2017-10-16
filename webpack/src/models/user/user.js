import { Model, properties } from 'features/views/model';
import { ValidationRules } from 'aurelia-validation';

import { excludes, traits } from 'traits-decorator';

import { AuthorizeStepJWT as AuthorizeStep } from 'features/authorize-step/authorize-step';
import { extend, waitForVariable } from 'features/utils';
import { Form } from 'features/traits/form';

@traits(Form::excludes('detached', 'init', 'setData'))
export class User extends Model {
    @properties([
        {name: 'id', formConfig: { type: 'hidden' }},
        'email',
        'name',
        'username'
    ])
    /**
     * @see ModelView::overrideSettingsKey
     */
    overrideSettingsKey = 'models.user';
    /**
     * @property {type:String}
     */
    name = 'John Doe';
    /**
     * @property {type:String}
     */
    email = 'john@doe.com';
    /**
     * @property {type:String}
     */
    image = 'https://scontent.fotp3-3.fna.fbcdn.net/v/t1.0-1/p160x160/18740252_1314787368636643_6264909807224683_n.jpg?oh=159ffc5fe2c448015e79974826077374&oe=59C7445D';

    /**
     * @see ModelView:defaultSettings
     */
    get defaultSettings() {
        return extend(true, {
            service: 'users',          // possible service settings for component
            services: {                // possible services settings for component
                list: 'users',
                load: 'users',
                remove: 'users',
                save: 'users',
                update: 'users'
            },
            form: {
                name: 'user-edit'
            }
        }, super.defaultSettings);
    }
    /**
     * [init description]
     * @method init
     * @return {Promise} [description]
     */
    async init() {
        super.init();
        // Load user from session.
        if (this.settings.fromSession) {
            const id = this.config.get('auth-step').sessionDecoded.id;
            this.logger.debug(`Loading user with id: '${id}' from session.`);
            this.load(id);
        }
    }
    /**
     * @param  {Model|{}} o
     */
    applyValidationRules(o) {
        ValidationRules
            .ensure('email').displayName('Email Input')
            .email().withMessage(`\${$displayName} must be an email.`)
            .required()
            .on(this);
    }
}
