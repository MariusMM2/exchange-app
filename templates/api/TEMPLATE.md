# Template syntax
The files under this folder are meant to be copied inside [apis](/src/apis).

`myprovider` serves as a placeholder for the file names, and it should
be replaced with your own name.

## [myprovider.js](templates/api/myprovider.js) 
Exports an object representing the configuration 
of a provider. 

This file should **not** be copied. Instead, the object it exports should be appended at 
the end of the array exported in [providers.js](/src/apis/providers.js).

E.g: providers.js
```
export default [
    {
        "id": "exchange",
        "name": "Fiat",
        ...
    },
    {
        "id": "binance",
        "name": "Crypto",
        ...
    },
    {
        "id": "myprovider",
        "name": "My Provider",
        ...
    },
    },
];
```

## [myprovider](templates/api/myprovider)
This folder contains the conversion function and 
the dictionary of currencies. This is mainly used to organize the code, and 
as such you may omit the folder in favor of directly providing `currencies` and 
`toEuroFunc` to your new entry inside [providers.js](/src/apis/providers.js). 

## [toEuro.myprovider.js](templates/api/myprovider/toEuro.myprovider.js)
Exports a function that receives a currency and 
returns the ratio to the Euro for that currency.

## [currencies.myprovider.json](templates/api/myprovider/currencies.myprovider.json)
Contains a dictionary object that maps the possible 
currencies under the form of currencyCode: currencyName.
