<template>
  <div>
    <div class="top-extra-container">
      <todo-filters></todo-filters>
      <todo-items-remaining :remaining="remaining"></todo-items-remaining>
    </div>
    <input type="text" class="todo-input" placeholder="What needs to be done?" v-model="newTodo" @keyup.enter="addTodo">
    <transition-group name="todo-animation">
      <todo-item 
        v-for="todo in todosFiltered" 
        :key="todo.id"
        class="todo-item" 
        :todo="todo"
        :checkAll="!remaining"
      >
      </todo-item>
    </transition-group>
    <div class="bottom-extra-container">
      <todo-check-all :isAllChecked="isAllChecked" :checkAllTodos="checkAllTodos"></todo-check-all>
      <transition name="fade">
        <todo-clear-completed></todo-clear-completed>
      </transition>
    </div>
  </div>
</template>

<script>
import TodoItem from './TodoItem'
import TodoItemsRemaining from './TodoItemsRemaining'
import TodoCheckAll from "./TodoCheckAll"
import TodoFilters from "./TodoFilters"
import TodoClearCompleted from "./TodoClearCompleted"

export default {
  name: 'TodoList',
  components: {
    TodoItem,
    TodoItemsRemaining,
    TodoCheckAll,
    TodoFilters,
    TodoClearCompleted,
  },
  data () {
    return {
      newTodo: '',
      idForTodo: 3,
      beforeEditCache: '',
    }
  },
  computed: {
    remaining (state) {
      return this.$store.getters.remaining
    },
    isAllChecked (state, getters) {
      return this.$store.getters.isAllChecked
    },
    todosFiltered (state) {
      return this.$store.getters.todosFiltered
    },
    showClearCompleted (state) {
      return this.$store.getters.showClearCompleted
    }
  },
  methods: {
    addTodo() {
      if (this.newTodo.trim().length === 0){
        return
      }
      this.$store.commit('addTodo', {
        id: this.idForTodo,
        title: this.newTodo,
      })

      this.newTodo = '',
      this.idForTodo++
    },
    editTodo(todo) {
      todo.editing = true;
      this.beforeEditCache = todo.title;
    },
    // removeTodo(id) {
    //   const index = this.$store.state.todos.findIndex(item => item.id == id);
    //   this.$store.state.todos.splice(index, 1);
    // },
    checkAllTodos () {
      this.$store.state.todos.forEach((todo) => todo.completed = true)
    },
    clearCompleted () {
      this.$store.state.todos = this.$store.state.todos.filter(todo => !todo.completed)
    },
    // finishedEdit (data) {
    //   const index = this.$store.state.todos.findIndex(item => item.id == data.id)
    //   this.$store.state.todos.splice(index, 1, data)
    // }
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
