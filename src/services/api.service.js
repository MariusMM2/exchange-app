import CacheService from "@/services/cache.service";
import {queriedUrl} from "@/utils/url.util";

export default class ApiService {
    constructor(name, baseUrl, endpoint) {
        this.name = name;
        this.baseUrl = baseUrl;
        this.endpoint = endpoint;

        this.cache = new CacheService(this.name);
    }

    async getDefault() {
        return this.getCustom();
    }

    async getCustom(queryParams) {
        const requestUrl = queriedUrl(this.baseUrl + this.endpoint, queryParams);

        const cachedResponse = await this.cache.load(requestUrl);

        if (cachedResponse) {
            return cachedResponse;
        }

        await this.cache.save(requestUrl);

        return await this.cache.load(requestUrl);
    }
}