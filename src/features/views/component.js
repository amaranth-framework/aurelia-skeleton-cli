import { View } from 'features/views/view';

/**
 * Abstract Component View (usable with <compose>)
 */
export class Component extends AbstractView {
    /**
     * @see ModelView:defaultSettings
     * In Template and Component class, this variable is named different because ECMAScript does not suppoer
     * super.property. This artifice needs to be made in order to quit duplicating settings content all over
     * the extending classes.
     * @type {Object}
     */
    modelDefaultSettings = {
        style: '',                 // component's style - list of classes add to the component to be able to format it.
        styles: {},                // set of classes that can be used throughout different sections of the component

        content: {},               // translation keys for different text/html components in the template

        service: {},               // possible service settings for component
        services: {}               // possible services settings for component
    }
}
