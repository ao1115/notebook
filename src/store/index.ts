import Vue from 'vue'
import Vuex from 'vuex'
let notebook = require('./modules/notebook.js')
let note = require('./modules/note.js')
let trash = require('./modules/trash.js')
let user = require('./modules/user.js')

Vue.use(Vuex)



export default new Vuex.Store({
  modules: {
    notebook,
    note,
    trash,
    user
  }
})
console.log(notebook)