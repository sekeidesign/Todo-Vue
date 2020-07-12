<template>
  <button 
    class="check-all" 
    :class="{ 'check-all-done': !remaining }" 
    @click="checkAll"
  >
    {{ isAllChecked }}
  </button>
</template>

<script>
export default {
  name: 'todo-check-all',
  computed: {
    remaining() {
      return this.$store.getters.remaining
    },
    isAllChecked () {
      return this.$store.getters.isAllChecked
    },
  },
  methods: {
    checkAll() {
      this.$store.dispatch('checkAll', event.target.checked)
    }
  }
}
</script>