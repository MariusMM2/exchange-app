<template>
  <div class="frame">
    <h4 class="title">{{title}}</h4>
  </div>
</template>

<script>
export default {
  name: "CurrencyConverter",
  props: {
    title: {
      type: String,
      required: true,
    },
    originCurrencyType: {
      type: String,
      required: true,
    },
    targetCurrencyType: {
      type: String,
      required: true,
    }
  }
}
</script>

<style scoped>
.frame {
  width: 300px;
  height: 100px;
  border: 1px solid black;
  padding-bottom: 20px;
  padding-left: 20px;
  padding-right: 20px;
  margin: 10px;
}
</style>