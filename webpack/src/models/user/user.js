import { Model, properties } from 'features/views/model';

import { AuthorizeStepJWT as AuthorizeStep } from 'features/authorize-step/authorize-step';
import { extend, waitForVariable } from 'features/utils';

export class User extends Model {
    @properties([
        'id',
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
     * @see ModelView:defaultSettings
     */
    get defaultSettings() {
        return extend(true, {
            service: 'users',          // possible service settings for component
            services: {                // possible services settings for component
                list: 'users',
                load: 'users',
                remove: 'users'
            }
        }, super.defaultSettings);
    }
}
