
/**
 *
 */
export class Form {
    bindingElement(input) {
        return this[input.name];
    }
    /**
     * Getter: Obtain the form config for the model
     * @return {[type]}
     */
    formConfig() {
        return (this.settings ? this.settings.inputs : null) || [{ name: 'id', type: 'hidden' }];
    }
    /**
     * @param  {{}} input
     * @return {{}}
     */
    _input(input) {
        // if input already formed, just return it
        if (input.__formed__) {
            return input;
        }
        // throw error if input has no name
        if (!input.name) {
            throw Error(`Form '#${this.settings.name}' has inputs without name property. Please fix before advancing.`);
        }
        // render input id
        input.id = `${input.id || input.name}-${this.__uuid}`;
        // property -> determine whether input is filled or not
        Object.defineProperty(input, 'isFilled', {
            get: () => {
                return this[input.name] && (new String(this[input.name])).length > 0;
            }
        });
        // property -> determine or set the validation errors
        Object.defineProperty(input, 'validationErrors', {
            get: () => {
                return this[`${input.name}Errors`] ||  [];
            },
            set: (value) => {
                this[`${input.name}Errors`] = value;
            }
        });
        // property -> determine the validation style
        Object.defineProperty(input, 'validationStyle', {
            get: () => {
                return this.validationStyle(input);
            }
        });
        // property -> determine or set the binded value -> NOT USED
        // Object.defineProperty(input, 'bindValue', {
        //     get: () => {
        //         return this[input.name];
        //     },
        //     set: (value) => {
        //         this[input.name] = value;
        //     }
        // });

        // mark as formed and return
        input.__formed__ = true;
        return input;
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
        return this.settings.style && this.settings.style.indexOf('form-horizontal') > -1;
    }
    /**
     * Determine whether the form has 'form--material' style or not.
     * @return {Boolean}
     */
    isMaterialForm() {
        // console.log(((this.settings || {}).style || '').indexOf('form--material'))
        return ((this.settings || {}).style || '').indexOf('form--material') > -1;
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
    validationStyle(input) {
        // test whether there are rules to validate the field
        let ruleFilter = (item) => item.property && item.property.name === input.name;
        let setFilter = (set) => set.length > 0 && set.filter(ruleFilter).length > 0;
        // and return only the input style
        if (!this.__rules__ || !this.__rules__.filter(setFilter).length) {
            return input.style || '';
        }
        // validation class name
        let validationClass = '';
        // if filled in and no errors
        if (input.isFilled && !input.validationErrors.length) {
            validationClass = 'is-valid';
        }
        // if errors
        if (input.validationErrors.length) {
            validationClass = 'is-error';
        }
        return `${input.style || ''} ${validationClass}`;
    }
}
