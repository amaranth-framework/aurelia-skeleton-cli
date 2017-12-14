import { Loader, inject } from 'aurelia-framework';

import { Component } from 'features/views/component';
import { extend } from 'features/utils';

/**
 * Content Page template
 */
@inject(Loader)
export class ComponentHelperContent extends Component {
    /**
     * @see ModelView::overrideSettingsKey
     */
    overrideSettingsKey = 'components.helper-content';
    /**
     * @see View::defaultSettings()
     * @return {Object}
     */
    get defaultSettings() {
        return extend(true, super.defaultSettings, {
            styles: {
                inner: ''
            }
        });
    }
    /**
     * @see Template::constructor()
     */
    constructor(loader, ...args) {
        super(...args);

        this.loader = loader;
    }
}
