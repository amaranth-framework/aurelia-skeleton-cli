import { ComponentHelperContent } from 'components/helper/content/content';

export class ComponentNavTop extends ComponentHelperContent {
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
                type: 'navbar-nav-left',
                module: 'components/nav/nav',
                settings: {
                    style: 'navbar-nav'
                }
            },
            {
                type: 'top-user',
                module: 'components/nav/top/user/user',
                settings: {
                    style: 'navbar-nav'
                }
            },
            {
                type: 'top-inbox',
                module: 'components/nav/top/inbox/inbox'
            }
        ],

        navbar: {
            style: 'navbar-nav'
        }
    }
    /**
     * @see ModelView::overrideSettingsKey
     */
    overrideSettingsKey = 'components.nav-top';
    /**
     * Toggle Visibility of left navigation menu
     * @return {void}
     */
    toggleLeftNav() {
        // TODO: Implement loggle-left-nav
    }
}
