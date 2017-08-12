import { inject, LogManager } from 'aurelia-framework';
import { AureliaConfiguration } from 'aurelia-configuration';
import { I18N } from 'aurelia-i18n';
import { Config as API } from 'aurelia-api';
import { EventAggregator } from 'aurelia-event-aggregator';
import { Router } from 'aurelia-router';

import UUID from 'uuid-js';

import { waitForVariable, extend, className, parentClassName } from 'features/utils';

/**
 * Aurelia class base for almost each functionality we may build.
 */
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
        this.api = api;
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
        this.logger = LogManager.getLogger(this.toString());
    }
    /**
     * Obtain REST Endpoint, functionig with 'aurelia-api' module.
     * @return {Promise}
     */
    getRestEndpoint() {
        return new Promise((resolve, reject) => {
            if (this._rest) {
                resolve(this._rest);
                return;
            }
            // wait for config variable
            waitForVariable(this.config)
                // if timeout, throw error
                .catch(err => {
                    this.logger.error(err);
                    reject(err);
                })
                // otherwise return REST endpoint
                .then(config => {
                    this._rest = this.api.getEndpoint(this.config.get('rest.http-endpoint'));
                    resolve(this._rest);
                })
        });
    }
    /**
     * Reduce class to a string identifier
     * @return {String}
     */
    toString() {
        return `${parentClassName(this) || 'Object'}/${className(this)}/${this.__uuid.toString()}`
    }
}
