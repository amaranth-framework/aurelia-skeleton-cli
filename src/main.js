import {I18N} from 'aurelia-i18n';
import {ValidationMessageProvider} from 'aurelia-validation';

import environment from './environment';

import Backend from 'i18next-xhr-backend';

export function configure(aurelia) {
    aurelia.use
    .standardConfiguration()
    .feature('resources');

    if (environment.debug) {
        aurelia.use.developmentLogging();
    }

    if (environment.testing) {
        aurelia.use.plugin('aurelia-testing');
    }

    aurelia.use
        // .globalResources(['vc/lower', 'vc/upper', 'vc/price'])
        .plugin('aurelia-animator-css')
        .plugin('aurelia-configuration')
        .plugin('aurelia-validation')
        .plugin('aurelia-api', config => {
            config
                .registerEndpoint('api', '/ws/', {
                    credentials: 'same-origin',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .setDefaultEndpoint('api');
        })
        .plugin('aurelia-i18n', (instance) => {
            // register backend plugin
            instance.i18next.use(Backend);
        });

    aurelia.start().then(() => aurelia.setRoot());
}
