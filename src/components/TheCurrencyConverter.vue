<template>
  <div class="frame">
    <div>
      <CurrencyForm
          title="From"
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
          title="To"
          :currency-types="currencyTypes"
          @input="targetCurrency = $event"/>
      <br>
    </div>
    <button @click="convert">Calculate</button>
    <p>{{ resultMessage }}</p>
  </div>
</template>

<script>
import setup from "@/apis/setup";
import CurrencyTypesModel from "@/models/currencyTypes.model";
import CurrencyForm from "@/components/CurrencyForm";

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
      currencyTypes: setup.apis.map(type => ({
        id: type.id,
        name: type.name,
      })),
      resultMessage: ''
    }
  },

  methods: {
    getModelFor(currencyType) {
      return CurrencyTypesModel.types[currencyType];
    },

    async toEuroRatio(currencyType, currency) {
      return await this.getModelFor(currencyType).getCurrencyRatioToEuro(currency.toUpperCase());
    },

    async convert() {
      this.originAmount = this.originAmount || 1;
      const originToEuroRatio = await this.toEuroRatio(this.originCurrency.type, this.originCurrency.symbol);
      const targetToEuroRatio = await this.toEuroRatio(this.targetCurrency.type, this.targetCurrency.symbol);
      const originEuro = this.originAmount * originToEuroRatio;
      const targetAmount = (originEuro / targetToEuroRatio).toFixed(8);

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