/**
 * Abstract TRAIT for REST api
 * @abstract
 */
export class RESTable {
    /**
     * Use to set plugin
     * @param  {any} config
     */
    configure(config) {
        this.__config = config;
    }
    /**
     * Set the next enpoint to use.
     * @param  {String|Object} endpoint
     * @return {Promise}
     */
    async endpoint(endpoint = 'rest') {
        if (!this.__rest) {
            if (typeof endpoint === 'string') {
                /**
                 * @link https://aurelia-api.spoonx.org/usage.html
                 * @see aurelia-api/Config::getEndpoint()
                 */
                this.__rest = this.__config.getEndpoint(endpoint);
            } else {
                /**
                 * @link https://aurelia-api.spoonx.org/usage.html
                 * @see aurelia-api/Endpoint::of()
                 */
                this.__rest = endpoint;
            }
        }
        return this.__rest;
    }
    /**
     * @see aurelia-api/Rest::create()
     * @link https://aurelia-api.spoonx.org/api_rest.html
     */
    async restCreate(...args) {
        let endpoint = await this.endpoint();
        return endpoint.create(...args);
    }
    /**
     * @see aurelia-api/Rest::destroy()
     * @link https://aurelia-api.spoonx.org/api_rest.html
     */
    async restDestroy(...args) {
        let endpoint = await this.endpoint();
        return endpoint.destroy(...args);
    }
    /**
     * @see aurelia-api/Rest::destroyOne()
     * @link https://aurelia-api.spoonx.org/api_rest.html
     */
    async restDestroyOne(...args) {
        let endpoint = await this.endpoint();
        return endpoint.destroyOne(...args);
    }
    /**
     * @see aurelia-api/Rest::find()
     * @link https://aurelia-api.spoonx.org/api_rest.html
     */
    async restFind(...args) {
        let endpoint = await this.endpoint();
        return endpoint.find(...args);
    }
    /**
     * @see aurelia-api/Rest::findfindOne()
     * @link https://aurelia-api.spoonx.org/api_rest.html
     */
    async restFindOne(...args) {
        let endpoint = await this.endpoint();
        return endpoint.findOne(...args);
    }
    /**
     * @see aurelia-api/Rest::patch()
     * @link https://aurelia-api.spoonx.org/api_rest.html
     */
    async restPatch(...args) {
        let endpoint = await this.endpoint();
        return endpoint.patch(...args);
    }
    /**
     * @see aurelia-api/Rest::patchOne()
     * @link https://aurelia-api.spoonx.org/api_rest.html
     */
    async restPatchOne(...args) {
        let endpoint = await this.endpoint();
        return endpoint.patchOne(...args);
    }
    /**
     * @see aurelia-api/Rest::post()
     * @link https://aurelia-api.spoonx.org/api_rest.html
     */
    async restPost(...args) {
        let endpoint = await this.endpoint();
        return endpoint.post(...args);
    }
    /**
     * @see aurelia-api/Rest::update()
     * @link https://aurelia-api.spoonx.org/api_rest.html
     */
    async restUpdate(...args) {
        let endpoint = await this.endpoint();
        return endpoint.update(...args);
    }
    /**
     * @see aurelia-api/Rest::updateOne()
     * @link https://aurelia-api.spoonx.org/api_rest.html
     */
    async restUpdateOne(...args) {
        let endpoint = await this.endpoint();
        return endpoint.updateOne(...args);
    }
}
