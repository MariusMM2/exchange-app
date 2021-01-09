import axios from 'axios';
import CacheService from "@/services/cache.service";
import {queriedUrl} from "@/utils/url.util";

export default class ApiService {
    _axiosInstance = axios.create({});

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

        const cachedData = await this.cache.load(requestUrl);

        if (cachedData) {
            return cachedData;
        }

        try {
            const response = await this._axiosInstance.get(requestUrl);

            await this.cache.save(requestUrl, response.data);

            return response.data;
        } catch (e) {
            if (e.response) {
                if (e.response.status === 404) {
                    return 0;
                }
                else {
                    console.log(e);
                }
            } else {
                console.log(e);
            }
        }
    }
}