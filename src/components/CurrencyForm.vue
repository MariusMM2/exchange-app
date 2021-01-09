<template>
  <div>
    <AppDropdown
        :title="title"
        :options="currencyTypes.map(t => ({id: t.id, name: t.name}))"
        :value="type"
        @select="handleSelectType"/>
    <br>
    <CurrencyFormSymbolPicker
        :id="title.toLowerCase()"
        :currencies="currencies"
        :value="symbol"
        @select="handleSelectSymbol"/>
  </div>
</template>

<script>
import * as config from "@/app.config.json";
import AppDropdown from "@/components/AppDropdown";
import CurrencyFormSymbolPicker from "@/components/CurrencyFormSymbolPicker";
import currencyController from "@/models/currencies.controller";

export default {
  name: "CurrencyForm",

  components: {
    CurrencyFormSymbolPicker,
    AppDropdown,
  },

  props: {
    title: {
      type: String,
      required: true,
    },
    currencyTypes: {
      type: Array,
      required: true,
    }
  },

  data() {
    return {
      type: config.app.defaultCurrencyType,
      symbol: config.app.defaultCurrencySymbol,
    }
  },

  computed: {
    currencies: function () {
      return currencyController.models[this.type].currencies;
    },
  },

  created() {
    this.update();
  },

  methods: {
    update() {
      this.$emit('input', {
        type: this.type,
        symbol: this.symbol,
      });
    },

    handleSelectType(newType) {
      if (this.type !== newType) {
        this.symbol = currencyController.models[newType].defaultSymbol;
      }

      this.type = newType;

      this.update();
    },

    handleSelectSymbol(newSymbol) {
      this.symbol = newSymbol;

      this.update();
    },
  }
}
</script>

<style scoped>

</style>