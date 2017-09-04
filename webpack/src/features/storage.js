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
}

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
    }
    /**
     * Obtain vaue for a certain key.
     * @param  {String} key
     * @return {any}
     */
    get(key) {
        if (this.type !== Storage.TYPE_COOKIE) {
            try {
                let storage = window[`${this.type}Storage`];
                return JSON.decode(storage.getItem(this.key));
            } catch(e) {
                this.logger.warn(
                    'session()',
                    `Could not implement session:${this.type}. Fallback to cookie.`,
                    e
                );
                throw e;
            }
        }
        return JSON.decode(getCookie(this.key));
    }
    remove(key) {
        if (this.sessionConfig.type !== 'cookie') {
            try {
                let storage = window[`${this.sessionConfig.type}Storage`];
                storage.removeItem(this.sessionConfig.key);
                return true;
            } catch(e) {
                this.logger.warn(
                    'sessionRemove()',
                    `Could not implement session:${this.sessionConfig.type}. Fallback to cookie.`,
                    e
                );
            }
        }
        return removeCookie(this.sessionConfig.key);
    }
    set(key, value)  {
        if (this.sessionConfig.type !== 'cookie') {
            try {
                let storage = window[`${this.sessionConfig.type}Storage`];
                storage.setItem(this.sessionConfig.key, session);
                return true;
            } catch(e) {
                this.logger.warn(
                    'sessionStore()',
                    `Could not implement session:${this.sessionConfig.type}. Fallback to cookie.`,
                    e
                );
            }
        }
        return setCookie(this.sessionConfig.key, session);
    }
}
