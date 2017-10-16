
/**
 *
 */
export class Form {
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
                return (this[bindingName] && (new String(this[bindingName])).length) ? 'is-not-empty' : '';
            }
        });
        return bingingNameIsFilled;
    }
    /**
     * Obtain
     * @param  {Object} input
     * @return {Number}
     */
    bindingName(input, index = 0) {
        return input.name || this.getInputName(input, index);
    }
    /**
     * Getter: Obtain the form config for the model
     * @return {[type]}
     */
    formConfig() {
        return [{ name: this.__proto__.INDEX_NAME, type: 'hidden' }];
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
     * Getter: Calculate style for input div wrapper.
     * @return {String}
     */
    inputStyle() {
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
        return this.style && this.style.indexOf('form-horizontal') > -1;
    }
    /**
     * Determine whether the form has 'form--material' style or not.
     * @return {Boolean}
     */
    isMaterialForm() {
        return this.style && this.style.indexOf('form--material') > -1;
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
    labelStyle() {
        return this.isHorizontalForm() ? this.settings.styles.labelAsCol : ''
    }
    /**
     * @param {String} input
     * @param {Number} index
     */
    validationStyle(input, index) { //, errors, value) {
        let bindingName = this.bindingName(input, index);
        let bindingErrorsName = this.bindingErrorsName(input, index);
        // test whether there are rules to validate the field
        let ruleFilter = (item) => item.property && item.property.name === bindingName;
        let setFilter = (set) => set.filter(ruleFilter).length;
        if (!this.__rules__ || !this.__rules__.filter(setFilter).length) {
            return input.style || '';
        }
        // have errors
        let errors = this[bindingErrorsName] && this[bindingErrorsName].length;
        // errors = errors && errors.length;
        // have value and value has length
        let value = this[bindingName] && this[bindingName].length;
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
