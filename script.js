let completedCount = 0;
let uncompletedCount = 0;

function updateSummary() {
  document.getElementById("taskSummary").textContent =
    `Completed: ${completedCount} | Uncompleted: ${uncompletedCount}`;
}

function addTask() {
  const input = document.getElementById("taskInput");
  const taskText = input.value.trim();
  if (taskText === "") return;

  const li = document.createElement("li");

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";

  const span = document.createElement("span");
  span.textContent = taskText;

  checkbox.addEventListener("change", function () {
    if (checkbox.checked) {
      span.classList.add("completed-text");
      completedCount++;
      uncompletedCount--;
    } else {
      span.classList.remove("completed-text");
      completedCount--;
      uncompletedCount++;
    }
    updateSummary();
  });

  const taskLeft = document.createElement("div");
  taskLeft.className = "task-left";
  taskLeft.appendChild(checkbox);
  taskLeft.appendChild(span);

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.onclick = () => {
    if (checkbox.checked) completedCount--;
    else uncompletedCount--;
    li.remove();
    updateSummary();
  };

  const editBtn = document.createElement("button");
  editBtn.textContent = "Edit";
  editBtn.onclick = () => {
    const newText = prompt("Edit your task:", span.textContent);
    if (newText !== null && newText.trim() !== "") {
      span.textContent = newText.trim();
    }
  };

  const buttonGroup = document.createElement("div");
  buttonGroup.className = "task-buttons";
  buttonGroup.appendChild(deleteBtn);
  buttonGroup.appendChild(editBtn);

  li.appendChild(taskLeft);
  li.appendChild(buttonGroup);

  document.getElementById("taskList").appendChild(li);
  input.value = "";

  uncompletedCount++;
  updateSummary();
}
