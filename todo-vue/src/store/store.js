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
  }
}) 