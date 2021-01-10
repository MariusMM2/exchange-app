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
import ProvidersModel from "@/models/providers.model";

/**
 * Component that holds a choice of
 * currency type and one of its currency symbols.
 */
export default {
  name: "CurrencyForm",

  components: {
    CurrencyFormSymbolPicker,
    AppDropdown,
  },

  props: {
    /**
     * Display name of the form. Used mainly
     * as the title of the first dropdown component.
     */
    name: {
      type: String,
      required: true,
    },
    /**
     * List of available currency types.
     */
    currencyTypes: {
      type: Array,
      required: true,
    }
  },

  data() {
    return {
      /**
       * Selected currency type, defaults to app config.
       */
      type: config.app.defaultCurrencyType,
      /**
       * Selected currency symbol, defaults to app config.
       */
      symbol: config.app.defaultCurrencySymbol,
    }
  },

  computed: {
    /**
     * Currencies of a particular type,
     * mapped with key:value as code:fullname
     * for each currency.
     * @returns {object}
     */
    currencies: function () {
      return ProvidersModel.providers[this.type].currencies;
    },
  },

  created() {
    this.update();
  },

  methods: {
    /**
     * Emits an event with the current type & symbol choice.
     * @event input
     */
    update() {
      this.$emit('input', {
        type: this.type,
        symbol: this.symbol,
      });
    },

    /**
     * Handles selection of a new currency type.
     * @param newType The selected currency type
     */
    handleSelectType(newType) {
      // if the new type is different from the existing one
      // reset the symbol to the default of that type
      if (this.type !== newType) {
        this.symbol = ProvidersModel.providers[newType].defaultSymbol;
      }

      this.type = newType;

      this.update();
    },

    /**
     * Handles selection of a new currency symbol.
     * @param newSymbol The selected currency symbol
     */
    handleSelectSymbol(newSymbol) {
      this.symbol = newSymbol;

      this.update();
    },
  }
}
</script>

<style scoped>

</style>