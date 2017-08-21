import { inject } from 'aurelia-framework';

import { Base } from 'features/base';
import { extend } from 'features/utils';

/**
 * Abstract Class for all Model Views (Components) used within the project
 *
 * @link https://www.danyow.net/inversion-of-control-with-aurelia-part-1/
 */
export class View extends Base {
    /*************************************************************************************
     * Inherited
     *************************************************************************************/
    /**
     * Implement this hook if you want to perform custom logic just before your view-model is displayed. You can
     * optionally return a promise to tell the router to wait to bind and attach the view until after you finish your
     * work.
     * Forms to call:
     * @method activate(model: Object) for components
     * @method activate(params: Object, routeConfig: Object, navigationInstruction: NavigationInstruction) for page templates
     */
    activate(...args) {
        // parse module variable
        if (args.length === 1) {
            let model = args.shift();

            for (let p in model) {
                this[p] = model[p];
            }
        }
        // parse template params
        if (args.length > 1) {
            // Save params
            this.params = args.shift();
            // Save routeConfig
            this.routeConfig = args.shift();
            // Save navigationInstruction
            this.navigationInstruction = args.shift();
            // obtain settings from routeConfig variable
            this.settings = this.routeConfig ? this.routeConfig.settings : {};
        }

        this.mergeSettings();

        this.events.subscribeOnce('session:ready', result => !this.initialized ? this.init() : false);

        if (!this.initialized) {
            this.init();
        }
    }
    /**
     * Invoked when the view that contains the extension is attached to the DOM.
     * @method attached
     */
    /**
     * Invoked when the databinding engine binds the view. The binding context is the instance that the view is
     * databound to.
     * @method bind
     * @param   {Object}  bindingContext
     * @param   {Object}  overrideContext?
     * @param   {Boolean} _systemUpdate? default true
     * @returns {void}
     */
    bind(bindingContext, overrideContext) {
        // obtain view parent
        this.parent = overrideContext.parentOverrideContext.bindingContext;
    }
    /**
     * Implement this hook if you want to control whether or not your view-model can be navigated to. Return a boolean
     * value, a promise for a boolean value, or a navigation command.
     * @method canActivate
     * @param {Object} params
     * @param {Object} routeConfig
     * @param {Object} navigationInstruction
     */
    /**
     * Implement this hook if you want to control whether or not the router can navigate away from your view-model when
     * moving to a new route. Return a boolean value, a promise for a boolean value, or a navigation command.
     * @method canDeactivate
     */
    /**
     * Implement this hook if your view-model needs to translating url changes into application state.
     * @method configureRouter
     * @param {Object} config
     * @param {Router} router
     */
    /**
     * Invoked once the component is created...
     * @method created
     * @param {View} view
     */
    /**
     * Invoked when the view that contains the extension is detached from the DOM.
     */
    detached() {
        this.disposeEvents();
    }
    /**
     * Invoked when the databinding engine unbinds the view.
     * @method unbind
     */
    /*************************************************************************************
    * Amaranth
    *************************************************************************************/
    /**
     * Default View Settings. Can be null
     * @type {Object|null}
     * @var defaultSettings;
     */
    /**
     * Override Settings Key.
     * If using 'aurelia-configuration', this key will be used to extract over writing settings from application config.
     * @type {String}
     * @var overrideSettingsKey;
     */
    /**
     * Specific init function for each model view. AbstravView will call it at the end of the activate method.
     * Generaly this method may be async.
     * @method init
     */
    init() {
        // this.rest = this.gql.getEndpoint(`http://ws-test.${window.location.hostname}:3030/`);
        // this.rest = api.getEndpoint(`ws://${window.location.hostname}:8443/graphql`, {}, api.createSubscriptionClient());;
    }
    /**
     * Merge settings
     * @method mergeSettings
     */
    async mergeSettings() {
        this.settings = this.settings || {};
        // in case a `defaultSettings` object exists, merge the `settings` object passed by @model ofer the default settings.
        if (this.defaultSettings) {
            // this.logger.debug('ModelView::mergeSettings => overrideSettingsKey: ', this.overrideSettingsKey);
            // this.logger.debug('ModelView::mergeSettings => defaultSettings: ', extend({}, this.modelDefaultSettings || {}), this.defaultSettings);
            let defaultSettings = extend(true, this.modelDefaultSettings || {}, this.defaultSettings || {});
            delete this.modelDefaultSettings;
            // this.logger.debug('ModelView::mergeSettings => settings split:', defaultSettings, this.overrideSettings, extend({}, this.settings || {}));
            this.settings = extend(
                true,                               // recursive merge
                {},                                 // cloning into a new object
                defaultSettings,                    // default settings provided by class definition
                this.overrideSettings,              // global settings provided by config.json
                this.settings,                      // settings obtained from application route
                // settings provided by config file mentioned in `_settingsPath`
                (this.settings && this.settings._settingsPath) ?
                await this.configApi.get(`${this.settings._settingsPath}.json`) : {}
            );
            // this.logger.debug('ModelView::mergeSettings => settings:', this.settings);
        }
    }
    /**
     * Convert View to string
     * @return {String}
     */
    toString() {
        return `view@${this.__uuid}`;
    }
    /**
     * Getter for component override settings. This settings should globaly override settings defined in a component's
     * `defaultSettings` variable. If the override settubgs do not exists, it will return an empty object.
     * @method overrideSettings
     * @return {Object}
     */
    get overrideSettings() {
        if (!this.overrideSettingsKey || this.overrideSettingsKey.length === 0) {
            throw new Error(`Class '${className(this)}' has no 'overrideSettingsKey' defined.`);
        }
        if (!this._overrideSettings) {
            this._overrideSettings = this.config.get(this.overrideSettingsKey) || {};
        }
        // this.logger.debug('defaultOverrideSettings: ', this._defaultOverrideSettings);
        return this._overrideSettings;
    }
    /**
     * Getter for concatenating component style/bind
     * @method style
     * @return {String}
     */
    get style() {
        return `${this.settings.style || ''} ${this.settings.layout || ''}`;
    }
}
