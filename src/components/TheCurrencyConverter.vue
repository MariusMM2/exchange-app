<template>
  <div class="frame">
    <div>
      <label for="originCurrencyType">From</label>
      <select id="originCurrencyType" v-model="origin.currencyType">
        <option v-for="type in currencyTypes" v-bind:value="type.id" v-bind:key="type.id">
          {{ type.name }}
        </option>
      </select>
      <br>
      <CurrencyConverterPicker
          id="origin"
          :currencies="originCurrencyModel.currencies"
          @currency-selected-event="handleOriginCurSelected"/>
      <br>
      <label for="originAmount">Amount</label>
      <input type="number" id="originAmount" v-model.number="origin.amount">
    </div>
    <br>
    <div>
      <label for="targetCurrencyType">To</label>
      <select id="targetCurrencyType" v-model="target.currencyType" @select="convert">
        <option v-for="type in currencyTypes" v-bind:value="type.id" v-bind:key="type.id">
          {{ type.name }}
        </option>
      </select>
      <br>
      <CurrencyConverterPicker
          id="target"
          :currencies="targetCurrencyModel.currencies"
          @currency-selected-event="handleTargetCurSelected"/>
    </div>
    <button @click="convert">Calculate</button>
    <p>{{ resultMessage }}</p>
  </div>
</template>

<script>
import * as config from "@/app.config.json";
import {CryptoCurrencyModel, FiatCurrencyModel} from "@/models/currency.model";
import CurrencyConverterPicker from "@/components/CurrencyConverterPicker";

export default {
  name: "TheCurrencyConverter",
  components: {
    CurrencyConverterPicker
  },
  data() {
    return {
      origin: {
        currencyType: undefined,
        currency: undefined,
        amount: 0,
      },
      target: {
        currencyType: undefined,
        currency: undefined,
        amount: undefined,
      },
      currencyTypes: config.app.currencyTypes,
      resultMessage: '',
    }
  },
  computed: {
    originCurrencyCode: function () {
      return this.origin.currency.toUpperCase();
    },
    targetCurrencyCode: function () {
      return this.target.currency.toUpperCase();
    },
    originCurrencyModel: function () {
      return this.getModelFor(this.origin.currencyType);
    },
    targetCurrencyModel: function () {
      return this.getModelFor(this.target.currencyType);
    }
  },
  watch: {
    'target.amount': function (newAmount) {
      this.resultMessage = `${this.origin.amount} ${this.originCurrencyCode} = ${newAmount} ${this.targetCurrencyCode}`;
    },
    'origin.currencyType': function (newType) {
      this.origin.model = this.getModelFor(newType);
    },
    'target.currencyType': function (newType) {
      this.target.model = this.getModelFor(newType);
    },
  },
  methods: {
    getModelFor(currencyType) {
      switch (currencyType) {
        case 'fiat':
          return FiatCurrencyModel;
        case 'crypto':
          return CryptoCurrencyModel;
      }
    },
    handleOriginCurSelected(currency) {
      this.origin.currency = currency;
    },
    handleTargetCurSelected(currency) {
      this.target.currency = currency;
    },
    async toEuroRatio(currencyType, currency) {
      return await this.getModelFor(currencyType).getCurrencyRatioToEuro(currency.toUpperCase());
    },
    async convert() {
      const originToEuroRatio = await this.toEuroRatio(this.origin.currencyType, this.origin.currency);
      const targetToEuroRatio = await this.toEuroRatio(this.target.currencyType, this.target.currency);
      const originEuro = this.origin.amount * originToEuroRatio;

      this.target.amount = (originEuro / targetToEuroRatio).toFixed(4);
    }
  },
  beforeMount() {
    this.target.amount = 0;
    this.origin.currencyType = config.app.defaultCurrencyType;
    this.target.currencyType = config.app.defaultCurrencyType;
    this.origin.currency = config.app.defaultCurrency;
    this.target.currency = config.app.defaultCurrency;
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