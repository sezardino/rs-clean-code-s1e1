// Accessing DOM elements
const newTaskInputEl = document.getElementById("new-task"); // Input field for a new task
const addButtonEl = document.querySelector("button"); // "Add" button
const listOfIncompleteTasksEl = document.getElementById("incomplete-tasks"); // List of incomplete tasks
const listOfCompletedTasksEl = document.getElementById("completed-tasks"); // List of completed tasks

// Function to create a new task element
const createNewTaskElement = (taskString) => {
  const listItem = document.createElement("li");

  // Create child elements
  const checkBox = document.createElement("input");
  const label = document.createElement("label");
  const editInput = document.createElement("input");
  const editButton = document.createElement("button");
  const deleteButton = document.createElement("button");
  const deleteButtonImg = document.createElement("img");

  // Set attributes and content
  checkBox.type = "checkbox";
  label.innerText = taskString;
  label.className = "task";

  editInput.type = "text";
  editInput.className = "task";

  editButton.innerText = "Edit";
  editButton.className = "edit";

  deleteButton.className = "delete";
  deleteButtonImg.src = "./remove.svg";
  deleteButtonImg.alt = "Remove";
  deleteButton.appendChild(deleteButtonImg);

  // Append child elements to the list item
  listItem.append(checkBox, label, editInput, editButton, deleteButton);

  return listItem;
};

// Function to add a new task
const addTaskHandler = () => {
  if (!newTaskInputEl || !listOfIncompleteTasksEl) return;

  if (!newTaskInputEl.value.trim()) return; // Prevent creation of an empty task
  const listItem = createNewTaskElement(newTaskInputEl.value.trim());
  listOfIncompleteTasksEl.appendChild(listItem);
  bindTaskEvents(listItem, markTaskCompleted);
  newTaskInputEl.value = ""; // Clear the input field
};

// Function to edit an existing task
const editTaskHandler = function () {
  const listItem = this.parentNode;
  const editInput = listItem.querySelector('input[type="text"]');
  const label = listItem.querySelector("label");
  const editButton = listItem.querySelector(".edit");
  const isEditMode = listItem.classList.contains("edit-mode");

  if (isEditMode) {
    // Save edited task
    label.innerText = editInput.value.trim();
    editButton.innerText = "Edit";
  } else {
    // Enter edit mode
    editInput.value = label.innerText;
    editButton.innerText = "Save";
  }
  listItem.classList.toggle("edit-mode"); // Toggle edit mode
};

// Function to delete a task
const deleteTaskHandler = function () {
  const listItem = this.parentNode;
  listItem.remove(); // Remove the task from the list
};

// Function to mark a task as completed
const markTaskCompleted = function () {
  if (!listOfCompletedTasksEl) return;

  const listItem = this.parentNode;
  listOfCompletedTasksEl.appendChild(listItem); // Move the task to the completed list
  bindTaskEvents(listItem, markTaskToIncompleteHandler);
};

// Function to mark a task as incomplete
const markTaskToIncompleteHandler = function () {
  if (!listOfIncompleteTasksEl) return;

  const listItem = this.parentNode;
  listOfIncompleteTasksEl.appendChild(listItem); // Move the task back to the incomplete list
  bindTaskEvents(listItem, markTaskCompleted);
};

// Function to bind event handlers to task elements
const bindTaskEvents = (taskListItem, checkBoxEventHandler) => {
  const checkBox = taskListItem.querySelector('input[type="checkbox"]');
  const editButton = taskListItem.querySelector(".edit");
  const deleteButton = taskListItem.querySelector(".delete");

  // Attach event listeners
  editButton.onclick = editTaskHandler; // Bind edit task functionality
  deleteButton.onclick = deleteTaskHandler; // Bind delete task functionality
  checkBox.onchange = checkBoxEventHandler; // Bind checkbox functionality
};

// Bind events to existing incomplete tasks
Array.from(listOfIncompleteTasksEl?.children || []).forEach((task) =>
  bindTaskEvents(task, markTaskCompleted)
);

// Bind events to existing completed tasks
Array.from(listOfCompletedTasksEl?.children || []).forEach((task) =>
  bindTaskEvents(task, markTaskToIncompleteHandler)
);

// Add click event to the "Add" button
addButtonEl?.addEventListener("click", addTaskHandler);
