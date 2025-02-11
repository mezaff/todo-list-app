const todayDate = document.querySelector(".todayDate");
const todayTime = document.querySelector(".todayTime");

const levelInput = document.getElementById("levelInput");
const dateInput = document.getElementById("dateInput");
const taskInput = document.getElementById("taskInput");
const addButton = document.getElementById("addButton");
const cancelButton = document.getElementById("cancelButton");
const lowToggle = document.getElementById("lowToggle");
const mediumToggle = document.getElementById("mediumToggle");
const highToggle = document.getElementById("highToggle");
const lowTask = document.querySelector(".low-task");
const mediumTask = document.querySelector(".medium-task");
const highTask = document.querySelector(".high-task");
const removeAllButtonLow = document.getElementById("removeAllButtonLow");
const removeAllButtonMedium = document.getElementById("removeAllButtonMedium");
const removeAllButtonHigh = document.getElementById("removeAllButtonHigh");
const removeAllButtonDone = document.getElementById("removeAllButtonDone");
const todoListLow = document.getElementById("todoListLow");
const todoListMedium = document.getElementById("todoListMedium");
const todoListHigh = document.getElementById("todoListHigh");
const doneList = document.getElementById("doneList");

todayDate.textContent = dateNow();

function timeNow() {
  const date = new Date();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");
  return `${hours}:${minutes}:${seconds}`;
}
setInterval(() => {
  todayTime.textContent = timeNow();
}, 1000);

addButton.addEventListener("click", () => addTask());
cancelButton.addEventListener("click", () => {
  taskInput.value = "";
  levelInput.value = "";
  dateInput.value = "";
  taskInput.focus();
});

lowToggle.addEventListener("click", () => {
  lowToggle.classList.add(
    "text-[#12a195]",
    "border-b",
    "-mb-2",
    "border-[#12a195]",
    "pb-2"
  );
  lowToggle.classList.remove("text-gray-500");

  mediumToggle.classList.remove(
    "text-[#12a195]",
    "border-b",
    "-mb-2",
    "border-[#12a195]",
    "pb-2"
  );
  mediumToggle.classList.add("text-gray-500");

  highToggle.classList.remove(
    "text-[#12a195]",
    "border-b",
    "-mb-2",
    "border-[#12a195]",
    "pb-2"
  );
  highToggle.classList.add("text-gray-500");

  lowTask.classList.remove("hidden");
  mediumTask.classList.add("hidden");
  highTask.classList.add("hidden");
});

mediumToggle.addEventListener("click", () => {
  mediumToggle.classList.add(
    "text-[#12a195]",
    "border-b",
    "-mb-2",
    "border-[#12a195]",
    "pb-2"
  );
  mediumToggle.classList.remove("text-gray-500");

  lowToggle.classList.remove(
    "text-[#12a195]",
    "border-b",
    "-mb-2",
    "border-[#12a195]",
    "pb-2"
  );
  lowToggle.classList.add("text-gray-500");

  highToggle.classList.remove(
    "text-[#12a195]",
    "border-b",
    "-mb-2",
    "border-[#12a195]",
    "pb-2"
  );
  highToggle.classList.add("text-gray-500");

  lowTask.classList.add("hidden");
  mediumTask.classList.remove("hidden");
  highTask.classList.add("hidden");
});

highToggle.addEventListener("click", () => {
  highToggle.classList.add(
    "text-[#12a195]",
    "border-b",
    "-mb-2",
    "border-[#12a195]",
    "pb-2"
  );
  highToggle.classList.remove("text-gray-500");

  lowToggle.classList.remove(
    "text-[#12a195]",
    "border-b",
    "-mb-2",
    "border-[#12a195]",
    "pb-2"
  );
  lowToggle.classList.add("text-gray-500");

  mediumToggle.classList.remove(
    "text-[#12a195]",
    "border-b",
    "-mb-2",
    "border-[#12a195]",
    "pb-2"
  );
  mediumToggle.classList.add("text-gray-500");

  lowTask.classList.add("hidden");
  mediumTask.classList.add("hidden");
  highTask.classList.remove("hidden");
});

function dateNow() {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const date = new Date();
  const dayName = days[date.getDay()];
  const day = date.getDate();
  const monthName = months[date.getMonth()];
  const year = date.getFullYear();

  return `${dayName}, ${day} ${monthName} ${year}`;
}

function timeNow() {
  const date = new Date();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  return `${hours}:${minutes}:${seconds}`;
}

function addTask() {
  const level = levelInput.value;
  const date = dateInput.value;
  const task = taskInput.value;

  if (!level) {
    alert("Please select a priority level");
    return;
  }

  if (!date) {
    alert("Please select a date");
    return;
  }

  if (!task) {
    alert("Please write a task title");
    return;
  }

  const newTaskItem = {
    taskLevel: level,
    taskDate: formatDueDate(date),
    taskTitle: task,
    done: false,
  };

  renderTask(newTaskItem);

  taskInput.value = "";
  levelInput.value = "";
  dateInput.value = "";
  taskInput.focus();
}

function renderTask(taskObj) {
  const row = document.createElement("tr");

  const topColumn = document.createElement("td");
  topColumn.className = "p-2 text-sm border border-gray-200";

  const inputGroup = document.createElement("div");
  inputGroup.className = "flex items-center gap-2";

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.name = "taskCheck";

  checkbox.addEventListener("change", () => {
    if (checkbox.checked) {
      titleColumn.classList.add("line-through", "text-gray-400");
      doneList.appendChild(row);
    } else {
      titleColumn.classList.remove("line-through", "text-gray-400");
      if (taskObj.taskLevel === "Low") {
        lowToggle.click();
        todoListLow.appendChild(row);
      } else if (taskObj.taskLevel === "Medium") {
        mediumToggle.click();
        todoListMedium.appendChild(row);
      } else if (taskObj.taskLevel === "High") {
        highToggle.click();
        todoListHigh.appendChild(row);
      }
    }
  });

  const dotColumn = document.createElement("span");
  dotColumn.className = "dotColumn w-2 h-2 rounded-full";

  function parseDate(dateStr) {
    const [day, month, year] = dateStr.split("/").map(Number);
    return new Date(year, month - 1, day);
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const taskDate = parseDate(taskObj.taskDate);

  if (taskDate.getTime() === today.getTime()) {
    dotColumn.classList.add("bg-yellow-500");
  } else if (taskDate < today) {
    dotColumn.classList.add("bg-red-500");
  } else {
    dotColumn.classList.add("bg-green-500");
  }

  const dateColumn = document.createElement("p");
  dateColumn.className = "text-xs text-gray-500";
  dateColumn.textContent = taskObj.taskDate;

  const titleColumn = document.createElement("p");
  titleColumn.className = "text-sm font-medium";
  titleColumn.textContent = taskObj.taskTitle;

  const bottomColumn = document.createElement("td");
  bottomColumn.className = "text-center text-xs border border-gray-200";

  const deleteButton = document.createElement("button");
  deleteButton.type = "button";
  deleteButton.className =
    "text-sm text-red-500 cursor-pointer hover:bg-red-100 px-3 py-1 rounded-md transition duration-300 ease-in-out";
  deleteButton.textContent = "Delete";
  deleteButton.addEventListener("click", () => {
    const yes = confirm("Are you sure you want to delete this task?");
    if (yes) {
      row.remove();
    }
  });

  bottomColumn.appendChild(deleteButton);
  inputGroup.appendChild(checkbox);
  inputGroup.appendChild(dotColumn);
  inputGroup.appendChild(dateColumn);
  inputGroup.appendChild(titleColumn);
  topColumn.appendChild(inputGroup);
  row.appendChild(topColumn);
  row.appendChild(bottomColumn);

  if (taskObj.taskLevel === "Low") {
    lowToggle.click();
    todoListLow.appendChild(row);
  } else if (taskObj.taskLevel === "Medium") {
    mediumToggle.click();
    todoListMedium.appendChild(row);
  } else if (taskObj.taskLevel === "High") {
    highToggle.click();
    todoListHigh.appendChild(row);
  }
}

function formatDueDate(inputDate) {
  const date = new Date(inputDate);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}
