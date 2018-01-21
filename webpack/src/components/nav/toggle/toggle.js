import { Component } from 'features/views/component';
import { extend } from 'features/utils';

export class ComponentNavToggle extends Component {
    /**
     * @see ModelView::overrideSettingsKey
     */
    overrideSettingsKey = 'components.nav-toggle';
    /**
     * @see View::defaultSettings()
     * @return {Object}
     */
    get defaultSettings() {
        return extend(true, super.defaultSettings, {
            routes: [],
            filter: {}
        });
    }
    /**
     *
     */
    togglerRetract() {}
}
