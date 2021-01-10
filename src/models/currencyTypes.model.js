import CurrencyService from "@/services/currency.service";
import currencies from "@/apis/setup";

class CurrencyTypesModel {
    types = {}

    constructor() {
        for (const currencyType of currencies.apis) {
            const service = new CurrencyService(
                currencyType.api.name,
                currencyType.api.baseUrl,
                currencyType.api.endpoint
            )

            service.ratioToEuro = currencyType.toEuroFunc;

            this.types[currencyType.id] = new CurrencyType(currencyType.currencies, service, currencyType.defaultSymbol)
        }
    }
}

class CurrencyType {
    constructor(currencies, service, defaultSymbol) {
        this.service = service;
        this.currencies = Object.entries(currencies).sort((a, b) => a[1].localeCompare(b[1]));
        this.currenciesDict = currencies;
        this.defaultSymbol = defaultSymbol;
    }

    isValidCurrency(currencyCode) {
        return this.currenciesDict[currencyCode] !== undefined;
    }

    async getCurrencyRatioToEuro(currencyCode) {
        return this.isValidCurrency(currencyCode)
            && await this.service.ratioToEuro(currencyCode);
    }
}

export default new CurrencyTypesModel();