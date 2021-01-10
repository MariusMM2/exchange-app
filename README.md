# exchange-app

This is a simple exchange-rate website where 
a user may convert a price from one currency to 
another currency. The currencies can be either fiat or crypto.

This app is written in Vue.js.

## Currency Support
The website currently uses the following providers:
* https://exchangeratesapi.io/ - 32 fiat currencies
* https://api.binance.com/api/v3/ticker/price - 13 crypto currencies

Additional providers can be added by following the [template](templates/api/TEMPLATE.md).

## Caching
Calls to APIs are cached using the 
[CacheStorage](https://developer.mozilla.org/en-US/docs/Web/API/CacheStorage) Web API.
Its implementation is found at [cache.model.js](src/models/cache.model.js).

## Project setup
```
npm install
```

## Running the website
```
npm run start
```
