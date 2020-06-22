<template>
    <div class="todo-item">
        <div class="todo-item-left">
          <input type="checkbox" v-model="todo.completed">
          <div v-if="!todo.editing" class="todo-item-label" :class="{ 'todo-item-completed' : todo.completed }" @dblclick="editTodo(todo)">{{ todo.title }}</div>
          <input 
            v-else 
            type="text" 
            class="edit-input" 
            v-model="todo.title" 
            @blur="doneEdit(todo)" 
            @keyup.enter="doneEdit(todo)" 
            @keyup.esc="cancelEdit(todo)" 
            v-focus
          >
        </div>
        <div class="remove-item" @click="removeTodo(index)">
          &times;
        </div>
    </div>
</template>

<script>
export default {
    name: 'todo-item',
    props: {
      todo: {
        type: Object,
        required: true,
      },
      index: {
        type: Number,
        required: true,
      }
    }
}
</script>