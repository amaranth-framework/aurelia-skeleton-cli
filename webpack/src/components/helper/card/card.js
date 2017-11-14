import { Component } from 'features/views/component';
import { extend } from 'features/utils';

/**
*
*/
export class ComponentHelperCard extends Component {
    /**
     * @see View::overrideSettingsKey
     */
    overrideSettingsKey = 'components.card';
    /**
    * @see View::defaultSettings()
    * @return {Object}
    */
    get defaultSettings() {
        return extend(true, super.defaultSettings, {
            actions: [
                { icon: 'fa fa-pencil', title: 'Edit', event: 'listing:edit' },
                { icon: 'fa fa-trash', title: 'Remove', event: 'listing:remove' }
            ]
        });
    }
}
