import { View } from 'features/views/view';

export class Template extends View {
    /**
     * @see ModelView:defaultSettings
     * In Template and Component class, this variable is named different because ECMAScript does not suppoer
     * super.property. This artifice needs to be made in order to quit duplicating settings content all over
     * the extending classes.
     * @type {Object}
     */
    modelDefaultSettings = {
        template: '',       // path to a different template for the View

        style: '',          // classes for page (each class will be added to body element having page- prefix)
        styles: {},         // set of classes that can be used throughout different sections of the template

        content: {},        // translation keys for different text/html components in the template

        service: {},        // possible service settings for templates
        services: {}        // possible services settings for templates
    }
    /**
     * Runs at module activation
     *
     * @param {Object} params Route params for module
     * @param {Object} routeConfig Route configuration
     * @param {Object} navigationInstruction Route navigation instruction
     *
     * @memberof Template
     */
    activate(params, routeConfig, navigationInstruction) {
        super.activate(params, routeConfig, navigationInstruction);

        // obtain page title
        // this.routeConfig.navModel.setTitle(this.i18n.tr(this.routeConfig.title));

        // used in self::getViewStrategy() for determining ModelView template
        this.routeModuleId = this.routeConfig.moduleId;

        // setting up a style class on the <body> element to be able to style page dependent elements
        const BODY = document.querySelector('body');
        // step one: clear all class names starting with 'page-'
        BODY.className.split(' ').forEach((name) => {
            if (/^page-/.test(name)) {
                document.querySelector('body').className = BODY.className.replace(name, '').trim();
            }
        });
        // step two: add all new classes (if present) prepending 'page-' prefix to each one
        if (this.settings && this.settings.style) {
            this.settings.style.split(' ').forEach((name) => {
                document.querySelector('body').className += ` page-${name}`;
            });
        }
    }
    /**
     * Set default activationStrategy
     *
     * @returns The activation strategy
     *
     * @memberof Template
     */
    determineActivationStrategy() {
        return 'replace';
    }
    /**
     * Get View Strategy (get the template modelView will use)
     * If `this.settings.routeTemplate` is not defined, it will return `routeConfig.moduleId` (which is the default
     * template); otherwise will return the new value.
     *
     * NOTE: Do not add .html in routeTmplate variable, function will concatenate it to the given template by default.
     *
     * @return {String}
     */
    getViewStrategy() {
        this.logger.debug('getViewStrategy', this.routeModuleId, this.settings.template);
        return ((!this.settings || !this.settings.template || typeof this.settings.template !== 'string') ?
            this.routeModuleId : this.settings.template) + '.html';
    }
}
