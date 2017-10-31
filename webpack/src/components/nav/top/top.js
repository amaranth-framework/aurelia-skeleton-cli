import { ComponentHelperContent } from 'components/helper/content/content';

import { extend } from 'features/utils';

export class ComponentNavTop extends ComponentHelperContent {
    /**
     * @see ModelView::overrideSettingsKey
     */
    overrideSettingsKey = 'components.nav-top';
    /**
     * @see View::defaultSettings()
     * @return {Object}
     */
    get defaultSettings() {
        return extend(true, super.defaultSettings, {
            components: [
                // {
                //     type: 'navbar-nav-left',
                //     module: PLATFORM.moduleName('components/nav/nav'),
                //     settings: {
                //         style: 'navbar-nav'
                //     }
                // },
                // {
                //     type: 'top-user',
                //     module: PLATFORM.moduleName('components/nav/top/user/user'),
                //     settings: {
                //         style: 'navbar-nav'
                //     }
                // },
                // {
                //     type: 'top-inbox',
                //     module: PLATFORM.moduleName('components/nav/top/inbox/inbox')
                // }
            ],

            navbar: {
                style: 'navbar-nav'
            }
        })
    }
    /**
     * Toggle Visibility of left navigation menu
     * @return {void}
     */
    toggleLeftNav() {
        // TODO: Implement loggle-left-nav
    }
}
