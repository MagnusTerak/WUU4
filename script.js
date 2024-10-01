let allTasks = [];

document.querySelector('form').addEventListener('submit', handleSubmitForm);
document.getElementById('clearList').addEventListener('click', handleClearAll);

function handleSubmitForm(e) {
    e.preventDefault();

    let input = document.querySelector('input');
    let errorEntry = document.querySelector('.invalidEntry');
    errorEntry.innerHTML = "";

    if (input.value != '') {
        // Task array implementation
        const currentTask = {
            id: allTasks.length - 1,
            value: input.value,
            done: false 
        }
        allTasks.push(currentTask);
    
        // Refreshing tasks & resetting input
        refreshTasks();
        input.value = "";
    } else {
        errorEntry.innerHTML = "Invalid entry, make sure to submit a task!";
        errorEntry.style.color = "orange";
    }
};

function refreshTasks() {
    let ul = document.querySelector('ul');
    ul.innerHTML = "";

    // For loop to refresh all tasks and update the ul element with new li elements
    allTasks.forEach(currentTask => {
        let li = document.createElement('li');

        li.innerHTML = `
            <span class="todoItem">${currentTask.value}</span>
        `;

        // Check button connected to the li element
        let checkButton = document.createElement('button');
        checkButton.innerHTML = `<i class="fas fa-check-square"></i>`;
        checkButton.onclick = () => checkTodo(li, checkButton, currentTask);

        // Deletebutton connected to the li element
        let deleteButton = document.createElement('button');
        deleteButton.innerHTML = `<i class="fas fa-trash"></i>`;
        deleteButton.onclick = () => deleteTodo(currentTask);

        li.appendChild(checkButton);
        li.appendChild(deleteButton);

        // Adding class to the li element & checks if the task in the array has the done argument set to true, if so it changes textDecoration attribute
        li.classList.add('todoListItem');

        if (currentTask.done) {
            li.style.textDecoration = "line-through"
        }

        ul.appendChild(li);
    });

    // Function to trigger taskcount refresh
    refreshTaskCount();
}

function refreshTaskCount() {
    let tasksCompleted = 0;
    pText = document.querySelector(".taskCompleted");
    
    // For loop to check all tasks that is marked with done & increases the tasksCompleted variabel
    allTasks.forEach(currentTask => {
        if (currentTask.done) {
            tasksCompleted++
        }
    });

    // Changes innerHTML to keep up with correct number of tasks completed
    pText.innerHTML = "Tasks Completed: <strong>" + tasksCompleted + "</strong>"
} 

function checkTodo(taskHandle, checkButton, taskData) {
    let item = taskHandle;
    let btn = checkButton;

    // if statement to see if the task is going to get "checked" or "unchecked" & some style changes
    if (item.style.textDecoration == 'line-through') {
        item.style.textDecoration = 'none';
        btn.style.color = "black";
    } else {
        item.style.textDecoration = 'line-through';
        btn.style.color = "green";
    }

    // Updating the Array
    allTasks.forEach(currentTask => {
        if (currentTask.id == taskData.id) {
            currentTask.done = !currentTask.done;
        }
    });

    refreshTaskCount();
} 

function deleteTodo(task) {
    let item = task;

    // Splices task from array and refreshes tasks with our function
    allTasks.splice(item.id, 1);

    refreshTasks();
}

function handleClearAll(e) {
    // resets array and clears ul element
    document.querySelector('ul').innerHTML = '';
    allTasks = [];
    refreshTaskCount();
}