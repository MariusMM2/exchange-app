<template>
  <div>
    <CurrencyConverter
        title="Fiat-Crypto Conversion"
        origin-currency-type="fiat"
        target-currency-type="crypto"/>
  </div>
</template>

<script>
import CurrencyConverter from "@/components/CurrencyConverter";

export default {
  name: "FiatCryptoConverter",
  components: {
    CurrencyConverter,
  }
}
</script>

<style scoped>

</style>