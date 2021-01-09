<template>
  <div>
    <label for="dropdown">{{ title }}</label>
    <select id="dropdown"
            :value="value || options[0].id"
            @input="$emit('select', $event.target.value)">
      <option v-for="option in options" :value="option.id" :key="option.id">
        {{ option.name }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  name: "AppDropdown",
  props: {
    title: {
      type: String,
      required: true,
    },
    options: {
      type: Array,
      required: true,
    },
    value: {
      Type: String,
      required: true,
    },
  },
}
</script>

<style scoped>

</style>