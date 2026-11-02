// Exercise 2 - Task Board
// Write all your code in this file. Read README.md for the full instructions.
// Run the tests with: npm test

// Step 1: add a task on submit (no reload, clear + focus the input, "Please type a task" error)
const taskForm = document.querySelector("#task-form");
const taskInput = document.querySelector("#task-input");
const prioritySelect = document.querySelector("#priority-select");
const taskList = document.querySelector("#task-list");
const errorElement = document.querySelector("#error");
const filtersContainer = document.querySelector("#filters");
const clearCompletedBtn = document.getElementById("clear-done");

let currentFilter = "all";

function updateLeftCount() {
    const activeTasks = document.querySelectorAll("#task-list li:not(.done)");
    const leftElement = document.querySelector("#left");
    if (leftElement) {
        leftElement.textContent = activeTasks.length;
    }
}

function updateEmptyState() {
    const emptyElement = document.querySelector("#empty");
    if (!emptyElement) return;

    const items = taskList.querySelectorAll("li");
    if (items.length === 0) {
        emptyElement.hidden = false;
    } else {
        emptyElement.hidden = true;
    }
}

function applyFilter() {
    const items = taskList.querySelectorAll("li");
    items.forEach(li => {
        const isDone = li.classList.contains("done");

        if (currentFilter === "all") {
            li.hidden = false;
        } else if (currentFilter === "active") {
            li.hidden = isDone;
        } else if (currentFilter === "done") {
            li.hidden = !isDone;
        }
    });
}

if (filtersContainer) {
    filtersContainer.addEventListener("click", (e) => {
        const button = e.target.closest("button[data-filter]");
        if (!button) return;

        const buttons = filtersContainer.querySelectorAll("button");
        buttons.forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");

        currentFilter = button.dataset.filter;
        applyFilter();
    });
}

if (clearCompletedBtn) {
    clearCompletedBtn.addEventListener("click", () => {
        const completedTasks = document.querySelectorAll("#task-list li.done");
        completedTasks.forEach(li => li.remove());
        updateLeftCount();
        applyFilter();
        updateEmptyState();
    });
}

taskList.addEventListener("click", (e) => {
    const deleteButton = e.target.closest(".delete");
    if (deleteButton) {
        const li = deleteButton.closest("li");
        if (li) {
            li.remove();
            updateLeftCount();
            updateEmptyState();
        }
        return;
    }

    const li = e.target.closest("li");
    if (li) {
        li.classList.toggle("done");
        updateLeftCount();
        applyFilter();
    }
});

taskForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const taskText = taskInput.value.trim();

    if (taskText === "") {
        errorElement.textContent = "Please type a task";
        errorElement.hidden = false;
        return;
    }

    errorElement.hidden = true;

    const li = document.createElement("li");
    const priorityValue = prioritySelect.value;
    li.classList.add(`priority-${priorityValue}`);

    const span = document.createElement("span");
    span.classList.add("text");
    span.textContent = taskText;

    const button = document.createElement("button");
    button.classList.add("delete");
    button.textContent = "x";

    li.appendChild(span);
    li.appendChild(button);

    taskList.appendChild(li);

    updateLeftCount();
    applyFilter();
    updateEmptyState();

    taskInput.value = "";
    taskInput.focus();
});

updateEmptyState();

// Step 3: delete with the x button (one listener on the ul - event delegation)

// Step 4: "tasks left" counter

// Step 5: filters (All / Active / Done)

// Step 6: Clear completed

// Step 7: show the empty message only when there are no tasks

// Bonus: block duplicate tasks ("This task already exists")
