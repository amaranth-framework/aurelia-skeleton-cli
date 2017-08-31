import { ComponentHelperTable } from 'components/helper/table/table';
import { User } from 'models/user/user';

import 'bootstrap';

export class ComponentTableDemoSimple extends ComponentHelperTable {
    /**
     * @see View::overrideSettingsKey
     */
    overrideSettingsKey = 'components.listing-users';
    /**
     * [constructor description]
     * @method constructor
     * @param  {[type]}    args [description]
     * @return {[type]}         [description]
     */
    constructor(...args) {
        super(...args);

        this.subscribeEvent('table:edit', (model) => {
            this.router.navigateToRoute('users-edit', { action: 'edit', id: model.id });
        });
        this.subscribeEvent('table:remove', async (model) => {
            let result = await User.remove(model.id);
            $(`.table tr[id=${model.id}]`).animate({ opacity: 0 }, function() { $(this).remove(); });
        });
    }
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
                this.tbody = result.map(_ => {
                    let row = [
                        '#',
                        _.name,
                        _.email,
                        _.address.street,
                        _.company.name,
                        _.phone,
                    ];
                    row.model = _;
                    return row;
                });
                this.setTableLoaded();
            })
            .catch((error) => this.logger.warn('service failed', error));
    }

}
