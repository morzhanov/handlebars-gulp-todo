class Todo {
  constructor (id, content, done) {
    this.id = id
    this.content = content
    this.done = done
  }
}

class State {
  constructor (){
    this.todos = []
  }

  addTodo(todo) {

  }

  removeTodo(id){

  }

  toggleDone(id) {
    return _.find(this.todos, o => o.id === id)
  }
}

const init = () => {
  console.log('loaded')
  const s = new State()
  console.log(s)
  console.log(s.todos)
}

window.onload = init
