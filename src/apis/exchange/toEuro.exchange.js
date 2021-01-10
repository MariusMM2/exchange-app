import config from "@/app.config.json";

export default async function(currency) {
    if (currency === config.app.defaultCurrencySymbol.toUpperCase()) {
        return 1;
    }

    // noinspection JSUnresolvedVariable
    const eurToCurrencyRatio = (await this.apiService.getCustom({symbols: currency}));

    return eurToCurrencyRatio
        ? 1 / eurToCurrencyRatio["rates"][currency]
        : 1;
}