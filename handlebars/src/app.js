class Todo {
  constructor (id, content, done = false) {
    this.id = id
    this.content = content
    this.done = done
  }
}

class State {
  constructor () {
    this.todos = []
  }

  addTodo (todo) {
    this.todos.push(todo)
    console.log(`todos count = ${this.todos.length}`)
    renderMain()
  }

  removeTodo (id) {

  }

  toggleDone (id) {
    return _.find(this.todos, o => o.id === id)
  }
}

const header = $('#header')[0]
const main = $('#main')[0]
const state = new State()
let newInput

const renderHeader = () => {
  const template = $('#header-template').html()
  const templateScript = Handlebars.compile(template)
  const context = {}
  header.innerHTML = templateScript(context)
}
const renderMain = () => {
  const template = $('#main-template').html()
  const templateScript = Handlebars.compile(template)
  const context = { todos: state.todos }
  main.innerHTML = templateScript(context)
}

const init = () => {
  renderHeader()
  renderMain()

  newInput = $('input.new-todo')[0]

  newInput.onkeypress = e => {
    if (e.keyCode === 13) {
      console.log(e)
      const id = state.todos.length
      const content = $(newInput).val()
      const todo = new Todo(id, content)
      state.addTodo(todo)
      newInput.value = ''
    }
  }
}
window.onload = init
