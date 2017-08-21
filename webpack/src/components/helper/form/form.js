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
     * @see View:defaultSettings
     */
    defaultSettings = {
        style: '',    // component's style - list of classes add to the component to be able to format it.
        styles: {     // set of classes that can be used throughout different sections of the component
            labelAsCol: 'col-md-3',
            inputAsCol: 'col-md-9'
        },

        content: {},  // translation keys for different text/html components in the template

        service: {},  // possible service settings for component
        services: {}, // possible services settings for component

        name: 'default'
    };
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
     * @see View::detached()
     */
    detached() {
        super.detached();
        this.events.publish(`form:${this.settings.name}:detached`, this);
    }
    /**
     * Obtain
     * @param  {[type]}       input [description]
     * @return {[type]}             [description]
     */
    getBindingName(input, index = 0) {
        return input.name || this.getInputName(input, index);
    }
    /**
     * Obtain name for errors variable, for a certain input
     * @param  {Object} input
     * @return {String}
     */
    getBindingErrorsName(input, index = 0) {
        return this.getBindingName(input, index) + 'Errors';
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
     * Calculate a marker for specifying the input is filled in, only for material style.
     * @method materialFilledMarker
     * @param  {Object}  input
     * @return {String}
     */
    materialFilledMarker(input) {
        return (this.isMaterialForm() && input.value) ? 'is-not-empty' : '';
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
        // have errors
        let errors = this[this.getBindingErrorsName(input, index)] && this[this.getBindingErrorsName(input, index)].length;
        // errors = errors && errors.length;
        // have value and value has length
        let value = this.data[this.getBindingName(input, index)] && this.data[this.getBindingName(input, index)].length;
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
