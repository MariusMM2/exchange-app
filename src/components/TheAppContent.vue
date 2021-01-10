<template>
  <div id="content">
    <TheCurrencyConverter/>
  </div>
</template>

<script>
import TheCurrencyConverter from "@/components/TheCurrencyConverter";

/**
 * Component that holds the main contents of the app.
 */
export default {
  name: 'TheAppContent',
  components: {
    TheCurrencyConverter,
  }
}
</script>

<style scoped>

</style>
