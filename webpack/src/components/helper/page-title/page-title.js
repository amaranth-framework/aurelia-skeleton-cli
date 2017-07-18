import {Component} from 'features/views/component';

export class ComponentHelperPageTitle extends Component {
	/**
     * @see ModelView:defaultSettings
     */
    defaultSettings = {
        style: '',                 // component's style - list of classes add to the component to be able to format it.
        styles: {},                // set of classes that can be used throughout different sections of the component

        content: {                 // translation keys for different text/html components in the template
			title: 'Page Title'
		},

        service: {},               // possible service settings for component
        services: {},              // possible services settings for component

        routes: [],
        filter: {}
    }
    /**
     * @see ModelView::overrideSettingsKey
     */
    overrideSettingsKey = 'components.nav';
}
