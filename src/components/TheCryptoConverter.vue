<template>
  <div>
    <CurrencyConverter
        title="Crypto-Crypto Conversion"
        origin-currency-type="crypto"
        target-currency-type="crypto"/>
  </div>
</template>

<script>
import CurrencyConverter from "@/components/CurrencyConverter";

export default {
  name: "CryptoConverter",
  components: {
    CurrencyConverter,
  }
}
</script>

<style scoped>

</style>