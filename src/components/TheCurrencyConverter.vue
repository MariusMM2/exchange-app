<template>
  <div class="frame">
    <div>
      <label for="originCurrencyType">From</label>
      <select id="originCurrencyType" v-model="originCurrencyType" @select="convert">
        <option v-for="type in currencyTypes" v-bind:value="type.id" v-bind:key="type.id">
          {{ type.name }}
        </option>
      </select>
      <br>
      <label for="originCurrency">Currency</label>
      <input type="text" id="originCurrency" v-model.trim="originCurrency">
      <br>
      <label for="originAmount">Amount</label>
      <input type="number" id="originAmount" v-model.number="originAmount">
    </div>
    <br>
    <div>
      <label for="targetCurrencyType">To</label>
      <select id="targetCurrencyType" v-model="targetCurrencyType" @select="convert">
        <option v-for="type in currencyTypes" v-bind:value="type.id" v-bind:key="type.id">
          {{ type.name }}
        </option>
      </select>
      <br>
      <label for="targetCurrency">Currency</label>
      <input type="text" id="targetCurrency" v-model.trim="targetCurrency">
    </div>
    <button @click="convert">Calculate</button>

    <p v-if="validResult">{{ originAmount }} {{ originCurrency }} = {{ targetAmount }} {{ targetCurrency }}</p>

  </div>
</template>

<script>
import * as config from "../app.config.json";

export default {
  name: "TheCurrencyConverter",
  data: function () {
    return {
      currencyTypes: config.app.currencyTypes,
      originCurrencyType: config.app.defaultCurrencyType,
      originCurrency: config.app.defaultCurrency,
      originAmount: 0,
      targetCurrencyType: config.app.defaultCurrencyType,
      targetCurrency: config.app.defaultCurrency,
      targetAmount: 0,
      validResult: false,
    }
  },
  methods: {
    toEuroRatio(currencyType, currency) {
      if (currencyType === 'fiat') {
        if (currency === 'eur') {
          return 1;
        } else if (currency === 'usd') {
          return 0.81;
        }
      } else if (currencyType === 'crypto') {
        return 1;
      }
    },
    convert() {
      const originToEuroRatio = this.toEuroRatio(this.originCurrencyType, this.originCurrency);
      const targetToEuroRatio = this.toEuroRatio(this.targetCurrencyType, this.targetCurrency);
      const originEuro = this.originAmount * originToEuroRatio;

      this.targetAmount = originEuro / targetToEuroRatio;
      this.validResult = true;
    }
  }
}
</script>

<style scoped>
.frame {
  width: 300px;
  /*height: 100px;*/
  border: 1px solid black;
  padding: 10px 20px 20px 20px;
  margin: auto;
}
</style>