function createTaskForm(projectDiv, project) {
        const form = document.createElement('form');
        const taskNameLabel = document.createElement('label');
        const taskNameInput = document.createElement('input');
        const taskDescriptionLabel = document.createElement('label');
        const taskDescriptionInput = document.createElement('input');
        const taskDueDateLabel = document.createElement('label');
        const taskDueDateInput = document.createElement('input');
        const taskPriorityLabel = document.createElement('label');
        const taskPriorityInput = document.createElement('input');
        const addTaskButton = document.createElement('input');

        taskNameLabel.innerText = "Task Name";
        taskNameLabel.htmlFor = "task-name";

        taskNameInput.id = "task-name";

        taskDescriptionLabel.innerText = "Description";
        taskDescriptionLabel.htmlFor = "task-description";

        taskDescriptionInput.id = "task-description";

        taskDueDateLabel.innerText = "Due Date";
        taskDueDateLabel.htmlFor = "task-due-date";

        taskDueDateInput.id = "task-due-date";
        taskDueDateInput.type = 'date';

        taskPriorityLabel.innerText = "Priority";
        taskPriorityLabel.htmlFor = "task-priority";

        taskPriorityInput.id = "task-priority";

        addTaskButton.value = "Add Task";
        addTaskButton.type = "button";

        addTaskButton.addEventListener("click", (e) => {
            const taskName = taskNameInput.value === "" ? "Unnamed task" : taskNameInput.value;
            const task = project.addTask(taskName);
            projectDiv.appendChild(createTaskDiv(task));
            form.remove();
        })

        form.appendChild(taskNameLabel);
        form.appendChild(taskNameInput);
        form.appendChild(taskDescriptionLabel);
        form.appendChild(taskDescriptionInput);
        form.appendChild(taskDueDateLabel);
        form.appendChild(taskDueDateInput);
        form.appendChild(taskPriorityLabel);
        form.appendChild(taskPriorityInput);
        form.appendChild(addTaskButton);

        form.addEventListener("click", (e) => {
            e.stopPropagation();
        });

        return form;
    }

function createTaskDiv(task) {
    function toggleTaskDiv() {
        if (divExpanded) {

        } else {

        }
        divExpanded = !divExpanded;
    }

    let divExpanded = false;
    const taskDiv = document.createElement('div');

    taskDiv.classList.add('task');
    taskDiv.innerText = task.get_name();

    taskDiv.addEventListener("click", (e) => {
        e.stopPropagation();
        toggleTaskDiv();
    })

    return taskDiv;
}

export {createTaskForm, createTaskDiv};