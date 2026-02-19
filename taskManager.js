class Task {
constructor(id, name, description, assignedTo, dueDate, status) {
this.id = id;
this.name = name;
this.description = description;
this.assignedTo = assignedTo;
this.dueDate = dueDate;
this.status = status;
}
}

class TaskManager {
constructor() {
this.tasks = [];
this.currentId = 0;
}

addTask(name, description, assignedTo, dueDate, status) {
    const task = new Task(
        this.currentId++,
        name,
        description,
        assignedTo,
        dueDate,
        status
    );
    this.tasks.push(task);
    this.saveToLocalStorage();
}

deleteTask(taskId) {
    this.tasks = this.tasks.filter(task => task.id !== taskId);
    this.saveToLocalStorage();
}

updateTask(taskId, updatedData) {
    const task = this.tasks.find(task => task.id === taskId);
    if (task) {
        Object.assign(task, updatedData);
        this.saveToLocalStorage();
    }
}

assignTo(taskId, newUser) {
    const task = this.tasks.find(task => task.id === taskId);
    if (task) {
        task.assignedTo = newUser;
        this.saveToLocalStorage();
    }
}

saveToLocalStorage() {
    localStorage.setItem("tasks", JSON.stringify(this.tasks));
    localStorage.setItem("currentId", this.currentId);
}

loadFromLocalStorage() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    this.tasks = tasks;
    this.currentId = Number(localStorage.getItem("currentId")) || 0;
}
}
if (typeof module !== "undefined") {
    module.exports = { TaskManager, Task };
}
