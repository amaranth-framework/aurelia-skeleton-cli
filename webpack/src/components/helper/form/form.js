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
     * [isTextInput description]
     * @method isTextInput
     * @param  {String}  type
     * @return {Boolean}
     */
    isTextInput(type) {
        return /color|date(time-local)?|email|image|month|number|password|range|search|te(l|xt)|time|url|week/.test(type)
    }
}
