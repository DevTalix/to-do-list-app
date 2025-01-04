// DOM Elements
const taskInput = document.getElementById('task-input');
const addTaskButton = document.getElementById('add-task-btn');
const taskList = document.getElementById('task-list');

// Load tasks from local storage on page load
window.onload = loadTasksFromLocalStorage;

// Add Task Functionality
addTaskButton.addEventListener('click', function () {
    const taskText = taskInput.value.trim();
    if (taskText === '') return;

    addTaskToList(taskText);
    saveTasksToLocalStorage();
    taskInput.value = '';
});

// Delete Task Functionality
taskList.addEventListener('click', function (e) {
    if (e.target.classList.contains('delete-btn')) {
        e.target.parentElement.remove();
        saveTasksToLocalStorage();
    }
});

// Add Task to List
function addTaskToList(taskText) {
    const taskElement = document.createElement('li');
    taskElement.className = 'task';
    taskElement.innerHTML = `
        <span>${taskText}</span>
        <button class="delete-btn">Delete</button>
    `;
    taskList.appendChild(taskElement);
}

// Save Tasks to Local Storage
function saveTasksToLocalStorage() {
    const tasks = [];
    document.querySelectorAll('.task span').forEach(task => {
        tasks.push(task.textContent);
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Load Tasks from Local Storage
function loadTasksFromLocalStorage() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => addTaskToList(task));
}
