import {Component} from 'features/views/component';

/**
 * https://www.npmjs.com/package/kindergarten
 */

export class ComponentFormDemoSimple extends Component {
    /**
    * @see View:defaultSettings
    */
    defaultSettings = {
        style: '',                 // component's style - list of classes add to the component to be able to format it.
        styles: {},                // set of classes that can be used throughout different sections of the component

        content: {                 // translation keys for different text/html components in the template
            caption: false
        },

        service: '',   // possible service settings for component
        services: {},               // possible services settings for component

        modes: [
            {
                'style': 'col-md-6 col-md-offset-3',
                'label': 'Standard Form'
            },
            {
                'style': 'form-horizontal col-md-8 col-md-offset-1',
                'label': 'Horizontal Form'
            },
            {
                'style': 'form--material col-md-6 col-md-offset-3',
                'label': 'Material Form'
            },
            {
                'style': 'form--material form--material-no-labels col-md-6 col-md-offset-3',
                'label': 'Material Form with no Labels'
            }
        ]
    };
    /**
     * @see View::overrideSettingsKey
     */
    overrideSettingsKey = 'components.form';
    attached() {
        this.mode = {
            'style': 'form--material form--material-no-labels col-md-6 col-md-offset-3',
            'label': 'Material Form with no Labels'
        };
    }
}
