import {inject, NewInstance} from 'aurelia-framework';
import {validateTrigger, ValidationController, ValidationRules} from 'aurelia-validation';

import {Component} from 'features/views/component';
import {extend} from 'features/utils';

/**
 * Component Helper for Forms
 *
 * For full aurelia-validation documentation, please read:
 * http://aurelia.io/hub.html#/doc/article/aurelia/validation/latest/validation-basics/2
 */
@inject(NewInstance.of(ValidationController))
export class ComponentHelperForm extends Component {
    /**
     * @see View::overrideSettingsKey
     */
    overrideSettingsKey = 'components.helper-table';
    /**
     * @see Base::constructor()
     * @see View::constructor()
     * @param {any} validationController
     */
    constructor(validationController, ...args) {
        super(...args);

        this.validationController = validationController;
        this.validationController.validateTrigger = validateTrigger.change;

        this.data = {};
    }
    /**
     * @see View::attached()
     */
    attached() {
        this.validationController.validate();
        this.events.publish(`form:${this.settings.name}:attached`, this);

        // ValidationRules
        //     .ensure('firstName').displayName('firstName')
        //     .required()
        //     .ensure('text').displayName('Text Input')
        //     .required()
        //     .ensure('email').displayName('Email Input')
        //     .email().withMessage(`\${$displayName} must be an email.`)
        //     .required()
        //     // .on(form);
        //     .on(this.data);
    }
    /**
     * Obtain name for errors variable, for a certain input
     * @param  {Object} input
     * @return {String}
     */
    bindingErrorsName(input, index = 0) {
        return this.bindingName(input, index) + 'Errors';
    }
    /**
     * Calculate a marker for specifying the input is filled in, only for material style.
     * @method materialFilledMarker
     * @param  {Object}  input
     * @return {String}
     */
    bindingFilledMarker(input, index = 0) {
        // get input binding name
        const bindingName = this.bindingName(input, index);
        // obtain a getter name for our property
        const bingingNameIsFilled = bindingName + 'IsFilled';
        // find out if it already has descriptors
        const propertyDescriptor = Object.getOwnPropertyDescriptor(this, bingingNameIsFilled);
        // if so... leave it alone
        if (propertyDescriptor && propertyDescriptor.get) {
            return bingingNameIsFilled;
        }
        // create the descriptor for the getter
        Object.defineProperty(this, bingingNameIsFilled, {
            get: function() {
                return (this.data[bindingName] && (new String(this.data[bindingName])).length) ? 'is-not-empty' : '';
            }
        });
        return bingingNameIsFilled;
    }
    /**
     * Obtain
     * @param  {[type]}       input [description]
     * @return {[type]}             [description]
     */
    bindingName(input, index = 0) {
        return input.name || this.getInputName(input, index);
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
        this.events.publish(`form:${this.settings.name}:detached`, this);
    }
    /**
     * Obtain a generig id for a certain input.
     * @param  {Number}   index
     * @return {String}
     */
    getInputId(index = 0) {
        return `input-${index}-${this.__uuid.toString()}`
    }
    /**
     * Define the name for a certain input.
     * @param  {Object} input
     * @param  {Number} index
     * @return {String}
     */
    getInputName(input, index = 0) {
        let name = input.name ? input.name : 'input';
        name = `${name}-${index}-${this.__uuid.toString()}`;
        if (input.type === 'checkbox') {
            name = `${name}[]`
        }
        return name;
    }
    /**
     * @see View::init()
     */
    init() {
        super.init();
        this.subscribeEvent(`form:${this.settings.name}:validate`, () => this.validate());
        this.events.publish(`form:${this.settings.name}:init`, this);
    }
    /**
     * Getter: Calculate style for input div wrapper.
     * @return {String}
     */
    get inputStyle() {
        return this.isHorizontalForm() ? this.settings.styles.inputAsCol : '';
    }
    /**
     * [isTextarea description]
     * @param {Object}  input
     * @return {Boolean}
     */
    isCheckable(input) {
        return /checkbox|radio/.test(input.type)
    }
    /**
     * [isComponent description]
     * @param {Object}  input
     * @return {Boolean}
     */
    isComponent(input) {
        return input.type === 'component';
    }
    /**
     * Determine whether the form has 'form-horizontal' style or not.
     * @return {Boolean}
     */
    isHorizontalForm() {
        return this.style.indexOf('form-horizontal') > -1;
    }
    /**
     * Determine whether the form has 'form--material' style or not.
     * @return {Boolean}
     */
    isMaterialForm() {
        return this.style.indexOf('form--material') > -1;
    }
    /**
     * [isTextarea description]
     * @param {Object}  input
     * @return {Boolean}
     */
    isSelect(input) {
        return input.type === 'select';
    }
    /**
     * [isTextarea description]
     * @param {Object}  input
     * @return {Boolean}
     */
    isTextarea(input) {
        return input.type === 'textarea';
    }
    /**
     * [isTextInput description]
     * @param {Object}  input
     * @return {Boolean}
     */
    isTextInput(input) {
        return input.type === ''
            || input.type === null
            || input.type === undefined
            || /^(color|date(time-local)?|email|image|month|number|password|range|search|te(l|xt)|time|url|week)$/.test(input.type);
    }
    /**
     * Getter: Calculate style for label.
     * @return {[type]}
     */
    get labelStyle() {
        return this.isHorizontalForm() ? this.settings.styles.labelAsCol : ''
    }
    /**
     * Validate method.
     */
    async validate() {
        const RESULT = await this.validationController  .validate();
        console.log('validating', RESULT, this.data);
        if (RESULT.valid) {
            this.events.publish(`form:${this.settings.name}:validated`, this.data);
            return;
        }
        this.events.publish(`form:${this.settings.name}:invalid`);
    }
    /**
     *
     */
    validationStyle(input, index) { //, errors, value) {
        let bindingName = this.bindingName(input, index);
        let bindingErrorsName = this.bindingErrorsName(input, index);
        // test whether there are rules to validate the field
        let ruleFilter = (item) => item.property && item.property.name === bindingName;
        let setFilter = (set) => set.filter(ruleFilter).length;
        if (!this.data.__rules__ || !this.data.__rules__.filter(setFilter).length) {
            return input.style || '';
        }
        // have errors
        let errors = this[bindingErrorsName] && this[bindingErrorsName].length;
        // errors = errors && errors.length;
        // have value and value has length
        let value = this.data[bindingName] && this.data[bindingName].length;
        // value = value && value.length;
        // validation class name
        let validationClass = '';
        // if filled in and no errors
        if (value && !errors) {
            validationClass = 'is-valid';
        }
        // if errors
        if (errors) {
            validationClass = 'is-error';
        }
        return `${input.style || ''} ${validationClass}`;
    }
}
