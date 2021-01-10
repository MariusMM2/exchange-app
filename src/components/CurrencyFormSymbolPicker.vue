<template>
  <div>
    <input id="searchField"
           type="search"
           autocomplete="off"
           placeholder="Choose a currency.."
           v-model.trim="searchQuery"
           @focus="openDropdown">
    <div v-bind:id="dropdownId" class="dropdown">
      <a v-for="currency in currencies"
         href="#"
         @click="handleClickCurrency(currency[0])"
         :key="currency[0]">
        {{ formatCurrency(currency) }}
      </a>
    </div>
  </div>
</template>

<script>
/**
 * Component that displays a dropdown of currencies
 * with a search field used to filter said currencies.
 */
export default {
  name: "CurrencyConverterSymbolPicker",

  props: {
    /**
     * The id of the picker, used by CSS selectors.
     */
    id: {
      type: String,
      required: true,
    },
    /**
     * Possible currency choices, a list of
     * two-element arrays where the first element is the
     * currency symbol and the second is the currency name.
     */
    currencies: {
      type: Array,
      required: true,
    },
    /**
     * Default selected currency symbol.
     */
    value: {
      type: String,
      required: true,
    }
  },

  data: function () {
    return {
      searchQuery: "",
      selectedCurrency: undefined,
    }
  },

  computed: {
    /**
     * Formatted id for the dropdown element.
     * @returns {string}
     */
    dropdownId() {
      return `dropdown-${this.id}'`
    }
  },

  watch: {
    /**
     * Updates the filtered currencies
     * whenever the search query changes.
     */
    searchQuery: function (newQuery) {
      this.filterCurrencies(newQuery);
    },
    /**
     * Emits an event when the selected currency
     * changes.
     * @event select
     */
    selectedCurrency: function (newCurrency) {
      this.$emit('select', newCurrency);
    },
    /**
     * Updates the search query
     * and the selected currency whenever
     * the value attribute changes.
     */
    value: function (newValue) {
      this.update(newValue);
    }
  },

  created() {
    this.update(this.value);
  },

  methods: {
    /**
     * Updates the search query
     * and the selected currency using
     * the provided currency.
     * @param newCurrency New currency used to update
     */
    update(newCurrency) {
      newCurrency = newCurrency.toUpperCase();

      const currency = this.currencies.find(currency => currency[0] === newCurrency);

      this.searchQuery = this.formatCurrency(currency);
      this.selectedCurrency = currency[0];
    },

    /**
     * Handles clicking a currency in the dropdown.
     * @param currency Clicked currency
     */
    handleClickCurrency(currency) {
      this.closeDropdown();
      this.update(currency);
    },

    /**
     * Filters the displayed currencies
     * based on the provided query.
     * @param query Query used for filtering
     */
    filterCurrencies(query) {
      // retrieves the dropdown element
      const dropdown = document.getElementById(this.dropdownId);
      // retrieves the currencies elements
      const currencies = dropdown.getElementsByTagName("a");

      for (const currency of currencies) {
        const txtValue = currency.textContent || currency.innerText;

        // sets the display attribute to "none" if the currency does not match the query
        // or "" (empty) otherwise
        currency.style.display = txtValue.toUpperCase().indexOf(query.toUpperCase()) > -1
            ? ""
            : "none";
      }
    },

    /**
     * Formats the display string of a currency.
     */
    formatCurrency(currency) {
      return `${currency[1]} (${currency[0]})`;
    },

    /**
     * Displays the dropdown.
     */
    openDropdown() {
      document.getElementById(this.dropdownId).classList.add('show');
    },

    /**
     * Hides the dropdown.
     */
    closeDropdown() {
      document.getElementById(this.dropdownId).classList.remove('show');
    },
  }
}
</script>

<style scoped>
.dropdown {
  display: none;
  position: absolute;
  background-color: #f6f6f6;
  border: 1px solid #ddd;
  z-index: 1;
}

.dropdown a {
  color: black;
  text-decoration: none;
  display: block;
}

.dropdown a:hover {
  background-color: #f1f1f1
}

/*noinspection CssUnusedSymbol*/
.show {
  display: block;
}
</style>