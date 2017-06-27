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
        filter: {}
    }
    /**
     * @see ModelView::overrideSettingsKey
     */
    overrideSettingsKey = 'components.nav';
    /**
     * [filteredRoutes description]
     * @method filteredRoutes
     * @return {Array}       [description]
     */
    get filteredRoutes() {
        return _.filter(this.settings.routes || this.router.routes, this.settings.filter);
    }
}
