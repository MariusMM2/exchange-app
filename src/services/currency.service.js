import ApiService from "@/services/api.service";

/**
 * Service that uses ApiService
 * to generate a ratio to the Euro for any currency.
 */
export default class CurrencyService {
    constructor(name, baseUrl, endpoint) {
        // noinspection JSUnusedGlobalSymbols
        this.apiService = new ApiService(name, baseUrl, endpoint);
    }

    /**
     * Retrieves the ratio to the Euro for a given
     * currency symbol.
     * @param currency Symbol to convert to the Euro
     * @return {Promise<number>} ratio to the Euro
     * @abstract
     */
    // eslint-disable-next-line no-unused-vars
    async ratioToEuro(currency) {}
}