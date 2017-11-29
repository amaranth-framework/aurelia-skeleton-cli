/**
 * Amaranth - Aurelia Skeleton (http://github.com/amaranth-framework/aurelia-skeleton/)
 *
 * @link      http://github.com/amaranth-framework/aurelia-skeleton/ for the canonical source repository
 * @copyright Copyright (c) 2007-2017 IT Media Connect (http://itmediaconnect.ro)
 * @license   http://github.com/amaranth-framework/aurelia-skeleton/LICENSE MIT License
 */

import { Component } from 'features/views/component';
import { extend } from 'features/utils';

/**
 * Component for displaying messages among the entire application.
 */
export class ComponentHelperMessages extends Component {
    /**
     * @see View::overrideSettingsKey
     */
    overrideSettingsKey = 'components.helper-messages';
    /**
     * @see View::constructor()
     * @param {Storage} storage
     */
    constructor(...args) {
        super(...args);

        // this.events.subscribe('messages:add', message =>  {
        //     message.expire = message.expire || 0;
        //     let messages = this.messages;
        //     messages.push(message);
        //     this.storage.set(key, messages);
        // });
        //
        // ['debug', 'info', 'warn', 'error'].forEach(type => {
        //     this.events.subscribe(`messages:add:${type}`, message => {
        //         message.type = type;
        //         this.publishEvent('messages:add', message);
        //     })
        // })
    }
    /**
     * @see View::detached()
     */
    detached() {
        this.messages.reduce();
    }
}
