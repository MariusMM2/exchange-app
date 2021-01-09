import ApiService from "@/services/api.service";

export default class CurrencyService {
    constructor(name, baseUrl, endpoint) {
        this.apiService = new ApiService(name, baseUrl, endpoint);
    }

    // eslint-disable-next-line no-unused-vars
    async ratioToEuro(currency) {}
}