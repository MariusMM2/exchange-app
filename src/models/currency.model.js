import * as fiatCurrencies from "@/utils/fiat.currencies.json";
import * as cryptoCurrencies from "@/utils/crypto.currencies.json";
import FiatService from "@/services/fiat.service";
import CryptoService from "@/services/crypto.service";

class CurrencyModel {
    constructor(currencies, service) {
        this.service = service;
        this.currenciesDict = currencies;
        this.currencies = Object.entries(currencies);
    }

    isValidCurrency(currencyCode) {
        return this.currenciesDict[currencyCode] !== undefined;
    }

    getCurrencyRatioToEuro(currencyCode) {
        return this.isValidCurrency(currencyCode)
            && this.service.ratioToEuro(currencyCode);
    }
}

export const FiatCurrencyModel = new CurrencyModel(fiatCurrencies.default, FiatService);

export const CryptoCurrencyModel = new CurrencyModel(cryptoCurrencies.default, CryptoService);