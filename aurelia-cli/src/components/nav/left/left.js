import { ComponentHelperContent } from 'components/helper/content/content';

import 'jquery';

/**
 *
 */
export class ComponentNavLeft extends ComponentHelperContent {
    /**
     * @see ModelView:defaultSettings
     */
    defaultSettings = {
        style: '',                 // component's style - list of classes add to the component to be able to format it.
        styles: {},                // set of classes that can be used throughout different sections of the component

        content: {},               // translation keys for different text/html components in the template

        service: {},               // possible service settings for component
        services: {},              // possible services settings for component

        toggle: true,

        components: [
            {
                type: 'left-logo',
                module: 'components/helper/logo/logo'
            },
            {
                type: 'left-profile',
                module: 'models/user/user',
                view: 'models/user/left-profile.html'
            },
            {
                type: 'left-nav',
                module: 'components/nav/nav',
                settings: {
                    content: {
                        title: 'General'
                    },
                    filter: { group: 'left-general', nav: true }
                }
            },
            {
                type: 'left-nav',
                module: 'components/nav/nav',
                settings: {
                    content: {
                        title: 'Forms, Tables & Widgets'
                    },
                    filter: { group: 'left-forms', nav: true }
                }
            }
        ]
    }
    /**
     * @see ModelView::overrideSettingsKey
     */
    overrideSettingsKey = 'components.nav-left';
    /**
     * @see View::init()
     */
    init() {
        super.init();

        if (this.settings.toggle) {
            this.settings.components.push({
                type: 'left-toggle',
                module: 'components/nav/toggle/toggle'
            });
        }

        this.logger.debug('left-nav', this.settings);
    }
    /**
     * @see View::attached()
     */
    attached() {
        this.toggleEvent = this.events.subscribe('nav-left:toggle', () => this.toggle());

        let toggleTimeout = null;
        $('nav-left').on('mouseover', () => {
            $('nav-left .component--left-toggle').addClass('toggle');
            clearTimeout(toggleTimeout);
            toggleTimeout = setTimeout(() => $('nav-left .component--left-toggle').removeClass('toggle'), 3000);
        });
    }
    /**
     * @see View::detached()
     */
    detached() {
        this.toggleEvent.dispose();
    }
}
