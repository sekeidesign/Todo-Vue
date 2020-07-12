<template>
  <button
    v-if="showClearCompleted"
    class="clear-completed"
    @click="clearCompleted"
  >
    Clear Completed
  </button>
</template>

<script>
export default {
  name: 'todo-clear-completed',
  computed: {
    showClearCompleted() {
      return this.$store.getters.showClearCompleted
    },
  },
  methods: {
    clearCompleted() {
      this.$store.dispatch('clearCompleted')
    }
  }
}
</script>