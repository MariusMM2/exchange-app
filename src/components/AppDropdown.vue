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
/**
 * General dropdown component that contains a title.
 */
export default {
  name: "AppDropdown",
  props: {
    /**
     * Title displayed besides the dropdown.
     */
    title: {
      type: String,
      required: true,
    },
    /**
     * List of selectable items in the dropdown.
     */
    options: {
      type: Array,
      required: true,
    },
    /**
     * Initial selected item. Defaults to the
     * first item of options prop.
     */
    value: {
      Type: String,
      required: false,
    },
  },
}
</script>

<style scoped>

</style>