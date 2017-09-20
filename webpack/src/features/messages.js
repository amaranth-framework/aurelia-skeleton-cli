/**
 * Amaranth - Aurelia Skeleton (http://github.com/amaranth-framework/aurelia-skeleton/)
 *
 * @link      http://github.com/amaranth-framework/aurelia-skeleton/ for the canonical source repository
 * @copyright Copyright (c) 2007-2017 IT Media Connect (http://itmediaconnect.ro)
 * @license   http://github.com/amaranth-framework/aurelia-skeleton/LICENSE MIT License
 */

import { inject } from 'aurelia-framework';

import { Storage } from 'features/storage';

/**
 * Class for storing messages around the aplication.
 */
@inject(Storage)
export class Messages {
    static TYPE_ERROR = 'error';
    static TYPE_WARN = 'warn';
    static TYPE_INFO = 'info';
    static TYPE_DEBUG = 'debug';
    key = 'messages';
    /**
     * @param  {Storage} storage
     */
    constructor(storage) {
        this.storage = storage;
        this.storage.set(this.key, this.list);
    }
    /**
     * @param  {String} message
     * @param  {String} type
     * @param  {Number} expire
     */
    add(message, type = Messages.TYPE_DEBUG, expire = 0) {
        let messages = this.list;
        messages.push({
            message: message,
            type: type,
            expire: expire
        });
        this.storage.set(this.key, messages);
    }
    /**
     * @param  {String} message
     * @param  {Number} expire
     */
    debug(message, expire = 0) {
        this.add(message, Messages.TYPE_DEBUG, expire);
    }
    /**
     * @param  {String} message
     * @param  {Number} expire
     */
    error(message, expire = 0) {
        this.add(message, Messages.TYPE_ERROR, expire);
    }
    /**
     * @param  {String} message
     * @param  {Number} expire
     */
    info(message, expire = 0) {
        this.add(message, Messages.TYPE_INFO, expire);
    }
    /**
     * @return {Array}
     */
    get list() {
        return this.storage.get(this.key) || [];
    }
    /**
     * @see View::detached()
     */
    reduce() {
        let messages = this.list;
        messages.forEach(_ => _.expire--);
        messages = messages.filter(_ => _.expire > -1);
        this.storage.set(this.key, messages);
    }
    /**
     * @param  {String} message
     * @param  {Number} expire
     */
    warn(message, expire = 0) {
        this.add(message, Messages.TYPE_WARN, expire);
    }
}
