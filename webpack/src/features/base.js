// import { inject, LogManager } from 'aurelia-framework';
import { inject } from 'aurelia-framework';
import { AureliaConfiguration } from 'aurelia-configuration';
import { I18N } from 'aurelia-i18n';
import { Config as API } from 'aurelia-api';
import { EventAggregator } from 'aurelia-event-aggregator';
import { Router } from 'aurelia-router';

import UUID from 'uuid-js';
import { excludes, traits } from 'traits-decorator'

import {Loggable} from 'features/traits/loggable';
import {RESTable} from 'features/traits/restable';
import { waitForVariable, extend, className, parentClassName } from 'features/utils';

/**
 * Aurelia class base for almost each functionality we may build.
 */
@traits(Loggable::excludes('toString'),RESTable)
@inject(API, AureliaConfiguration, EventAggregator, I18N, Router)
export class Base {
    /**
     * Constructor
     * @param {API}                  api    aurelia-api plugin
     * @param {AureliaConfiguration} config aurelia-configuration plugin
     * @param {EventAggregator}      events Aurelia EventAggregator module
     * @param {I18N}                 i18n   aurelia-i18n plugin
     * @param {Router}               router Aurelia Router module
     */
    constructor(api, config, events, i18n, router) {
        this.configure(api);
        this.config = config;
        this.events = events;
        this.i18n = i18n;
        this.router = router;
        /**
         * @type {Object}
         */
        this.__uuid = UUID.create(4);
        /**
         * @type {Logger}
         */
        this.logger = this.getLogger();
    }
    /**
     * Reduce class to a string identifier
     * @return {String}
     */
    toString() {
        return `${parentClassName(this) || 'Object'}/${className(this)}/${this.__uuid.toString()}`
    }
}
