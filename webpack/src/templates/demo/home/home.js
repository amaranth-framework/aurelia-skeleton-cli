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
        })
    }
}
