export async function fiatRatioToEuro(currency) {
    if (currency === 'EUR') return 1;

    const eurToCurrencyRatio = (await this.apiService.getCustom({symbols: currency}))
        .rates[currency];

    return 1 / eurToCurrencyRatio
}

// eslint-disable-next-line no-unused-vars
export async function cryptoRatioToEuro(currency) {
    return 1;
}