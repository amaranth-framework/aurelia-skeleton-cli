import { Component } from 'features/views/component';

/**
 * Abstract Model View (usable with <compose>)
 * @note Please keep in mind that Component and Model are almost the same thing, however Model is oriented to the idea
 * of a model-view having all it's functionality within a Model class, while the notion of a component can be extended
 * to any piece of replicable code or functionality within the website.
 */
export class Model extends Component {
    /**
     * @see Component:defaultSettings
     * In Template and Component class, this variable is named different because ECMAScript does not suppoer
     * super.property. This artifice needs to be made in order to quit duplicating settings content all over
     * the extending classes.
     * @type {Object}
     */
    defaultSettings = {
        style: '',                 // component's style - list of classes add to the component to be able to format it.
        styles: {},                // set of classes that can be used throughout different sections of the component

        content: {},               // translation keys for different text/html components in the template

        service: {},               // possible service settings for component
        services: {}               // possible services settings for component
    }
    /**
     * @method load()
     * @param {Number} id?
     * @returns {Object}
     */
    /**
     * @method save()
     * @returns {Boolean}
     */
}
