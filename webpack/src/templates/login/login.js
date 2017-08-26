import { Template } from 'features/views/template';
import { extend } from 'features/utils';

/**
 *
 */
export class TemplateLogin extends Template {
    /**
     * @see View::overrideSettingsKey
     */
    overrideSettingsKey = 'templates.login';
    /**
     * Constructor
     * @see Base::constructor() for the rest of the arguments
     * @param {AuthorizeStep} authStep Authorization step
     */
    constructor(...args) {
        super(...args);

        this.user = 'Sincere@april.biz';
        this.pass = 'foopass';
    }
    /**
     * @see View::defaultSettings()
     * @return {Object}
     */
    get defaultSettings() {
        return extend(true, super.defaultSettings, {
            pageTitle: {
                content: {
                    title: 'Login'
                }
            }
        })
    }
}
