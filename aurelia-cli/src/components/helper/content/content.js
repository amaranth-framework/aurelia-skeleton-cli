import { Component } from 'features/views/component';
import { Loader, inject } from 'aurelia-framework';

/**
 * Content Page template
 */
@inject(Loader)
export class ComponentHelperContent extends Component {
    /**
     * @see ModelView::defaultSettings
     */
    defaultSettings = {
        layout: '',
        styles: {
            inner: ''
        }
    };
    /**
     * @see ModelView::overrideSettingsKey
     */
    overrideSettingsKey = 'components.helper-content';

    /**
     * @see Template::constructor()
     */
    constructor(loader, ...args) {
        super(...args);

        this.loader = loader;
    }
}
