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
    renderMain()
  }

  removeTodo (id) {
    _.remove(this.todos, { id: id })
    renderMain()
  }

  toggleDone (id) {
    const todo = _.find(this.todos, o => o.id === id)
    todo.done = !todo.done
    renderMain()
  }
}

const header = $('#header')[0]
const main = $('#main')[0]
const state = new State()
let newInput

const initCheckboxes = () => {
  const checkboxes = $('input.toggle')
  _.each(checkboxes, el => {
    $(el).change(e => {
      const parent = e.target.parentElement
      state.toggleDone(+parent.dataset.id)
    })
  })
}

const initDeleteButtons = () => {
  const deleteButtons = $('button.destroy')
  _.each(deleteButtons, el => {
    $(el).click(e => {
      const parent = e.target.parentElement
      state.removeTodo(+parent.dataset.id)
    })
  })
}

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
  initCheckboxes()
  initDeleteButtons()
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
