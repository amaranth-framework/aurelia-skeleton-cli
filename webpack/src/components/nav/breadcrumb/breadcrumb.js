import {Component} from 'features/views/component';

import _ from 'lodash';

import { extend } from 'features/utils';

export class ComponentNavBreadcrumb extends Component {
    /**
     * @see ModelView::overrideSettingsKey
     */
    overrideSettingsKey = 'components.nav-breadcrumb';
    /**
     * @see View::defaultSettings()
     * @return {Object}
     */
    get defaultSettings() {
        return extend(true, super.defaultSettings, {
            content: {
                title: 'Page Title'
            },
            routes: [{route: ''}],
            filter: {}
        });
    }
	/**
     * @see ModelView::init()
     */
    init() {
        super.init();
        // Override routes with list from settings
        if (this.settings.routes) {
            this.routes = this.settings.routes;
        }
        // add title to predefined routes
        this.routes.forEach((route, i) => {
            this.routes[i] = this.discoverRouteByName(route.route);
        });

        let tokens = this.router.currentInstruction.config.route.split('/');
        let route = '';
        while (tokens.length) {
            route += `/${tokens.shift()}`;
            let r = this.discoverRouteByName(route.substr(1));
            if (r) {
                this.routes.push(extend(true, r, {
                    params: this.filterParams(this.router.currentInstruction.params, r),
                    active: this.router.currentInstruction.config.name === r.name
                }));
            }
        }

        this.events.subscribe('components::breacrumbs::routes', (routes = null) => {
            if (routes !== null && Array.isArray(routes)) {
                this.routes = routes;
            }
            return this.routes;
        });
    }
	/**
	 * Discover route by it's name (route key)
	 * @param  {String} route  The name of the route you're searching for.
	 * @return {Object|null}
	 */
    discoverRouteByName(route) {
        let r = _.find(this.router.routes, (o) => o.route == route || o.route.includes(route));
        if (r.redirect) {
            r = _.find(this.router.routes, { route: r.redirect });
        }
        return r;
    }
	/**
	 * [filterParams description]
	 * @method filterParams
	 * @param  {[type]}     params [description]
	 * @param  {[type]}     route  [description]
	 * @return {[type]}            [description]
	 */
    filterParams(params, route) {
        let newParams = {};
        Object.keys(params).forEach((key) => {
            if (route.route.match(new RegExp(`\/:${key}`))) {
                newParams[key] = params[key];
            }
        });
        return newParams;
    }
	/**
	 * @see View::attached()
	 */
    attached() {
        this.publishEvent('components::breadcrumbs::attached', this.routes);
    }
}
