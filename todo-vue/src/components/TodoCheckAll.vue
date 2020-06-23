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
  props: {
    remaining: {
      type: Number,
      required: true,
    },
    isAllChecked: {
      type: String,
      required: true,
    },
  },
  methods: {
    checkAll() {
      eventBus.$emit('checkAllPressed')
    }
  }
}
</script>