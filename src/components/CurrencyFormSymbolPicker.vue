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
         @click="handleCurrencyClick(currency)"
         :key="currency[0]">
        {{ formatCurrency(currency) }}
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "CurrencyConverterSymbolPicker",

  props: {
    id: {
      type: String,
      required: true,
    },
    currencies: {
      type: Array,
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
    dropdownId() {
      return `dropdown-${this.id}'`
    }
  },

  watch: {
    searchQuery: function (newQuery) {
      this.filterFunction(newQuery);
    },
    selectedCurrency: function (newCurrency) {
      this.$emit('select', newCurrency);
    }
  },

  created() {
    this.searchQuery = this.formatCurrency(this.currencies[0]);
    this.selectedCurrency = this.currencies[0][0];
  },

  methods: {
    handleCurrencyClick(currency) {
      this.closeDropdown();
      this.searchQuery = this.formatCurrency(currency);
      this.selectedCurrency = currency[0];
    },

    filterFunction(newQuery) {
      const dropdown = document.getElementById(this.dropdownId);
      const currencies = dropdown.getElementsByTagName("a");

      for (const currency of currencies) {
        const txtValue = currency.textContent || currency.innerText;
        currency.style.display = txtValue.toUpperCase().indexOf(newQuery.toUpperCase()) > -1
            ? ""
            : "none";
      }
    },

    formatCurrency(currency) {
      return `${currency[1]} (${currency[0]})`;
    },

    openDropdown() {
      document.getElementById(this.dropdownId).classList.add('show');
    },

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