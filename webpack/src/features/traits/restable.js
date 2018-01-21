import { Container } from 'aurelia-dependency-injection';
import { Config } from 'aurelia-api';

/**
 * Abstract TRAIT for REST api
 * @abstract
 */
export class RESTable {
    settleEndpoint(name = 'default') {
        this.endpoint = this.getEndpoint(name);
    }
    getEndpoint(name = 'default') {
        return Container.instance.get(Config).getEndpoint(name);
    }
}
