<template>
  <div>
    <CurrencyConverter
        title="Crypto-Fiat Conversion"
        origin-currency-type="crypto"
        target-currency-type="fiat"/>
  </div>
</template>

<script>
import CurrencyConverter from "@/components/CurrencyConverter";

export default {
  name: "CryptoFiatConverter",
  components: {
    CurrencyConverter,
  }
}
</script>

<style scoped>

</style>