import { Component } from 'features/views/component';

import _ from 'lodash';

export class ComponentNav extends Component {
    /**
     * @see ModelView:defaultSettings
     */
    defaultSettings = {
        style: '',                 // component's style - list of classes add to the component to be able to format it.
        styles: {},                // set of classes that can be used throughout different sections of the component

        content: {},               // translation keys for different text/html components in the template

        service: {},               // possible service settings for component
        services: {},              // possible services settings for component

        routes: [],
        filter: {
            nav: true
        }
    }
    /**
     * @see ModelView::overrideSettingsKey
     */
    overrideSettingsKey = 'components.nav';
    /**
     * Search for a list of routes, by their name
     * @param  {Array}   names
     * @return {Array[Object]}
     */
    findRoutes(names) {
        return names.map((name) => this.findRoute(name));
    }
    /**
     * Search for a route name in the routes array
     * @param  {String} name
     * @return {Object}
     */
    findRoute(name) {
        return _.find(this.router.routes, {name: name}) || {name: name};
    }
    /**
     * [filteredRoutes description]
     * @return {Array}
     */
    get filteredRoutes() {
        return _.filter(
            (this.settings.routes.length) ? this.settings.routes : this.router.routes,
            this.settings.filter
        );
    }
    /**
     * Determine whether is navbar-nav or not.
     * @return {Boolean}
     */
    get isNavbarNav() {
        return this.settings.style && this.settings.style.match(/navbar-nav/);
    }
}
