import config from "@/app.config.json";

export default async function(currency) {
    const symbol = currency + config.app.defaultCurrencySymbol.toUpperCase();

    // noinspection JSUnresolvedVariable
    const currencyToEurRatio = await this.apiService.getCustom({symbol});

    return currencyToEurRatio
        ? currencyToEurRatio["price"]
        : 1;
}