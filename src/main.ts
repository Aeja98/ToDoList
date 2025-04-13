//Create interface for the tasks
interface Todo {
    task: string;
    completed: boolean;
    priority: number //importance=> 1=high 2=med 3=low
}

//Create todo class w methods
class TodoList {

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
    private todos: Todo[] = [];

    //constructor to initialize todo array & load tasks from storage
    constructor(){
        this.loadFromLocalStorage();
    }

    //method to add tasks -> return true or false
    addTodo (task: string, priority:number):boolean {

        //returns false if the task is empty/prio isnt 1-3
        if (!task || priority < 1 || priority >3) {
            return false;
        }

        const newTodo: Todo = {
            task,
            completed: false,
            priority,
        };

        this.todos.push(newTodo);
        this.saveToLocalStorage();
        return true;
    }
    
    //method to mark todos as completed
    markTodoCompleted (todoIndex: number): void {
        if (this.todos[todoIndex]) {
            this.todos[todoIndex].completed = true;
            this.saveToLocalStorage();
        }
    }

    //method to return full todo array
    getTodos(): Todo[] {
        return this.todos;
    }

        //method to save tasks to localstorage
        saveToLocalStorage():void {
        localStorage.setItem("todos", JSON.stringify(this.todos));
    }

    //method to load tasks from localstorage
    loadFromLocalStorage():void {
        const storedTodos = localStorage.getItem("todos");
        if (storedTodos) {
            this.todos = JSON.parse(storedTodos);
        }
    }
}

