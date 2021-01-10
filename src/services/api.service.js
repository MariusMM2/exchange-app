import CacheModel from "@/models/cache.model";
import {queriedUrl} from "@/utils/url.util";

// noinspection JSUnusedGlobalSymbols
/**
 * Service that provides wrapping methods for api
 * calls, and uses caching wherever possible.
 */
export default class ApiService {
    constructor(name, baseUrl, endpoint) {
        this.name = name;
        this.baseUrl = baseUrl;
        this.endpoint = endpoint;

        this.cache = new CacheModel(this.name);
    }

    /**
     * Retrieves a response to a url endpoint, without
     * any query parameters.
     * @return {Promise<boolean|*>} Response
     */
    async getDefault() {
        return await this.getCustom();
    }

    /**
     * Retrieves a response to a url endpoint, using
     * the provided query parameters.
     * @param queryParams Query parameters used for the api call
     * @return {Promise<boolean>} Response
     */
    async getCustom(queryParams) {
        // builds the request url
        const requestUrl = queriedUrl(this.baseUrl + this.endpoint, queryParams);

        // retrieves the response using cache storage
        const cachedResponse = await this.cache.load(requestUrl);

        if (cachedResponse) {
            // if the response was in cache, return it
            return cachedResponse;
        }

        // calls the endpoint and saves the response in cache
        await this.cache.save(requestUrl);

        // returns the cached response
        return await this.cache.load(requestUrl);
    }
}