import { Model, properties } from 'features/views/model';
import { ValidationRules } from 'aurelia-validation';
import { excludes, traits } from 'traits-decorator';
import { extend } from 'features/utils';
import { Form } from 'features/traits/form';

/**
 *
 */
@traits(Form::excludes('formConfig'))
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
    image = '/images/user.png';

    /**
     * @see ModelView:defaultSettings
     */
    get defaultSettings() {
        return extend(true, super.defaultSettings, {
            service: 'users',          // possible service settings for component
            services: {                // possible services settings for component
                list: 'users',
                load: 'users',
                remove: 'users',
                save: 'users',
                update: 'users'
            },
            name: 'user',
            view: 'default'
        });
    }
    /**
     * @return {Array<{}>}   [description]
     */
    formConfig() {
        return [
            { name: 'id', type: 'hidden' },
            { name: 'email', type: 'email' },
            { name: 'name', type: 'text' },
            { name: 'username', type: 'text' }
        ];
    }
    /**
     * @see View::init()
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
            .email().withMessage('\${$displayName} must be an email.')
            .required()
            .on(this);
    }
}
