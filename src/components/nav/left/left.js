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
                module: 'model/user/user',
                view: 'model/user/left-profile.html'
            }/*,
            {
                type: 'top-user',
                module: 'components/helper/logo/logo'
            }*/
        ]
    }
    /**
     * @see ModelView::overrideSettingsKey
     */
    overrideSettingsKey = 'components.nav-left';
}
