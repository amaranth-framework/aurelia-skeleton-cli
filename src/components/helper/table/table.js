import {Component} from 'features/views/component';

import Chance from 'chance';

export class ComponentHelperTable extends Component {
    /**
     * @see View:defaultSettings
     */
    defaultSettings = {
        style: '',    // component's style - list of classes add to the component to be able to format it.
        styles: {},   // set of classes that can be used throughout different sections of the component

        content: {},  // translation keys for different text/html components in the template

        service: {},  // possible service settings for component
        services: {}  // possible services settings for component
    };
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
	exportToCSV() {
		let csv = [this.thead.join(',')];
		this.tbody.forEach((row, i) => csv.push(row.join(',')));
		csv = csv.join('\n');
		this.logger.debug('table-csv-gernerate', csv);
		window.location.href=`data:text/csv;charset=UTF-8,${csv}`;
	}
}
