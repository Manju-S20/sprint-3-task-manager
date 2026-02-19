const { TaskManager } = require("./taskManager");

// 🔥 Mock localStorage for Jest
beforeAll(() => {
    global.localStorage = {
        store: {},
        setItem(key, value) {
            this.store[key] = value;
        },
        getItem(key) {
            return this.store[key] || null;
        },
        clear() {
            this.store = {};
        }
    };
});

describe("TaskManager Unit Tests", () => {

    let taskManager;

    beforeEach(() => {
        localStorage.clear();   // clear storage before each test
        taskManager = new TaskManager();
    });

    // -----------------------------
    // Test 1: Add Task
    // -----------------------------
    test("Add Task should add a new task with correct properties", () => {

        taskManager.addTask(
            "Task 1",
            "Test Description",
            "John",
            "2025-01-01",
            "To Do"
        );

        expect(taskManager.tasks.length).toBe(1);

        const task = taskManager.tasks[0];

        expect(task.id).toBe(0);
        expect(task.name).toBe("Task 1");
        expect(task.description).toBe("Test Description");
        expect(task.assignedTo).toBe("John");
        expect(task.dueDate).toBe("2025-01-01");
        expect(task.status).toBe("To Do");
    });

    // -----------------------------
    // Test 2: Delete Task
    // -----------------------------
    test("Delete Task should remove the correct task", () => {

        taskManager.addTask("Task 1", "Desc", "John", "2025-01-01", "To Do");
        taskManager.addTask("Task 2", "Desc", "Mike", "2025-02-01", "Done");

        taskManager.deleteTask(0);

        expect(taskManager.tasks.length).toBe(1);
        expect(taskManager.tasks[0].name).toBe("Task 2");
    });

    // -----------------------------
    // Test 3: Update Task
    // -----------------------------
    test("Update Task should update all task fields correctly", () => {

        taskManager.addTask("Task 1", "Desc", "John", "2025-01-01", "To Do");

        taskManager.updateTask(0, {
            name: "Updated Task",
            description: "Updated Description",
            assignedTo: "Mike",
            dueDate: "2025-02-01",
            status: "Done"
        });

        const updatedTask = taskManager.tasks[0];

        expect(updatedTask.name).toBe("Updated Task");
        expect(updatedTask.description).toBe("Updated Description");
        expect(updatedTask.assignedTo).toBe("Mike");
        expect(updatedTask.dueDate).toBe("2025-02-01");
        expect(updatedTask.status).toBe("Done");
    });

    // -----------------------------
    // Test 4: Assign To
    // -----------------------------
    test("Assign To should change only the assigned user", () => {

        taskManager.addTask("Task 1", "Desc", "John", "2025-01-01", "To Do");

        taskManager.assignTo(0, "Sarah");

        const task = taskManager.tasks[0];

        expect(task.assignedTo).toBe("Sarah");
        expect(task.name).toBe("Task 1");
    });

});