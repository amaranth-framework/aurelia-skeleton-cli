import { inject } from 'aurelia-framework';

import { AuthorizeStep as AuthorizeStep } from 'features/authorize-step/authorize-step';
import { Component } from 'features/views/component';

/**
 * 
 */
@inject(AuthorizeStep)
export class ComponentNavTopUser extends Component {
    /**
     * @see ModelView:defaultSettings
     */
    defaultSettings = {
        style: '',                 // component's style - list of classes add to the component to be able to format it.
        styles: {},                // set of classes that can be used throughout different sections of the component

        content: {},               // translation keys for different text/html components in the template

        service: {},               // possible service settings for component
        services: {}               // possible services settings for component
    }
    /**
     * @see ModelView::overrideSettingsKey
     */
    overrideSettingsKey = 'components.nav-top-user';
    /**
     * Constructor
     * @see Base::constructor() for the rest of the arguments
     * @param {AuthorizeStep} authStep Authorization step
     */
    constructor(authStep, ...args) {
        super(...args);
        this.authStep = authStep;
    }
}
