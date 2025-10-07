const input = document.getElementById('task-input');
const addBtn = document.getElementById('add-btn');
const taskList = document.getElementById('task-list');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Display tasks on load
window.onload = renderTasks;

addBtn.addEventListener('click', addTask);
taskList.addEventListener('click', handleTaskActions);

function addTask() {
  const taskText = input.value.trim();
  if (taskText === '') return alert('Please enter a task!');
  
  const task = { text: taskText, completed: false };
  tasks.push(task);
  input.value = '';
  saveTasks();
  renderTasks();
}

function handleTaskActions(e) {
  const index = e.target.dataset.index;
  
  if (e.target.classList.contains('delete')) {
    tasks.splice(index, 1);
  } else {
    tasks[index].completed = !tasks[index].completed;
  }
  
  saveTasks();
  renderTasks();
}

function renderTasks() {
  taskList.innerHTML = '';
  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.className = task.completed ? 'completed' : '';
    li.innerHTML = `
      <span>${task.text}</span>
      <button class="delete" data-index="${index}">❌</button>
    `;
    li.addEventListener('click', () => {
      tasks[index].completed = !tasks[index].completed;
      saveTasks();
      renderTasks();
    });
    taskList.appendChild(li);
  });
}

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}
