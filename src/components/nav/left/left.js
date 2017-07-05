import { ComponentHelperContent } from 'components/helper/content/content';

export class ComponentNavLeft extends ComponentHelperContent {
    /**
     * @see ModelView:defaultSettings
     */
    defaultSettings = {
        style: '',                 // component's style - list of classes add to the component to be able to format it.
        styles: {},                // set of classes that can be used throughout different sections of the component

        content: {},               // translation keys for different text/html components in the template

        service: {},               // possible service settings for component
        services: {},              // possible services settings for component

        components: [
            {
                type: 'left-logo',
                module: 'components/helper/logo/logo'
            },
            {
                type: 'left-profile',
                module: 'models/user/user',
                view: 'models/user/left-profile.html'
            },
            {
                type: 'left-nav',
                module: 'components/nav/nav',
                settings: {
                    content: {
                        title: 'General'
                    },
                    filter: { nav: true }
                }
            }
        ]
    }
    /**
     * @see ModelView::overrideSettingsKey
     */
    overrideSettingsKey = 'components.nav-left';
}
