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
  props: {
    showClearCompleted: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    clearCompleted() {
      eventBus.$emit('clearCompleted')
    }
  }
}
</script>