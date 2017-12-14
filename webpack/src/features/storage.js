/**
 * Amaranth - Aurelia Skeleton (http://github.com/amaranth-framework/aurelia-skeleton/)
 *
 * @link      http://github.com/amaranth-framework/aurelia-skeleton/ for the canonical source repository
 * @copyright Copyright (c) 2007-2017 IT Media Connect (http://itmediaconnect.ro)
 * @license   http://github.com/amaranth-framework/aurelia-skeleton/LICENSE MIT License
 */

import { excludes, traits } from 'traits-decorator';

import { Loggable } from 'features/traits/loggable';
import { getCookie, setCookie, removeCookie } from 'features/utils';

/**
 * @type {Object}
 */
export var StorageOptions = {
    type: 'local'
};

/**
 * Class used for storing data using differen browser functionalities.
 */
@traits(Loggable::excludes('toString'))
export class Storage {
    /**
     * @type {String}
     */
    static TYPE_COOKIE = 'cookie';
    /**
     * @type {String}
     */
    static TYPE_LOCAL = 'local';
    /**
     * @type {String}
     */
    static TYPE_SESSION = 'session';
    /**
     * @param  {String} type
     */
    constructor(type = StorageOptions.type) {
        this.type = type;
        this.logger = this.getLogger();
    }
    /**
     * Obtain vaue for a certain key.
     * @param  {String} key
     * @return {any}
     */
    get(key) {
        if (this.type !== Storage.TYPE_COOKIE) {
            try {
                return JSON.parse(window[`${this.type}Storage`].getItem(key) || 'null');
            } catch (e) {
                this.logger.warn(
                    'session()',
                    `Could not implement session (${this.type}). Fallback to cookie.`,
                    e
                );
                throw e;
            }
        }
        return JSON.parse(getCookie(key) || 'null');
    }
    /**
     * Remove a key from storage
     * @param  {String} key
     */
    remove(key) {
        if (this.type !== Storage.TYPE_COOKIE) {
            try {
                window[`${this.type}Storage`].removeItem(key);
                return true;
            } catch (e) {
                this.logger.warn(
                    'sessionRemove()',
                    `Could not implement session (${this.type}). Fallback to cookie.`,
                    e
                );
            }
        }
        return removeCookie(key);
    }
    /**
     * Add a key to storage.
     * @param  {String} key
     * @param  {any}    value
     */
    set(key, value)  {
        if (this.type !== Storage.TYPE_COOKIE) {
            try {
                let storage = window[`${this.type}Storage`];
                storage.setItem(key, JSON.stringify(value));
                return true;
            } catch (e) {
                this.logger.warn(
                    'sessionStore()',
                    `Could not implement session:${this.type}. Fallback to cookie.`,
                    e
                );
            }
        }
        return setCookie(key, JSON.stringify(value));
    }
}
