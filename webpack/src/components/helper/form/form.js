import { inject, NewInstance } from 'aurelia-framework';
import { validateTrigger, ValidationController, ValidationRules } from 'aurelia-validation';

import { excludes, traits } from 'traits-decorator';

import { Component } from 'features/views/component';
import { extend } from 'features/utils';
import { Form } from 'features/traits/form';


/**
 * Component Helper for Forms
 *
 * For full aurelia-validation documentation, please read:
 * http://aurelia.io/hub.html#/doc/article/aurelia/validation/latest/validation-basics/2
 */
@inject(NewInstance.of(ValidationController))
@traits(Form)
export class ComponentHelperForm extends Component {
    /**
     * @see View::overrideSettingsKey
     */
    overrideSettingsKey = 'components.helper-form';
    /**
     * @see Base::constructor()
     * @see View::constructor()
     * @param {ValidationController} validationController
     */
    constructor(validationController, ...args) {
        super(...args);

        this.validationController = validationController;
        this.validationController.validateTrigger = validateTrigger.changeOrBlur;
    }
    /**
     * @see View::attached()
     */
    attached() {
        // signal form has been attached
        this.events.publish(`form:${this.settings.name}:attached`, this);
    }
    /**
     * @see View::defaultSettings()
     * @return {Object}
     */
    get defaultSettings() {
        return extend(true, super.defaultSettings, {
            styles: {
                labelAsCol: 'col-md-3', // for form-horizontal, size of label
                inputAsCol: 'col-md-9'  // for form-horizontal, size of element container
            },
            name: 'default'
        })
    }
    /**
     * @see View::detached()
     */
    detached() {
        super.detached();
        // signal form has been detached
        this.events.publish(`form:${this.settings.name}:detached`, this);
    }
    /**
     * @return {Array<*>}
     */
    getData() {
        let data = {};
        this.formConfig().forEach(input => data[input.name] = this[input.name]);
        return data;
    }
    /**
     * @see View::init()
     */
    init() {
        super.init();
        // init validation if method exists
        if (typeof this.applyValidationRules === 'function') {
            this.applyValidationRules();
        }
        // validate at request
        this.subscribeEvent(`form:${this.settings.name}:validate`, () => this.validate());
        // publish form passed init
        this.events.publish(`form:${this.settings.name}:init`, this);
    }
    /**
     * [setData description]
     * @method setData
     * @param  {Object} object [description]
     */
    setData(object) {
        this.formConfig().forEach(input => this[input.name] = object[input.name]);
    }
    /**
     * Validate method.
     */
    async validate() {
        const RESULT = await this.validationController.validate();
        console.log('validate', RESULT, this.getData());
        if (RESULT.valid) {
            this.events.publish(`form:${this.settings.name}:validated`, this);
            return;
        }
        this.events.publish(`form:${this.settings.name}:invalid`);
    }
}
