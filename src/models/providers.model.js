import CurrencyService from "@/services/currency.service";
import providers from "@/apis/providers";

/**
 * Model that generates the types of currencies using
 * @/apis/providers.js and holds them.
 */
class ProvidersModel {
    // dictionary of the currency types
    providers = {}

    constructor() {
        // loops through the currency api providers
        for (const provider of providers) {
            // creates a new service using the api parameters
            // of the provider
            const service = new CurrencyService(
                provider.api.name,
                provider.api.baseUrl,
                provider.api.endpoint
            )

            // assign the conversion function to the service
            service.ratioToEuro = provider.toEuroFunc;

            // adds a new currency type entry in the dictionary for the current provider
            this.providers[provider.id] = new CurrencyProvider(provider.currencies, service, provider.defaultSymbol)
        }
    }
}

/**
 * Class that holds a type of currency, where
 * type depends on the provider.
 */
class CurrencyProvider {
    constructor(currencies, service, defaultSymbol) {
        this.service = service;
        this.currencies = Object.entries(currencies).sort((a, b) => a[1].localeCompare(b[1]));
        this.currenciesDict = currencies;
        this.defaultSymbol = defaultSymbol;
    }

    /**
     * Checks whether or not a currency code is valid
     * for this provider.
     * @param currencyCode Code to validate
     * @returns {boolean} True if valid, false otherwise
     */
    isValidCurrency(currencyCode) {
        return this.currenciesDict[currencyCode] !== undefined;
    }

    /**
     * Retrieves the ratio to the Euro for the given currency code.
     * @param currencyCode Code to validate and convert
     * @returns {Promise<boolean|*|number>} false if invalid code,
     * undefined for any errors,
     * ratio to the Euro if success.
     */
    async getCurrencyRatioToEuro(currencyCode) {
        return this.isValidCurrency(currencyCode)
            && await this.service.ratioToEuro(currencyCode);
    }
}

export default new ProvidersModel();