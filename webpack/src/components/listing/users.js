import { ComponentHelperTable } from 'components/helper/table/table';
import { User } from 'models/user/user';

export class ComponentTableDemoSimple extends ComponentHelperTable {
    /**
     * @see View::overrideSettingsKey
     */
    overrideSettingsKey = 'components.listing-users';
    /**
     * @see View::init()
     */
    async init() {
        super.init();
        this.logger.debug('View service: ', this.settings.service);
        this.setTableLoading();
        User.list()
            .then((result) => {
                this.thead = ['#', 'Name', 'Email', 'Address', 'Company', 'Phone'];
                this.tbody = result.map(_ => [
                    '#',
                    _.name,
                    _.email,
                    _.address.street,
                    _.company.name,
                    _.phone,
                ]);
                this.setTableLoaded();
            })
            .catch((error) => this.logger.warn('service failed', error));
    }
}
