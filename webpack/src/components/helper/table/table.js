import Chance from 'chance';

import { Component } from 'features/views/component';
import { extend } from 'features/utils';

/**
 *
 */
export class ComponentHelperTable extends Component {
    /**
     * @see View::overrideSettingsKey
     */
    overrideSettingsKey = 'components.helper-table';
    /**
     * Constructor
     */
    constructor(...args) {
        super(...args);

        if (this.buildRandom) {
            this.buildRandom();
        } else {
            let chance = new Chance();
            let random = Math.trunc(Math.random() * 1000) % 10 + 1  ;
            this.thead = ['#'].concat(Array(random).fill().map((_, i) => chance.string({length: 5})));
            this.tbody = Array(random).fill().map((_, i) => {
                return [i].concat(Array(random).fill().map((_, i) => chance.string({length: 5})));
            })
        }
    }
	/**
	 * @see View::activate()
	 */
    activate(...args) {
        super.activate(...args);
        console.log(this.settings);
    }
    /**
     * @see View::defaultSettings()
     * @return {Object}
     */
    get defaultSettings() {
        return extend(true, super.defaultSettings, {
            content: {     // translation keys for different text/html components in the template
                columns: { // columns to be added to the table
                    // '#': '#'
                    // '#': {}
                }
            },
            rows: { // row options
                selectable: true, // whether to add select checkboxes in stead of row ids
                editable: true,   // whether to show te edit button on each row
                removable: true   // whether to show the remov button on each row
            },

        })
    }
    /**
     * Mark table in loading state.
     */
    setTableLoading() {
        this.logger.debug('table-id', this.__uuid.toString(), $(`#table-${this.__uuid}`));
        $(`#table-${this.__uuid}`).addClass('table--loading');
    }
    /**
     * Mark table as data has been loaded. This can be triggered when service has done loading the data.
     */
    setTableLoaded() {
        setTimeout(() => {
            this.logger.debug('table-id', this.__uuid.toString(), $(`#table-${this.__uuid}`));
            $(`#table-${this.__uuid}`).removeClass('table--loading');
        }, 500);
    }
    /**
     * [exportToCSV description]
     * @method exportToCSV
     * @return {[type]}    [description]
     */
    exportToCSV() {
        let csv = [this.thead.join(',')];
        this.tbody.forEach((row, i) => csv.push(row.join(',')));
        csv = csv.join('\n');
        this.logger.debug('table-csv-gernerate', csv);
        window.location.href=`data:text/csv;charset=UTF-8,${csv}`;
    }
}
