<template>
  <div class="remaining">{{ remaining }} items left</div>
</template>

<script>
export default {
  name: 'todo-remaining',
  props: {
    remaining: {
      type: Number,
      required: true,
    }
  }
}
</script>