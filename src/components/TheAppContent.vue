<template>
  <div id="content">
    <TheCryptoConverter/>
    <TheFiatConverter/>
    <TheCryptoFiatConverter/>
    <TheFiatCryptoConverter/>
  </div>
</template>

<script>
import TheCryptoConverter from "@/components/TheCryptoConverter";
import TheFiatConverter from "@/components/TheFiatConverter";
import TheCryptoFiatConverter from "@/components/TheCryptoFiatConverter";
import TheFiatCryptoConverter from "@/components/TheFiatCryptoConverter";

export default {
  name: 'AppContent',
  components: {
    TheFiatConverter,
    TheCryptoConverter,
    TheCryptoFiatConverter,
    TheFiatCryptoConverter,
  }
}
</script>

<style scoped>

</style>
