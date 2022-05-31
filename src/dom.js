import projects from "./projects.js";

import './style.css';

const dom = () => {

    function createProjectsDiv() {
        function createProjectForm(projectsDiv) {
            const form = document.createElement('form');
            const projectTitleLabel = document.createElement('label');
            const projectTitleInput = document.createElement('input');
            const submitButton = document.createElement('input');

            projectTitleLabel.innerText = "Project Title";
            projectTitleLabel.htmlFor = "project-title";

            projectTitleInput.id = 'project-title';

            submitButton.type = 'button';
            submitButton.value = 'Add Project'
            submitButton.addEventListener('click', (e) => {
                const projectTitle = projectTitleInput.value === "" ? "Untitled Project" : projectTitleInput.value;
                const project = projects.addProject(projectTitle);
                projectsDiv.appendChild(createProjectDiv(project));
                projectTitleInput.value = "";
            });

            form.classList.add('create-project');
            form.appendChild(projectTitleLabel);
            form.appendChild(projectTitleInput);
            form.appendChild(submitButton);

            return form;
        }

        function createProjectDiv(project) {
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

            function toggleProjectDiv(projectDiv, project) {
                if (divExpanded) {
                    const toRemove = [];
                    for (const element of projectDiv.children) {
                        if (!element.classList.contains("project-name")) {
                            toRemove.push(element);
                        }
                    }
                    toRemove.forEach((element) => { element.remove() });
                } else {
                    projectDiv.appendChild(addTaskButton);
                    for (const task of project.getTasks()) {
                        projectDiv.appendChild(createTaskDiv(task));
                    }

                }
                divExpanded = !divExpanded;
            }

            function createTaskDiv(task) {
                const taskDiv = document.createElement('div');
                taskDiv.classList.add('task');
                taskDiv.innerText = task.get_name();
                return taskDiv;
            }

            let divExpanded = false;
            const projectDiv = document.createElement('div');
            const projectNameDiv = document.createElement('div');
            const addTaskButton = document.createElement('input');

            projectNameDiv.innerText = project.getName();
            projectNameDiv.classList.add('project-name');

            projectDiv.classList.add('project');
            projectDiv.appendChild(projectNameDiv);
            projectDiv.addEventListener('click', (e) => {
                toggleProjectDiv(projectDiv, project);
            });
            addTaskButton.type = 'button';
            addTaskButton.value = "Add Task";
            addTaskButton.addEventListener('click', (e) => {
                e.stopPropagation();
                //addTaskButton.remove();
                projectDiv.insertBefore(createTaskForm(projectDiv, project), addTaskButton);
            });
            return projectDiv;
        }

        const projectsDiv = document.createElement('div');
        projectsDiv.classList.add("projects");
        projectsDiv.appendChild(createProjectForm(projectsDiv));
        for (let project of projects.getProjects()) {
            projectsDiv.appendChild(createProjectDiv(project));
        }

        return projectsDiv;
    }

    function getContent() {
        const content = document.createElement('div');

        content.classList.add('content');
        content.appendChild(createProjectsDiv());

        return content;
    }

    let project1 = projects.addProject('project1');
    let project2 = projects.addProject('project2');
    project1.addTask('task1');
    project1.addTask('task2');
    project2.addTask('task3');

    const body = document.querySelector('body');
    body.appendChild(getContent());
};

export default dom;