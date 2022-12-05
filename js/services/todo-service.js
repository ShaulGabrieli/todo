const STORAGE_KEY = 'todosDB'
var gTodos
var gFilterBy = 'all'
var gSortBy = 'abc'

_createTodos()

function getTodosForDisplay() {
    if (gFilterBy === 'all') return gTodos
    return gTodos.filter((todo) => (todo.isDone && gFilterBy === 'done') || (!todo.isDone && gFilterBy === 'active'))
}

function getTodosSorted(sortBy) {
    if (sortBy === 'abc') {
        gTodos.sort((a, b) => {
            const nameA = a.txt.toUpperCase() // ignore upper and lowercase
            const nameB = b.txt.toUpperCase() // ignore upper and lowercase
            if (nameA < nameB) {
                return -1
            }
            if (nameA > nameB) {
                return 1
            }

            // names must be equal
            return 0
        })
    } else if (sortBy === 'created') {
        gTodos.sort(function (a, b) {
            // Turn your strings into dates, and then subtract them
            // to get a value that is either negative, positive, or zero.
            return new Date(b.createdAt) - new Date(a.createdAt)
        })
    } else if (sortBy === 'importance') {
        gTodos.sort((a, b) => +b.importance - +a.importance)
    }
}

function addTodo(txt) {
    const todo = _createTodo(txt)
    gTodos.unshift(todo)
    saveToStorage(STORAGE_KEY, gTodos)
}

function removeTodo(todoId) {
    const todoIdx = gTodos.findIndex((todo) => todo.id === todoId)
    gTodos.splice(todoIdx, 1)
    saveToStorage(STORAGE_KEY, gTodos)
}

function importanceTodo(todoId, str) {
    const todoIdx = gTodos.findIndex((todo) => todo.id === todoId)
    gTodos[todoIdx].importance = str
    saveToStorage(STORAGE_KEY, gTodos)
}

function inputImprotance() {
    var str = prompt('Rate your importance from 1 to 3:')
    return str
}

function toggleTodo(todoId) {
    const todo = gTodos.find((todo) => todo.id === todoId)
    todo.isDone = !todo.isDone
    saveToStorage(STORAGE_KEY, gTodos)
}

function setFilter(filterBy) {
    gFilterBy = filterBy
}

function setSort(sortBy) {
    gSortBy = sortBy
}

function getTotalTodos() {
    if(gTodos.length){
        return gTodos.length
    } else{
        return 'No todos'
    }
    
}

function getActiveTodos() {
 var activeLength = gTodos.filter((todo) => !todo.isDone).length 
 return activeLength ?  activeLength :  'No Active Todos'
}

function getDoneTodos() {
    var doneLength = gTodos.filter((todo) => todo.isDone).length 
    return doneLength ?  doneLength :  'No Done Todos'
   }


function _createTodos() {
    gTodos = loadFromStorage(STORAGE_KEY)
    if (!gTodos || !gTodos.length) {
        gTodos = [_createTodo('Learn HTML'), _createTodo('Study CSS'), _createTodo('Master JS')]
        saveToStorage(STORAGE_KEY, gTodos)
    }
}

function _createTodo(txt, importance = '1') {
    return {
        id: _makeId(),
        txt: txt,
        isDone: false,
        createdAt: Date.now(),
        importance,
    }
}

function _makeId(length = 5) {
    var txt = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return txt
}
