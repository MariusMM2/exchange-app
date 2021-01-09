import config from "@/app.config.json";
import CurrencyService from "@/services/currency.service";

class FiatService extends CurrencyService {
    async ratioToEuro(currency) {
        if (currency === 'EUR') return 1;

        const eurToCurrencyRatio = (await this.apiService.getCustom({symbols: currency}))
            .rates[currency];

        return 1 / eurToCurrencyRatio;
    }
}

export default new FiatService(
    config.api.fiat.name,
    config.api.fiat.baseUrl,
    config.api.fiat.endpoint
);