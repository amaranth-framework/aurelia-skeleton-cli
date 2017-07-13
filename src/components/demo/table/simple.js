import {ComponentHelperTable} from 'components/helper/table/table';

export class ComponentTableDemoSimple extends ComponentHelperTable {
	/**
	 * @see View:defaultSettings
	 */
	defaultSettings = {
		style: '',                 // component's style - list of classes add to the component to be able to format it.
		styles: {},                // set of classes that can be used throughout different sections of the component

		content: {},               // translation keys for different text/html components in the template

		service: 'general.json',   // possible service settings for component
		services: {}               // possible services settings for component
	};
	/**
	 * @see View::overrideSettingsKey
	 */
	overrideSettingsKey = 'components.table-demo-simple';
	/**
	 * @see View::init()
	 */
	init() {
		super.init();
		this.logger.debug('View service: ', this.settings.service);
		this.setTableLoading();
		setTimeout(() => {
			if (this.settings.service && (typeof this.settings.service === 'string' || this.settings.service.endpoint !== undefined)) {
				let args = [
					(typeof this.settings.service === 'string') ? this.settings.service : this.settings.service.endpoint,
					(typeof this.settings.service === 'string') ? {} : this.settings.service.params
				];
				this.logger.debug('Calling service: ', this.settings.service.method || 'find', args);
				this.rest.find.apply(this.rest, args)
					.then((result) => {
						this.logger.debug('service result', result);
						this.thead = ['#', 'Name', 'Age', 'Email', 'Company', 'Balance'];
						this.tbody = result.map((_, i) => [
							_.index,
							`${_.name.first} ${_.name.last}`,
							_.age,
							_.email,
							_.company,
							_.balance
						]);
						this.setTableLoaded();
						this.logger.debug('thead', this.thead);
						this.logger.debug('tbody', this.tbody);
					})
					.catch((error) => this.logger.warn('service failed', error));
			}
		}, 1000)
	}
}
