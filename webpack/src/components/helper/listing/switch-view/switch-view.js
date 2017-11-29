import { Component } from 'features/views/component';
import { extend } from 'features/utils';

/**
 *
 */
export class ComponentHelperListingSwitch extends Component {
    /**
     * @type {String}
     */
    overrideSettingsKey = 'components.helper-listing-switchview'
    /**
     * @see View::init()
     */
    init() {
        super.init();

        this.publishEvent(`listing:${this.settings.name}:switch-view:init`, this);

        this.subscribeEvent(`listing:${this.settings.name}:switch-view:set-views`, views => this.setViews(views));
    }
    /**
     * @see View:defaultSettings
     * @type {Object}
     */
    get defaultSettings() {
        return extend(true, super.defaultSettings, {
            name: 'default',
            views: [],
            view: ''
        });
    }
    /**
     * @param  {Array} views [description]
     */
    setViews(views) {
        this.settings.views = views;
        this.switchView(views[0].view);
    }
    /**
     * @param {String} type
     */
    switchView(view, target = null) {
        this.publishEvent(`listing:${this.settings.name}:switch-view`, view);
        this.settings.view = view;
    }
}
