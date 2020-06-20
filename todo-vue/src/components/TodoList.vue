<template>
  <div>
    <div class="top-extra-container">
      <div class="filter-wrap">
        <div>Show:</div>
        <button :class="{ active : filter === 'all' }" @click="filter = 'all'">All</button>
        <button :class="{ active : filter === 'active' }" @click="filter = 'active'">Active</button>
        <button :class="{ active : filter === 'completed' }" @click="filter = 'completed'">Completed</button>
      </div>
      <div class="remaining">{{ remaining }} items left</div>
    </div>
    <input type="text" class="todo-input" placeholder="What needs to be done?" v-model="newTodo" @keyup.enter="addTodo">
    <transition-group name="todo-animation">
      <div v-for="(todo, index) in todosFiltered" :key="todo.id" class="todo-item">
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
    </transition-group>
    <div class="bottom-extra-container">
      <button 
        class="check-all" 
        :class="{ 'check-all-done': !remaining }" 
        @click="checkAllTodos"
      >
        {{ isAllChecked }}
      </button>
      <transition name="fade">
        <button
          v-if="showClearCompleted"
          class="clear-completed"
          @click="clearCompleted"
        >
          Clear Completed
        </button>
      </transition>
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
      filter: 'all',
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
  computed: {
    remaining () {
      return this.todos.filter(todo => !todo.completed).length;
    },
    isAllChecked () {
      if (this.remaining > 0) {
        return 'Check All'
      } else {
        return 'All done!'
      }
    },
    todosFiltered () {
      if (this.filter === 'active') {
        return this.todos.filter(todo => !todo.completed);
      } else if (this.filter === 'completed') {
        return this.todos.filter(todo => todo.completed);
      } else {
        return this.todos
      }
    },
    showClearCompleted () {
      return this.todos.filter(todo => todo.completed).length > 0;
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
    checkAllTodos () {
      this.todos.forEach((todo) => todo.completed = true)
    },
    clearCompleted () {
      this.todos = this.todos.filter(todo => !todo.completed)
    }
  }
}
</script>

<style lang="scss">
  .todo-input {
    width: 100%;
    padding: 10px 18px 8px;
    border: none;
    border-bottom: 2px solid lightgray;
    background-color: rgba(0, 0, 0, 0.03);
    font-size: 16px;
    margin-bottom: 16px;

    &:focus {
      outline:0;
      border-bottom-color: rgb(0, 200, 180);
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

  input[type=checkbox] {
    cursor: pointer;
  }

  .top-extra-container {
    display: flex;
    align-items: start;
    justify-content: space-between;
    border-bottom: 1px solid lightgray;
    padding: 16px 0px;
    margin-bottom: 16px;
  }

  .bottom-extra-container {
    display: flex;
    align-items: start;
    justify-content: flex-end;
    border-top: 1px solid lightgray;
    padding: 16px 0px;

    button {
      margin-left: 8px;
    }
  }

  .remaining {
    color: gray;
    font-size: 14px;
    text-align: left;
  }

  .check-all {
    background-color: transparent;
    font-size: 12px;
    border: 1px solid gray;
    border-radius: 5px;
    padding: 6px 12px;
    cursor: pointer;

    &:hover {
      background-color: rgba(0, 0, 0, 0.07);
    }
  }

  .check-all-done {
    background-color: rgba(200, 255, 210, .5);
    color: darkgreen;
    border-color: rgba(200, 255, 210, .5);
    cursor: default;

    &:hover {
      background-color: rgba(200, 255, 210, .5);
    }
  }

  .clear-completed {
    background-color: rgba(255, 0, 0, 0.07);
    font-size: 12px;
    color: rgb(100, 0, 0);
    border: 1px solid rgb(100, 0, 0);
    border-radius: 5px;
    padding: 6px 12px;
    cursor: pointer;

    &:hover {
      background-color: rgba(255, 0, 0, 0.25);
    }
  }

  .filter-wrap {
    color: gray;
    font-size: 12px;
    display: flex;
    align-items: center;

    button {
      background-color: rgba(0, 0, 30, 0.05);
      border: none;
      border-radius: 5px;
      font-size: 12px;
      padding: 4px 8px;
      margin-left: 4px;
      cursor: pointer;

      &:hover {
        background-color: rgba(0, 0, 30, 0.1);
      }
    }
    .active {
      background-color: rgb(0, 180, 160);
      color: white;

      &:hover {
        background-color: rgb(0, 180, 160);
      }
    }
  }

  .fade-enter-active, .fade-leave-active {
    transition: all .2s;
  }

  .fade-enter, .fade-leave-to {
    opacity: 0;
    transform: translateX(100%);
  }

  .todo-animation-enter-active, .todo-animation-leave-active {
    transition: all .2s;
  }

  .todo-animation-enter {
    opacity: 0;
    transform: translateX(-40px);
  }

  .todo-animation-leave-to {
    opacity: 0;
    transform: translateX(40px);
  }

</style>
