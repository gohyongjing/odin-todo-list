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
        taskPriorityInput.type = "number";

        addTaskButton.value = "Add Task";
        addTaskButton.type = "button";

        addTaskButton.addEventListener("click", (e) => {
            const taskName = taskNameInput.value === "" ? "Unnamed task" : taskNameInput.value;
            const taskDescription = taskDescriptionInput.value;
            const taskDueDate = taskDueDateInput.value;
            const taskPriority = taskPriorityInput.value;
            const task = project.addTask(taskName, taskDescription, taskDueDate, taskPriority);
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
            const toRemove = [];
            for (const element of taskDiv.children) {
                console.log(element);
                if (!element.classList.contains("task-name")) {
                    toRemove.push(element);
                }
            }
            toRemove.forEach((element) => { element.remove() });
        } else {
            taskDiv.appendChild(taskDescriptionDiv);
            taskDiv.appendChild(taskDueDateDiv);
            taskDiv.appendChild(taskPriorityDiv);
        }
        divExpanded = !divExpanded;
    }

    let divExpanded = false;
    const taskDiv = document.createElement('div');
    const taskNameDiv = document.createElement('div');
    const taskDescriptionDiv = document.createElement('div');
    const taskDueDateDiv = document.createElement('div');
    const taskPriorityDiv = document.createElement('div');

    taskDiv.classList.add('task');

    taskNameDiv.innerText = task.getName();
    taskNameDiv.classList.add("task-name");

    taskDescriptionDiv.innerText = task.getDescription();

    taskDueDateDiv.innerText = `Due Date: ${task.getDueDate()}`;

    taskPriorityDiv.innerText = `Priority: ${task.getPriority()}`;

    taskDiv.appendChild(taskNameDiv);
    taskDiv.addEventListener("click", (e) => {
        e.stopPropagation();
        toggleTaskDiv();
    })

    return taskDiv;
}

export {createTaskForm, createTaskDiv};