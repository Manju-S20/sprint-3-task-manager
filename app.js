const taskManager = new TaskManager();
taskManager.loadFromLocalStorage();

const form = document.getElementById("taskForm");
const taskList = document.getElementById("taskList");
const submitButton = document.getElementById("submitButton");

let editTaskId = null;

function validateForm(name, description, assignedTo, dueDate, status) {
if (!name || !description || !assignedTo || !dueDate || !status) {
alert("All fields are required.");
return false;
}
return true;
}

function clearForm() {
form.reset();
submitButton.textContent = "Save";
editTaskId = null;
}

function renderTasks() {
taskList.innerHTML = "";


taskManager.tasks.forEach(task => {
    const li = document.createElement("li");

    li.innerHTML = `
        <strong>${task.name}</strong><br>
        ${task.description}<br>
        Assigned To: ${task.assignedTo}<br>
        Due: ${task.dueDate}<br>
        Status: ${task.status}<br>
        <button class="small" onclick="editTask(${task.id})">Edit</button>
        <button class="small" onclick="deleteTask(${task.id})">Delete</button>
    `;

    taskList.appendChild(li);
});

}

form.addEventListener("submit", function(e) {
e.preventDefault();

const name = document.getElementById("name").value.trim();
const description = document.getElementById("description").value.trim();
const assignedTo = document.getElementById("assignedTo").value.trim();
const dueDate = document.getElementById("dueDate").value;
const status = document.getElementById("status").value;

if (!validateForm(name, description, assignedTo, dueDate, status)) return;

if (editTaskId !== null) {
    taskManager.updateTask(editTaskId, {
        name,
        description,
        assignedTo,
        dueDate,
        status
    });
} else {
    taskManager.addTask(name, description, assignedTo, dueDate, status);
}

clearForm();
renderTasks();

});

function deleteTask(id) {
taskManager.deleteTask(id);
renderTasks();
}

function editTask(id) {
const task = taskManager.tasks.find(t => t.id === id);

document.getElementById("name").value = task.name;
document.getElementById("description").value = task.description;
document.getElementById("assignedTo").value = task.assignedTo;
document.getElementById("dueDate").value = task.dueDate;
document.getElementById("status").value = task.status;

editTaskId = id;
submitButton.textContent = "Update";

}

renderTasks();
