import { Container } from 'aurelia-dependency-injection';
import { Config } from 'aurelia-api';

/**
 * Abstract TRAIT for REST api
 * @abstract
 */
export class RESTable {
    settleEndpoint(name = 'rest') {
        this.endpoint = this.getEndpoint(name);
    }
    getEndpoint(name = 'rest') {
        return Container.instance.get(Config).getEndpoint(name);
    }
}

export class RESTableApollo extends RESTable {

}
