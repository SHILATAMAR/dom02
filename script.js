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

// משתנה ששומר את הסינון הנוכחי
let currentFilter = "all";

// פונקציה שמעדכנת את מספר המשימות שנותרו לביצוע
function updateLeftCount() {
    const activeTasks = document.querySelectorAll("#task-list li:not(.done)");
    const leftElement = document.querySelector("#left");
    if (leftElement) {
        leftElement.textContent = activeTasks.length;
    }
}

// שלב 7: פונקציה לעדכון מצב הודעת רשימה ריקה
function updateEmptyState() {
    const emptyElement = document.querySelector("#empty");
    if (!emptyElement) return;

    const items = taskList.querySelectorAll("li");
    if (items.length === 0) {
        emptyElement.hidden = false; // מציג את ההודעה כשאין משימות
    } else {
        emptyElement.hidden = true;  // מוסתר כשיש לפחות משימה אחת
    }
}

// שלב 5: פונקציה להחלת הסינון על המשימות
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

// שלב 5: מאזין ללחיצה על כפתורי הסינון
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

// שלב 6: כפתור ניקוי משימות שבוצעו
if (clearCompletedBtn) {
    clearCompletedBtn.addEventListener("click", () => {
        const completedTasks = document.querySelectorAll("#task-list li.done");
        completedTasks.forEach(li => li.remove());
        updateLeftCount();
        applyFilter();
        updateEmptyState(); // עדכון מצב רשימה ריקה
    });
}

// מאזין יחיד לכל הרשימה (Event Delegation) למחיקה וסימון
taskList.addEventListener("click", (e) => {
    const deleteButton = e.target.closest(".delete");
    if (deleteButton) {
        const li = deleteButton.closest("li");
        if (li) {
            li.remove();
            updateLeftCount();
            updateEmptyState(); // עדכון מצב רשימה ריקה
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

// הוספת משימה
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
    updateEmptyState(); // עדכון מצב רשימה ריקה בהוספה

    taskInput.value = "";
    taskInput.focus();
});

// הפעלה ראשונית של מצב רשימה ריקה בטעינת העמוד
updateEmptyState();

// Step 3: delete with the x button (one listener on the ul - event delegation)
// מאזין אחד בלבד על כל הרשימה (Event Delegation)

// Step 4: "tasks left" counter

// Step 5: filters (All / Active / Done)

// Step 6: Clear completed

// Step 7: show the empty message only when there are no tasks

// Bonus: block duplicate tasks ("This task already exists")
