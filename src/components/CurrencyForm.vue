<template>
  <div>
    <AppDropdown
        :title="title"
        :options="currencyTypes.map(t => ({id: t.id, name: t.name}))"
        :value="type"
        @select="type = $event; update()"/>
    <br>
    <CurrencyFormSymbolPicker
        :id="title.toLowerCase()"
        :currencies="currencies"
        @select="symbol = $event; update()"/>
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
  }
}
</script>

<style scoped>

</style>