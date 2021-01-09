import config from "@/app.config.json";
import CurrencyModel from "@/models/currency.model";
import CurrencyService from "@/services/currency.service";
import * as utils from "@/utils/conversion.util";
import fiatCurrencies from "@/generated/fiat.json";
import cryptoCurrencies from "@/generated/crypto.json";

class CurrenciesController {
    models = {}

    constructor() {
        const files = getFiles();
        const convertFuncs = getConvertFunctions();

        for (const currencyType of config.currencyTypes) {
            const file = files[currencyType.id];
            const service = new CurrencyService(
                currencyType.api.name,
                currencyType.api.baseUrl,
                currencyType.api.endpoint
            )

            service.ratioToEuro = convertFuncs[currencyType.id];

            this.models[currencyType.id] = new CurrencyModel(file, service)
        }
    }
}

export default new CurrenciesController();

function getFiles() {
    return {
        "fiat": fiatCurrencies,
        "crypto": cryptoCurrencies,
    }
}

function getConvertFunctions() {
    return {
        "fiat": utils.fiatRatioToEuro,
        "crypto": utils.cryptoRatioToEuro,
    }
}