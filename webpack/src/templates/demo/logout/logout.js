import { Template } from 'features/views/template';
import { extend } from 'features/utils';

/**
 *
 */
export class TemplateLogout extends Template {
    /**
     * @see View::overrideSettingsKey
     */
    overrideSettingsKey = 'templates.logout';
    /**
     * Constructor
     * @see Base::constructor() for the rest of the arguments
     * @param {AuthorizeStep} authStep Authorization step
     */
    constructor(...args) {
        super(...args);

        this.config.get('auth-step').logout();
        this.router.navigateToRoute('login');
    }
}
