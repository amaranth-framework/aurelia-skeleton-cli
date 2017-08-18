import {Component} from 'features/views/component';

import Chance from 'chance';

export class ComponentHelperForm extends Component {
    /**
     * @see View:defaultSettings
     */
    defaultSettings = {
        style: '',    // component's style - list of classes add to the component to be able to format it.
        styles: {     // set of classes that can be used throughout different sections of the component
            labelAsCol: 'col-md-3',
            inputAsCol: 'col-md-9'
        },

        content: {},  // translation keys for different text/html components in the template

        service: {},  // possible service settings for component
        services: {}  // possible services settings for component
    };
    /**
     * @see View::overrideSettingsKey
     */
    overrideSettingsKey = 'components.helper-table';
    /**
     * [isTextarea description]
     * @param  {String}  type
     * @return {Boolean}
     */
    isCheckable(input) {
        return /checkbox|radio/.test(input.value)
    }
    /**
     * [isTextarea description]
     * @param  {String}  type
     * @return {Boolean}
     */
    isCheckables(input) {
        return /checkboxes|radios/.test(input.value)
    }
    /**
     * [isTextarea description]
     * @param  {String}  type
     * @return {Boolean}
     */
    isSelect(input) {
        return input.value === 'select';
    }
    /**
     * [isTextarea description]
     * @param  {String}  type
     * @return {Boolean}
     */
    isTextarea(input) {
        return input.value === 'textarea';
    }
    /**
     * [isTextInput description]
     * @param  {String}  type
     * @return {Boolean}
     */
    isTextInput(type) {
        return /color|date(time-local)?|email|image|month|number|password|range|search|te(l|xt)|time|url|week/.test(type)
    }
    /**
     * Calculate a marker for specifying the input is filled in, only for material style.
     * @method materialFilledMarker
     * @param  {Object} input
     * @return {String}
     */
    materialFilledMarker(input) {
        return ((this.style.indexOf('form--material') > -1 && input.value) ? 'is-not-empty' : '');
    }
}
