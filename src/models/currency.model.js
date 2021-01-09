export default class CurrencyModel {
    constructor(currencies, service) {
        this.service = service;
        this.currencies = Object.entries(currencies).sort((a, b) => a[1].localeCompare(b[1]));
        this.currenciesDict = currencies;
    }

    isValidCurrency(currencyCode) {
        return this.currenciesDict[currencyCode] !== undefined;
    }

    async getCurrencyRatioToEuro(currencyCode) {
        return this.isValidCurrency(currencyCode)
            && await this.service.ratioToEuro(currencyCode);
    }
}