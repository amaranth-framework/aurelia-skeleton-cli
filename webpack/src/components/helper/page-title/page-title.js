import {Component} from 'features/views/component';

import { extend } from 'features/utils';

/**
 *
 */
export class ComponentHelperPageTitle extends Component {
    /**
     * @see ModelView::overrideSettingsKey
     */
    overrideSettingsKey = 'components.helper-page-title';
    /**
     * @see View::defaultSettings()
     * @return {Object}
     */
    get defaultSettings() {
        return extend(true, super.defaultSettings, {
            content: {
                title: 'Page Title'
            }
        })
    }
}
