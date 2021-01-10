<template>
  <div class="frame">
    <div>
      <CurrencyForm
          name="From"
          :currency-types="currencyTypes"
          @input="originCurrency = $event"/>
      <br>
      <input
          type="number"
          placeholder="Enter desired amount..."
          v-model.number="originAmount">
    </div>
    <br>
    <div>
      <CurrencyForm
          name="To"
          :currency-types="currencyTypes"
          @input="targetCurrency = $event"/>
      <br>
    </div>
    <button @click="convert">Calculate</button>
    <p>{{ resultMessage }}</p>
  </div>
</template>

<script>
import providers from "@/apis/providers";
import ProvidersModel from "@/models/providers.model";
import CurrencyForm from "@/components/CurrencyForm";

/**
 * Component that holds the currency converter interface and state.
 */
export default {
  name: "TheCurrencyConverter",

  components: {
    CurrencyForm,
  },

  data() {
    return {
      originCurrency: {
        type: undefined,
        symbol: undefined,
      },
      targetCurrency: {
        type: undefined,
        symbol: undefined,
      },
      originAmount: undefined,
      currencyTypes: providers.map(type => ({
        id: type.id,
        name: type.name,
      })),
      resultMessage: ''
    }
  },

  methods: {
    /**
     * Retrieves the ratio to the Euro
     * for a given currency.
     * @param type Type of the currency
     * @param symbol Symbol of the currency
     * @returns {Promise<number|undefined>} Ratio to the Euro
     */
    async getToEuroRatio(type, symbol) {
      return await ProvidersModel.providers[type].getCurrencyRatioToEuro(symbol.toUpperCase());
    },

    /**
     * Converts the origin amount
     * to the target amount, based on provided
     * currencies.
     * @returns {Promise<void>}
     */
    async convert() {
      // defaults the amount to 1 if omitted
      this.originAmount = this.originAmount || 1;

      // retrieves the ratios to the Euro
      // and calculates the target amount
      const originToEuroRatio = await this.getToEuroRatio(this.originCurrency.type, this.originCurrency.symbol);
      const targetToEuroRatio = await this.getToEuroRatio(this.targetCurrency.type, this.targetCurrency.symbol);
      const originEuro = this.originAmount * originToEuroRatio;
      const targetAmount = (originEuro / targetToEuroRatio).toFixed(8);

      // formats the presentation of the result as
      // amount (currency) = amount (currency)
      this.resultMessage = `${this.originAmount} ${this.originCurrency.symbol.toUpperCase()} =
      ${targetAmount} ${this.targetCurrency.symbol.toUpperCase()}`;
    }
  },
}
</script>

<style scoped>
.frame {
  width: 300px;
  border: 1px solid black;
  padding: 10px 20px 20px 20px;
  margin: auto;
}
</style>