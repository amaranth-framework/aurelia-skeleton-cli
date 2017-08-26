import { Component } from 'features/views/component';
import { extend } from 'features/utils';

/**
 *
 */
export class ComponentNavTopUser extends Component {
    /**
     * @see ModelView::overrideSettingsKey
     */
    overrideSettingsKey = 'components.nav-top-user';
    /**
     * @see View::defaultSettings()
     * @return {Object}
     */
    get defaultSettings() {
        return extend(true, super.defaultSettings, {
            user: {
                fromSession: true
            }
        })
    }
}
