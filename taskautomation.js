// Initialize task list from localStorage, if available
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

const taskForm = document.getElementById('taskForm');
const showOutputButton = document.getElementById('showOutputButton');
const taskOutputSection = document.querySelector('.task-output');
const taskOutputList = document.getElementById('taskOutputList');
const backButton = document.getElementById('backButton');
const mainFormSection = document.querySelector('.task-form');

// Save the task
taskForm.addEventListener('submit', function(event) {
  event.preventDefault();

  const taskName = document.getElementById('taskName').value.trim();
  const taskDescription = document.getElementById('taskDescription').value.trim();
  const taskTime = document.getElementById('taskTime').value;

  if (taskName && taskDescription && taskTime) {
    const newTask = {
      id: tasks.length + 1,
      name: taskName,
      description: taskDescription,
      time: taskTime
    };

    tasks.push(newTask);

    localStorage.setItem('tasks', JSON.stringify(tasks));
    alert('Task saved!');
    taskForm.reset();
  }
});

// Show saved tasks
showOutputButton.addEventListener('click', () => {
  taskOutputList.innerHTML = '';

  if (tasks.length === 0) {
    taskOutputList.innerHTML = '<li>No tasks saved.</li>';
  } else {
    tasks.forEach(task => {
      const li = document.createElement('li');
      li.textContent = `${task.time} - ${task.name}: ${task.description}`;
      taskOutputList.appendChild(li);
    });
  }

  mainFormSection.style.display = 'none';
  taskOutputSection.style.display = 'block';
});

// Back button to form
backButton.addEventListener('click', () => {
  taskOutputSection.style.display = 'none';
  mainFormSection.style.display = 'block';
});

// Notification function to alert at task time
function triggerTaskNotifications() {
  const currentTime = new Date().toLocaleTimeString('en-GB', { hour12: false }).slice(0, 5);

  tasks.forEach(task => {
    if (task.time === currentTime) {
      alert(`Reminder: ${task.name} - ${task.description}`);
    }
  });
}

// Check every minute
setInterval(triggerTaskNotifications, 60000);
