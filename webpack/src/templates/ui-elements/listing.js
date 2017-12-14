import {Template} from 'features/views/template';
import { extend } from 'features/utils';

export class TemplateListing extends Template {
    /**
     * @see ModelView::overrideSettingsKey
     */
    overrideSettingsKey = 'templates.listing';
    /**
     * @see View::defaultSettings()
     * @return {Object}
     */
    get defaultSettings() {
        return extend(true, super.defaultSettings, {
            pageTitle: {
                content: {
                    title: 'Listing'
                }
            }
        });
    }
}
