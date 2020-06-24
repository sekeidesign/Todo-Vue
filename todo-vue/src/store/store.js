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
  }
}) 