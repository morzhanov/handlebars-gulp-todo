class Todo {
  constructor (id, content, done = false) {
    this.id = id
    this.content = content
    this.done = done
    this.edit = false
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

  setEditing (id) {
    const todo = _.find(this.todos, o => o.id === id)
      todo.edit = true
      renderMain()
      const editInputs = $('.edit')
      _.each(editInputs, el => {
        $(el).keypress(e => {
          if (e.keyCode === 13) {
           todo.content = el.value
           todo.edit = false
           renderMain()
           _.each(state.todos, e => {
            console.log(e.id)
           })
          }
        })
      })
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

const initEdit = () => {
  const views = $('.view')
  _.each(views, el => {
    $(el).dblclick(e => {
      const id = +el.dataset.id
      state.setEditing(id)
    })
  })
}

const hydrateTodos = () => {
  const hydrated = JSON.stringify(state.todos)
  localStorage.setItem('todos', hydrated)
}

const rehydrateTodos = () => {
  const hydrated = localStorage.getItem('todos')
  if(hydrated) {
    const json = JSON.parse(hydrated)
    const todos = _.map(json, e => {
      const todo = new Todo()
      e.edit = false
      return Object.assign(todo, e)
    })
    state.todos = todos
  }
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
  const context = { 
    todos: state.todos
  }
  main.innerHTML = templateScript(context)
  initCheckboxes()
  initDeleteButtons()
  initEdit()
  hydrateTodos()
}

const init = () => {
  rehydrateTodos()
  renderHeader()
  renderMain()

  newInput = $('input.new-todo')[0]

  newInput.onkeypress = e => {
    if (e.keyCode === 13) {
      let id
      if(!state.todos.length) {
        id = 0
      } else {
        id = state.todos[state.todos.length - 1].id + Date.now()
      }
      const content = $(newInput).val()
      const todo = new Todo(id, content)
      state.addTodo(todo)
      newInput.value = ''
      console.log(state.todos)
    }
  }
}
window.onload = init
