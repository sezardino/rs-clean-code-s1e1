// DOM Elements
const taskInput = document.querySelector("#new-task");
const addButton = document.querySelector(".todo__button--add");
const incompleteTasksHolder = document.querySelector("#incomplete-tasks");
const completedTasksHolder = document.querySelector("#completed-tasks");

// Create a new task item
const createNewTaskElements = (taskText) => {
  const listItem = document.createElement("li");
  listItem.className = "todo__item";

  listItem.innerHTML = `
    <input type="checkbox" class="todo__checkbox" aria-label="Mark as complete">
    <label class="todo__text">${taskText}</label>
    <input type="text" class="todo__input">
    <button class="todo__button todo__button--edit" aria-label="Edit Task">Edit</button>
    <button class="todo__button todo__button--delete" aria-label="Delete Task">
      <img src="./assets/remove-icon.svg" alt="Delete Task">
    </button>
  `;

  return listItem;
};

// Add a new task
const addNewTaskHandler = () => {
  if (!taskInput || !incompleteTasksHolder) return;

  const taskText = taskInput.value.trim();
  if (!taskText) return;

  const newTask = createNewTaskElements(taskText);
  incompleteTasksHolder.appendChild(newTask);
  bindTaskEvents(newTask, completeTask);

  taskInput.value = "";
};

// Edit a task
const editTaskHandler = (button) => {
  const listItem = button.parentElement;
  const editInput = listItem.querySelector(".todo__input");
  const label = listItem.querySelector(".todo__text");

  const isEditMode = listItem.classList.toggle("edit-mode");

  if (isEditMode) {
    editInput.value = label.textContent;
    button.textContent = "Save";
  } else {
    label.textContent = editInput.value.trim();
    button.textContent = "Edit";
  }
};

// Delete a task
const deleteTaskHandler = (button) => {
  const listItem = button.parentElement;
  listItem.remove();
};

// Mark a task as complete
const completeTask = (checkbox) => {
  if (!completedTasksHolder) return;

  const listItem = checkbox.parentElement;
  completedTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, incompleteTask);
};

// Mark a task as incomplete
const incompleteTask = (checkbox) => {
  if (!incompleteTasksHolder) return;

  const listItem = checkbox.parentElement;
  incompleteTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, completeTask);
};

// Bind events to task item
const bindTaskEvents = (taskItem, checkboxHandler) => {
  const checkbox = taskItem.querySelector(".todo__checkbox");
  const editButton = taskItem.querySelector(".todo__button--edit");
  const deleteButton = taskItem.querySelector(".todo__button--delete");

  checkbox.onchange = () => checkboxHandler(checkbox);
  editButton.onclick = () => editTaskHandler(editButton);
  deleteButton.onclick = () => deleteTaskHandler(deleteButton);
};

// Bind existing tasks
[...(incompleteTasksHolder?.children || [])].forEach((task) =>
  bindTaskEvents(task, completeTask)
);
[...(completedTasksHolder?.children || [])].forEach((task) =>
  bindTaskEvents(task, incompleteTask)
);

// Add task event
addButton?.addEventListener("click", addNewTaskHandler);
