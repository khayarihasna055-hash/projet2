document.addEventListener("DOMContentLoaded", () => {

    const taskInput = document.getElementById("task-input");
    const addTaskBtn = document.getElementById("add-task-btn");
    const taskList = document.getElementById("task-list");
    const emptyImage = document.querySelector(".empty-image");
    const clearAllBtn = document.getElementById("clear-all");

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    function saveTasks() {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    function toggleEmptyImage() {
        emptyImage.style.display = tasks.length === 0 ? "block" : "none";
    }

    function renderTasks() {
        taskList.innerHTML = "";

        tasks.forEach((task, index) => {
            const li = document.createElement("li");
            li.className = "task-item";

            const textDiv = document.createElement("div");

            const span = document.createElement("span");
            span.textContent = task.text;
            span.className = "task-text";
            if (task.completed) span.classList.add("completed");

            const date = document.createElement("div");
            date.textContent = task.date;
            date.className = "task-date";

            span.addEventListener("click", () => {
                task.completed = !task.completed;
                saveTasks();
                renderTasks();
            });

            textDiv.appendChild(span);
            textDiv.appendChild(date);

            const deleteBtn = document.createElement("button");
            deleteBtn.innerHTML = '<i class="fa-solid fa-trash"></i>';
            deleteBtn.className = "delete-btn";

            deleteBtn.addEventListener("click", () => {
                tasks.splice(index, 1);
                saveTasks();
                renderTasks();
            });

            li.appendChild(textDiv);
            li.appendChild(deleteBtn);
            taskList.appendChild(li);
        });

        toggleEmptyImage();
    }

    function addTask(e) {
        e.preventDefault();

        const text = taskInput.value.trim();
        if (!text) return;

        tasks.push({
            text: text,
            completed: false,
            date: new Date().toLocaleDateString()
        });

        taskInput.value = "";
        saveTasks();
        renderTasks();
    }

    addTaskBtn.addEventListener("click", addTask);

    clearAllBtn.addEventListener("click", () => {
        tasks = [];
        saveTasks();
        renderTasks();
    });

    renderTasks();
});


