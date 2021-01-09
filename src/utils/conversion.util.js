import config from "@/app.config.json";

export async function fiatRatioToEuro(currency) {
    if (currency === config.app.defaultCurrencySymbol.toUpperCase()) {
        return 1;
    }

    const eurToCurrencyRatio = (await this.apiService.getCustom({symbols: currency}));

    return eurToCurrencyRatio
        ? 1 / eurToCurrencyRatio["rates"][currency]
        : 1;
}

// eslint-disable-next-line no-unused-vars
export async function cryptoRatioToEuro(currency) {

    const symbol = currency + config.app.defaultCurrencySymbol.toUpperCase();

    const currencyToEurRatio = await this.apiService.getCustom({symbol});

    return currencyToEurRatio
        ? currencyToEurRatio["price"]
        : 1;
}