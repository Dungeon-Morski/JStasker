const taskInput = document.querySelector(".taskInput");
const addBtn = document.querySelector(".addBtn");
const resultsBlock = document.querySelector(".results");

let tasks = [
  {
    title: "Покормить кота",
    completed: false,
  },
  {
    title: "Помыть посуду",
    completed: true,
  },
  {
    title: "Сделать домашку",
    completed: false,
  },
  {
    title: "Выкинуть мусор",
    completed: false,
  },
  {
    title: "Скинуть долг",
    completed: false,
  },
  {
    title: "Выучить английский",
    completed: false,
  },
];

addBtn.addEventListener("click", () => {
  if (taskInput.value === "") {
    return undefined;
  }
  const newTask = {
    title: taskInput.value,
    completed: false,
  };
  tasks.push(newTask);

  resultsBlock.insertAdjacentHTML("beforeend", getTaskTemplate(newTask));
  render();

  taskInput.value = "";
});

resultsBlock.addEventListener("click", (event) => {
  if (event.target.dataset.index) {

    let index = parseInt(event.target.dataset.index);

    let type = event.target.dataset.type;

    if (type === "delete") {
      tasks.splice(index, 1);
    } else if (type === "ok") {
      tasks[index].completed = !tasks[index].completed;
    }
  }

  render();
});

render();

function render() {
    resultsBlock.innerHTML = "";
  if (tasks.length === 0) {
    resultsBlock.innerHTML = "<p>Нет заметок </p>";
  }
  
  for (let index = 0; index < tasks.length; index++) {
    resultsBlock.insertAdjacentHTML(
      "beforeend",
      getTaskTemplate(tasks[index], index),
    );
  }
}

function getTaskTemplate(task, index) {
  return `
  <div class="result_item d-flex justify-content-between align-items-center align-content-center ${task.completed ? "order-3" : ""}">
    <p class="${task.completed ? "text-decoration-line-through" : ""}">${
    task.title
  } </p>
    <div class="control">
        <button class="ok" data-index="${index}" data-type="ok">OK</button>
        <button class="delete" data-index="${index}" data-type="delete">Delete</button>
    </div>
</div>
  `;
}
