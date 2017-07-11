import { inject, LogManager } from 'aurelia-framework';
import { AureliaConfiguration } from 'aurelia-configuration';
import { I18N } from 'aurelia-i18n';
import { Config as API } from 'aurelia-api';
import { EventAggregator } from 'aurelia-event-aggregator';


/**
 * Application
 */
@inject(API, AureliaConfiguration, EventAggregator, I18N)
export class App {
    /**
     * Constructor
     * @param {Config} api aurelia-api plugin
     * @param {AureliaConfiguration} config aurelia-configuration plugin
     * @param {EventAggregator} events Aurelia EventAggregator module
     * @param {I18N} i18n aurelia-i18n plugin
     */
    constructor(api, config, i18n, events) {
        this.config = config;
        this.i18n = i18n;
        /**
         * @type {???}
         */
        this.rest = api.getEndpoint('rest');
        /**
         * @type {???}
         */
        this.configApi = api.getEndpoint('config');
        this.events = events;
        /**
        * @type {Logger}
        */
        this.logger = LogManager.getLogger('app.js');
    }
    /**
     * Configure Application router
     * @method configureRouter
     * @param  {RouterConfiguration}  config
     * @param  {AppRouter}            router
     */
    configureRouter(config, router) {
        config.title = 'Planteaza pentru Romania';
        if (window.location.hostname !== 'localhost' && window.location.port !== 9000) {
            config.options.pushState = true;
        }
        config.mapUnknownRoutes('templates/status/404');
        this.mapRoutes(config);
        // comment the line above and uncomment the one below, to load your router config from a REST service
        // this.mapRoutesFromREST(config);
        this.router = router;
    }
    /**
     * Map routes from within the application class
     * @param  {RouterConfiguration}  config
     */
    mapRoutes(config) {
        config.map([
            {
                route: ['', 'home'],
                redirect: 'dashboard'
            },
            {
                route: 'dashboard',
                name: 'dashboard',
                moduleId: 'templates/home/home',
                nav: true,
                title: 'Dashboard',
                group: 'side-nav'
            },
            {
                route: 'test1',
                name: 'test1',
                moduleId: 'templates/home/home',
                nav: true,
                title: 'Dashboard',
                group: 'side-nav',
                routes: [ 'test1-child' ]
            },
            {
                route: 'test1-child',
                name: 'test1-child',
                moduleId: 'templates/home/home',
                nav: false,
                title: 'Dashboard',
                group: 'side-nav'
            }
        ]);
    }
    /**
     * Map the router with the help of a REST service
     * @param  {RouterConfiguration}  config
     */
    mapRoutesFromREST(config) {
        this.configApi.find(`${this.config.get('locale')}/routes.json`).then(response => {
            response.forEach(route => {
                route.settings = route.settings || {};
                route.moduleId = PLATFORM.moduleName(route.moduleId, route.name);
                this.router.addRoute(route);
            });

            this.router.refreshNavigation();

            const REQUEST = this.requestedRoute(this.router.routes);

            this.router.navigateToRoute(REQUEST.route, REQUEST.params, { replace: true });
            this.site.ready = true;
        });
    }
    /**
     * Extract initially requested route information
     * @param {Array} routes List of available routes
     * @returns {Object} Matching route to be loaded
     */
    requestedRoute(routes) {
        const path = (window.location.pathname.replace(/^\//, '').replace(/\/$/, '').length) ?
            window.location.pathname.replace(/^\//, '').replace(/\/$/, '').split('/') : null;
        let matchedRoute = path ? '404' : 'home';
        let matchedParams = {};
        let isFound = false;

        if (path) {
            routes.forEach(r => {
                const components = r.route.split('/');
                let isMatch = true;
                let params = {};

                if (!isFound) {
                    for (let index in components) {
                        if (components.length !== path.length) {
                            isMatch = false;
                            break;
                        }

                        if (components[index].match(/^\:/) && path[index]) {
                            params[components[index].replace(/^\:/, '')] = path[index];
                            continue;
                        }

                        if (components[index] !== path[index]) {
                            isMatch = false;
                            break;
                        }
                    }

                    if (isMatch) {
                        isFound = true;
                        matchedRoute = r.name;
                        matchedParams = params;
                    }
                }
            });

            if (window.location.search.length) {
                window.location.search.slice(1).split('&').map(param => {
                    const paramPair = param.split('=');
                    matchedParams[paramPair[0]] = paramPair[1];
                });
            }
        }

        return { route: matchedRoute, params: matchedParams };
    }
}
