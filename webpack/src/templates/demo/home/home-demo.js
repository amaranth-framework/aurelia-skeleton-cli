/**
 * Amaranth Skeleton (http://github.com/amaranth-framework/aurelia-skeleton/)
 *
 * @link      http://github.com/amaranth-framework/aurelia-skeleton/ for the canonical source repository
 * @copyright Copyright (c) 2007-2016 IT Media Connect (http://itmediaconnect.ro)
 * @license   http://github.com/amaranth-framework/aurelia-skeleton/LICENSE MIT License
 */

import { Template } from 'features/views/template';
import { extend } from 'features/utils';

/**
 * Home Template (Demo)
 */
export class TemplatesHome extends Template {
    /**
     * @see View::overrideSettingsKey
     */
    overrideSettingsKey = 'templates.home';
    /**
     * @see View::constructor()
     * @param {Storage} storage
     */
    constructor(...args) {
        super(...args);

        if (!this.messages.list.length) {
            this.messages.debug('This is a debug message, to remain for 5 times under your eyes.', 5);
            this.messages.debug('This is another debug message, to dissapear after 1st display', 0);
            this.messages.info('This is a info message', 0);
            this.messages.warn('This is a warning message', 0);
            this.messages.error('This is a error message, to remain for 2 times under your eyes.', 1);
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
                    title: 'Dashboard'
                }
            }
        });
    }
}
