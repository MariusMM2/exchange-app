import myproviderCurrencies from "./myprovider/currencies.myprovider.json";
import myproviderToEuro from "./myprovider/toEuro.myprovider";

/**
 * A template provider. This should be manually appended to the list in
 * apis/providers.js
 */
export default [
    {
        "id": "myprovider",
        "name": "My Provider",
        "api": {
            "name": "myproviderapi",
            "baseUrl": "https://api.template.io",
            "endpoint": "/today"
        },
        "defaultSymbol": "foo",
        "currencies": myproviderCurrencies,
        "toEuroFunc": myproviderToEuro,
    }
];