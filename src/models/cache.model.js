/**
 * Model class used to store and retrieve
 * Request-Response entries from CacheStorage.
 */
export default class CacheModel {
    constructor(name) {
        this.name = name;
        this.cacheName = 'exchange-api-' + this.name;
    }

    /**
     * Calls the url and saves its results in CacheStorage
     * @param {string} url Url to call
     */
    async save(url) {
        const cacheStorage = await caches.open(this.cacheName);
        await cacheStorage.add(url);
    }

    /**
     * Retrieves a response from CacheStorage
     * using the provided url.
     * @param url Url used for retrieval
     * @return {Promise<boolean|any>} response object if found, false otherwise
     */
    async load(url) {
        const cacheStorage = await caches.open(this.cacheName);
        const cachedResponse = await cacheStorage.match(url);

        if (!cachedResponse || !cachedResponse.ok) {
            return false;
        }

        return await cachedResponse.json();
    }
}