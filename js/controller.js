function onInit() {
    renderTodos()
}

function renderTodos() {
    const todos = getTodosForDisplay()
    getTodosSorted(gSortBy)
    const strHTMLs = todos.map((todo) => {
        var color = ''
        if (+todo.importance === 3) {
            color = 'red'
        } else if (+todo.importance === 2) {
            color = 'orange'
        }

        return `<li class="${color} ${todo.isDone ? 'done' : ''}"
        onclick="onToggleTodo('${todo.id}')">
        ${todo.txt}
        <button onclick="onRemoveTodo(event,'${todo.id}')">x</button> <button onclick="onImportanceTodo(event,'${todo.id}')">importance</button>
        </li>`
    })
    document.querySelector('.todo-list').innerHTML = strHTMLs.join('')
    document.querySelector('.total-todos').innerText = getTotalTodos()
    document.querySelector('.active-todos').innerText = getActiveTodos()
    document.querySelector('.done-todos').innerText = getDoneTodos()
}

function onAddTodo(ev) {
    ev.preventDefault()
    const elTxt = document.querySelector('input[name="todo-txt"]')
    const txt = elTxt.value
    if (txt === '') {
        elTxt.value = ''
        return
    }
    // console.log('txt', txt)
    addTodo(txt)
    elTxt.value = ''
    renderTodos()
}

function onRemoveTodo(ev, todoId) {
    ev.stopPropagation()
    // console.log('Removing', todoId)
    var userAnswer = confirm('Are you sure?')
    if (userAnswer) removeTodo(todoId)
    renderTodos()
}

function onImportanceTodo(ev, todoId) {
    ev.stopPropagation()
    importanceTodo(todoId, inputImprotance())
    renderTodos()
}

function onToggleTodo(todoId) {
    // console.log('Toggling', todoId)
    toggleTodo(todoId)
    renderTodos()
}

function onSetFilter(filterBy) {
    // console.log('filterBy', filterBy)
    setFilter(filterBy)
    renderTodos()
}

function onSortFilter(sortBy) {
    setSort(sortBy)
    getTodosSorted(sortBy)
    renderTodos()
}
