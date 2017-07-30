import { SubscriptionClient } from 'subscriptions-transport-ws';
import gql from 'graphql-tag';

/**
 *
 */
export class GraphQLClient {
    getEndpoint() {}
    /**
     * Create apollo network interface using 'subscriptions-transport-ws' package.
     * @link https://www.npmjs.com/package/subscriptions-transport-ws#client-browser
     *
     * @param  {String}  uri
     * @param  {Object}  options
     * @return {SubscriptionClient}
     */
    createSubscriptionClient(uri, options = { reconnect: true, }) {
        return new SubscriptionClient(uri, options);
    }
    /**
     * @param  {String} operation
     * @return {Object}
     */
    tag(operation) {
        return gql(operation);
    }
}
