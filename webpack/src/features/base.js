import { inject, LogManager } from 'aurelia-framework';
import { AureliaConfiguration } from 'aurelia-configuration';
import { I18N } from 'aurelia-i18n';
import { Config as API } from 'aurelia-api';
import { EventAggregator } from 'aurelia-event-aggregator';
import { Router } from 'aurelia-router';

import UUID from 'uuid-js';

/**
 * Feel free to extend GraphQLClient with any client in the market. At this moment, we're using Apollo Client.
 * @link http://dev.apollodata.com/
 */
import { ApolloClient as GraphQLClient } from 'features/graphql-client/apollo';
import { waitForVariable, extend, className, parentClassName } from 'features/utils';

/**
 * Aurelia class base for almost each functionality we may build.
 */
@inject(API, AureliaConfiguration, GraphQLClient, EventAggregator, I18N, Router)
export class Base {
    /**
     * Constructor
     * @param {Config}               api aurelia-api plugin
     * @param {AureliaConfiguration} config aurelia-configuration plugin
     * @param {AuthorizeStep}        authStep Authorization step
     * @param {EventAggregator}      events Aurelia EventAggregator module
     * @param {I18N}                 i18n aurelia-i18n plugin
     * @param {Router}               router Aurelia Router module
     */
    constructor(api, config, gql, events, i18n, router) {
        this.api = api;
        this.config = config;
        this.gql = gql;
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
     * @return {Promise|Endpoint?}
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
     * Obtain GrapQL Endpoint, functionig with 'apollo-client' module.
     * @return {Promise}
     */
    getGraphQLEndpoint() {
        return new Promise((resolve, reject) => {
            if (this._graphql) {
                resolve(this._graphql);
            }
            waitForVariable(this.config)
                .catch(err => {
                    this.logger.error(err);
                    reject(err);
                })
                .then(config => {
                    this._graphql = this.gql.getEndpointWithWS(
                        this.config.get('graphql.http-endpoint'),
                        this.config.get('graphql.ws-endpoint')
                    );
                    this._graphql.tag = (operation) => this.gql.tag(operation);
                    resolve(this._graphql);
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
