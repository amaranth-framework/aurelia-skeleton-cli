import {validateTrigger, ValidationController, ValidationRules} from 'aurelia-validation';

import messg from 'messg';
import 'messg/index.css';

import {Template} from 'features/views/template';
import {extend} from 'features/utils';

export class TemplateFormsGrid extends Template {
    /**
     * @see ModelView::overrideSettingsKey
     */
    overrideSettingsKey = 'templates.forms-grid';
}
