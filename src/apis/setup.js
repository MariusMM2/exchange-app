import exchangeCurrencies from "@/apis/exchange/currencies.exchange.json";
import exchangeToEuro from "@/apis/exchange/toEuro.exchange";
import binanceCurrencies from "@/apis/binance/currencies.binance.json";
import binanceToEuro from "@/apis/binance/toEuro.binance";

export default {
    apis: [
        {
            "id": "exchange",
            "name": "Fiat",
            "api": {
                "name": "exchangeratesapi",
                "baseUrl": "https://api.exchangeratesapi.io",
                "endpoint": "/latest"
            },
            "defaultSymbol": "eur",
            "currencies": exchangeCurrencies,
            "toEuroFunc": exchangeToEuro,
        },
        {
            "id": "binance",
            "name": "Crypto",
            "api": {
                "name": "binance",
                "baseUrl": "https://api.binance.com/api/v3",
                "endpoint": "/ticker/price"
            },
            "defaultSymbol": "btc",
            "currencies": binanceCurrencies,
            "toEuroFunc": binanceToEuro,
        }
    ]
};