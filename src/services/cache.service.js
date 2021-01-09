export default class CacheService {
    constructor(name) {
        this.name = name;
        this.cacheName = 'exchange-api-' + this.name;
    }

    /**
     *
     * @param {string} url
     * @returns {Promise<boolean|*>}
     */
    async save(url) {
        const cacheStorage = await caches.open(this.cacheName);
        await cacheStorage.add(url);
    }

    /**
     *
     * @param url
     * @returns {Promise<boolean>}
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