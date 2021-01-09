import config from "@/app.config.json";
import CurrencyService from "@/services/currency.service";

class CryptoService extends CurrencyService {
}

export default new CryptoService(
    config.api.crypto.name,
    config.api.crypto.baseUrl,
    config.api.crypto.endpoint
);