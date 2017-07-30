import { ApolloClient as Client, createNetworkInterface } from 'apollo-client';
import {SubscriptionClient, addGraphQLSubscriptions} from 'subscriptions-transport-ws';
import gql from 'graphql-tag';

import { GraphQLClient } from './graphql';

/**
 * Apollo Interpretation of GraphQL Client
 * @link https://github.com/apollographql/apollo-client
 */
export class ApolloClient extends GraphQLClient {
    /**
     * Create ApoloClient as GraphQL Client
     *
     * @param  {HTTPFetchNetworkInterface|null}  networkInterface
     * @return {Client}
     */
    getEndpoint(uri, options = {}, networkInterface = null) {
        return new Client({
            networkInterface: networkInterface ? networkInterface : this.createNetworkInterface(uri, options),
        });
    }
    getEndpointWithWS(http, ws) {
        return new Client({
            networkInterface: this.createNetworkInterfaceWithSubscriptions(http, ws)
        });
    }
    /**
     * Create apollo network interface with the default handler.
     *
     * @param  {String}  uri
     * @param  {Object}  options
     * @return {HTTPFetchNetworkInterface}
     */
    createNetworkInterface(uri, options = {}) {
        options.uri = uri;
        return createNetworkInterface(options);
    }
    /**
     * [createNetworkInterfaceWithSubscriptions description]
     *
     * @param  {[type]}                                http [description]
     * @param  {[type]}                                ws   [description]
     * @return {[type]}                                     [description]
     */
    createNetworkInterfaceWithSubscriptions(http, ws) {
        return addGraphQLSubscriptions(
           this.createNetworkInterface(http),
           this.createWSClient(ws)
       );
    }
    static DEFAULT_WS_CLIENT_OPTIONS = {
        reconnect: true,
        connectionParams: {
            // Pass any arguments you want for initialization
        }
    };
    /**
     * [createWSClient description]
     *
     * @param  {[type]}       uri
     * @param  {[type]}       options
     * @return {[type]}
     */
    createWSClient(uri, options = ApolloClient.DEFAULT_WS_CLIENT_OPTIONS) {
        return new SubscriptionClient(uri, options);
    }

}
