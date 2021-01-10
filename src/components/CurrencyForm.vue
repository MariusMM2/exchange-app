<template>
  <div>
    <AppDropdown
        :title="name"
        :options="currencyTypes.map(t => ({id: t.id, name: t.name}))"
        :value="type"
        @select="handleSelectType"/>
    <br>
    <CurrencyFormSymbolPicker
        :id="name.toLowerCase()"
        :currencies="currencies"
        :value="symbol"
        @select="handleSelectSymbol"/>
  </div>
</template>

<script>
import * as config from "@/app.config.json";
import AppDropdown from "@/components/AppDropdown";
import CurrencyFormSymbolPicker from "@/components/CurrencyFormSymbolPicker";
import CurrencyTypesModel from "@/models/currencyTypes.model";

export default {
  name: "CurrencyForm",

  components: {
    CurrencyFormSymbolPicker,
    AppDropdown,
  },

  props: {
    name: {
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
      return CurrencyTypesModel.types[this.type].currencies;
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
        this.symbol = CurrencyTypesModel.types[newType].defaultSymbol;
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