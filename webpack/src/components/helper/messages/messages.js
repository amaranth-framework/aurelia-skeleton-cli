import { Component } from 'features/views/component';
import { extend } from 'features/utils';

/**
 * Component for displaying messages among the entire application.
 */
export class ComponentHelperMessages extends Component {
    /**
     * @see View::overrideSettingsKey
     */
    overrideSettingsKey = 'components.helper-messages';
    /**
     * @see View::constructor()
     */
    constructor(...args) {
        super(...args);
    }
    init() {
        super.init();
    }
    detached() {

    }
}
