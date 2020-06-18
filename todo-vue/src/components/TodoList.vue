<template>
  <div>
    <input type="text" class="todo-input" placeholder="What needs to be done?" v-model="newTodo" @keyup.enter="addTodo">
    <div v-for="(todo, index) in todos" :key="todo.id" class="todo-item">
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
  </div>
</template>

<script>
export default {
  name: 'TodoList',
  data () {
    return {
      newTodo: '',
      idForTodo: 3,
      beforeEditCache: '',
      todos: [
        {
          'id': 1,
          'title': 'Feed cat',
          'completed': false,
          'editing': false,
        },
        {
          'id': 2,
          'title': 'Build Vue Todo App',
          'completed': false,
          'editing': false,
        },
      ]
    }
  },
  directives: {
    focus: {
      inserted: function (el) {
        el.focus()
      }
    }
  },
  methods: {
    addTodo() {
      if (this.newTodo.trim().length === 0){
        return
      }
      this.todos.push({
        id: this.idForTodo,
        title: this.newTodo,
        completed: false,
        editing: false,
      })

      this.newTodo = '',
      this.idForTodo++
    },
    editTodo(todo) {
      todo.editing = true;
      this.beforeEditCache = todo.title;
    },
    doneEdit(todo) {
      if (todo.title.trim().length === 0){
        todo.title = this.beforeEditCache;
      }
      todo.editing = false
    },
    cancelEdit(todo){
      todo.editing = false;
      todo.title = this.beforeEditCache
    },
    removeTodo(index) {
      this.todos.splice(index, 1);
    },
  }
}
</script>

<style lang="scss">
  .todo-input {
    width: 100%;
    padding: 10px 18px;
    font-size: 18px;
    margin-bottom: 16px;

    &:focus {
      outline:0;
    }
  }
  .todo-item {
    margin-bottom: 12px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .todo-item-left {
    display: flex;
    align-items: center;
    width: 100%;
  }
  .todo-item-completed {
    text-decoration: line-through;
    color: #888;
  }
  .todo-item-label {
    padding: 10px;
    border: 1px solid white;
    margin-left: 12px;
    text-align: left;
    width: 100%;
  }
  .edit-input {
    font-size: 18px;
    color: #2c3e50;
    margin-left: 12px;
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
  }
  .remove-item {
    cursor: pointer;
    margin-left: 8px;
    color: #666;
    font-size: 18px;

    &:hover {
      color: black;
    }
  }
</style>
