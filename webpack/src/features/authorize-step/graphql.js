import { AuthorizeStepJWT } from './authorize-step';

/**
 *
 */
export class GraphQL extends AuthorizeStepJWT {
    /**
     * @see AuthorizeStep::login()
     */
    async login(user, pass) {
        this.logger.debug('login()', user, pass);
        try {
            let endpoint = await this.getGraphQLEndpoint();
            let data = await endpoint.query({
                query: endpoint.tag(`{
                    AuthToken(strategy: "local", email: "${user}", password: "${pass}") {
                        accessToken
                    }
                }`)
            });
            this.logger.debug('login()/endpoint.query()', data);
            this.sessionStore(data.data.AuthToken.accessToken);
            this.getUser();
            this.router.navigateToRoute('dashboard');
        } catch (e) {
            this.logger.error('login()/endpoint.query()', e);
            // @TODO: messg('')
        }
    }
    /**
     * @see AuthorizeStep::isLoggedIn
     */
    get isLoggedIn() {
        // @TODO: The result of the return may not always be accurate
        return (this.sessionDecoded ? true : false) &&
            (this.sessionDecoded.exp > Math.trunc((new Date()).getTime() / 1000));
    }
    /**
     * Obtain logged in user
     * @return {Promise}
     */
    async getUser() {
        if (!this._user) {
            let endpoint = await this.getGraphQLEndpoint();
            let data = await endpoint.query({
                query: endpoint.tag(`{
                    User(id: "${this.sessionDecoded.userId}") {
                        name
                        email
                        type
                    }
                }`)
            });
            this.logger.debug('authStep.getUser', data);
            this._user = data.data.User
        }
        return this._user;
    }
}
