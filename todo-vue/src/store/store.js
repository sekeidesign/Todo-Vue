import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
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
  },
  getters: {
    remaining (state) {
      return state.todos.filter(todo => !todo.completed).length;
    },
    isAllChecked (state, getters) {
      if (getters.remaining > 0) {
        return 'Check All'
      } else {
        return 'All done!'
      }
    },
    todosFiltered (state) {
      if (state.filter === 'active') {
        return state.todos.filter(todo => !todo.completed);
      } else if (state.filter === 'completed') {
        return state.todos.filter(todo => todo.completed);
      } else {
        return state.todos
      }
    },
    showClearCompleted (state) {
      return state.todos.filter(todo => todo.completed).length > 0;
    }
  },
  mutations: {
    addTodo(state, todo) {
      state.todos.push({
        'id': todo.id,
        'title': todo.title,
        'completed': false,
        'editing': false,
      })
    },
    clearCompleted(state) {
      state.todos = state.todos.filter(todo => !todo.completed)
    },
    updateFilter(state, filter) {
      state.filter = filter
    },
    checkAll(state) {
      state.todos.forEach((todo) => todo.completed = true)
    },
    deleteTodo(state, id) {
      const index = state.todos.findIndex(item => item.id == id);
      state.todos.splice(index, 1);
    },
    updateTodo(state, todo) {
      const index = state.todos.findIndex(item => item.id == todo.id)
      state.todos.splice(index, 1, {
        'id': todo.id,
        'title': todo.title,
        'completed': todo.completed,
        'editing': todo.editing,
      })
    },
  },
  actions: {
    addTodo(context, todo) {
      setTimeout(() => {
        context.commit('addTodo', todo)
      }, 500);
    },
    clearCompleted(context) {
      context.commit('clearCompleted')
    },
    updateFilter(context, filter) {
      context.commit('updateFilter', filter)
    },
    checkAll(context, checked) {
      context.commit('checkAll', checked)
    },
    deleteTodo(context, id) {
      context.commit('deleteTodo', id)
    },
    updateTodo(context, todo) {
      context.commit('updateTodo', todo)
    },
  }
}) 