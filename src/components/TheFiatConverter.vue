<template>
  <div>
      <CurrencyConverter
          title="Fiat-Fiat Conversion"
          origin-currency-type="fiat"
          target-currency-type="fiat"/>
  </div>
</template>

<script>
import CurrencyConverter from "@/components/CurrencyConverter";

export default {
  name: "FiatConverter",
  components: {
    CurrencyConverter,
  }
}
</script>

<style scoped>

</style>