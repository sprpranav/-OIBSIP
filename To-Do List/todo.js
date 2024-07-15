let todos = [];

const input = document.getElementById('input');
const addButton = document.getElementById('add');
const todoList = document.getElementById('todoList');

addButton.addEventListener('click', addTodo);

function addTodo() {
    const task = input.value.trim();
    if (task === '') {
        return;
    }
    
    todos.push({ task, completed: false });
    renderTodos();
    input.value = '';
}

function renderTodos() {
    todoList.innerHTML = '';
    todos.forEach((todo, index) => {
        const li = document.createElement('li');
        li.className = 'list-group-item d-flex justify-content-between align-items-center';
        li.textContent = todo.task;
        
        const removeButton = document.createElement('button');
        removeButton.className = 'btn btn-danger btn-sm';
        removeButton.textContent = 'Delete'; // Changed to text "Delete"
        removeButton.addEventListener('click', () => removeTodo(index));
        
        li.appendChild(removeButton);
        
        if (todo.completed) {
            li.classList.add('completed');
        }
        
        li.addEventListener('click', () => toggleCompleted(index));
        
        todoList.appendChild(li);
    });
}

function removeTodo(index) {
    todos.splice(index, 1);
    renderTodos();
}

function toggleCompleted(index) {
    todos[index].completed = !todos[index].completed;
    renderTodos();
}
