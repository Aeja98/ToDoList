"use strict";
//Create todo class w methods
class TodoList {
    //constructor to initialize todo array & load tasks from storage
    constructor() {
        /*
            attribute: similar to variables -> hold the data
                [todos = attribute]
            method: similar to functions -> define what variables do/their behavior
                Methods in TodoList class:
                [addTodo]  [markTodoCompleted]
                [getTodos]     [saveToLocalStorage]
                [loadFromLocalStorage]
        */
        //todo array -> private so user has to interact with methods in order to alter array
        this.todos = [];
        this.loadFromLocalStorage();
    }
    //method to add tasks -> return true or false
    addTodo(task, priority) {
        //returns false if the task is empty/prio isnt 1-3
        if (!task || priority < 1 || priority > 3) {
            return false;
        }
        const newTodo = {
            task,
            completed: false,
            priority,
        };
        this.todos.push(newTodo);
        this.saveToLocalStorage();
        return true;
    }
    //method to mark tasks as completed
    markTodoCompleted(todoIndex) {
        if (this.todos[todoIndex]) {
            this.todos[todoIndex].completed = !this.todos[todoIndex].completed;
            this.saveToLocalStorage();
        }
    }
    //method to return full array
    getTodos() {
        return this.todos;
    }
    //method to save tasks to localstorage
    saveToLocalStorage() {
        localStorage.setItem("todos", JSON.stringify(this.todos));
    }
    //method to load tasks from localstorage
    loadFromLocalStorage() {
        const storedTodos = localStorage.getItem("todos");
        if (storedTodos) {
            this.todos = JSON.parse(storedTodos);
        }
    }
}
const form = document.querySelector("form");
const taskInput = document.getElementById("task");
const priorityInput = document.getElementById("priority");
const taskList = document.querySelector(".tasks");
const todoList = new TodoList();
//Event listener for submit button
form.addEventListener("submit", (e) => {
    e.preventDefault();
    const task = taskInput.value.trim();
    const priority = parseInt(priorityInput.value);
    if (todoList.addTodo(task, priority)) {
        console.log("Todo added!");
        renderTodos();
        form.reset();
    }
    else {
        console.log("Invalid input");
        alert("Please enter a task and choose a priority between 1 and 3.");
    }
});
//Display tasks to the list
function renderTodos() {
    taskList.innerHTML = "";
    //return full array of tasks, loops through array
    //then sorts tasks by priority & map each one w original index (which keeps track of the checkboxes & amkes sure the correct one is marked)
    const todosWithIndex = todoList.getTodos().map((todo, i) => (Object.assign(Object.assign({}, todo), { originalIndex: i })));
    const sortedTodos = todosWithIndex.sort((a, b) => a.priority - b.priority);
    sortedTodos.forEach((todo) => {
        const li = document.createElement("li");
        //add customized checkbox & format li element
        li.innerHTML = `
            <label class="customBox">
                <input type="checkbox" data-index="${todo.originalIndex}" ${todo.completed ? "checked" : ""}>
                <span class="checkmark"></span>
                <span class="taskText">${todo.priority}: ${todo.task}</span>
            </label>
        `;
        taskList.appendChild(li);
    });
}
//Event listener -> when checkbox is clicked => mark complete (also allows unchecking)
taskList.addEventListener("change", (e) => {
    const target = e.target;
    //makes sure the only thing that will be able to mark task as done is checkbox, not clicking somewhere else
    if (target.type === "checkbox") {
        const index = parseInt(target.dataset.index);
        todoList.markTodoCompleted(index);
        renderTodos();
    }
});
