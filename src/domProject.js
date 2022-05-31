import projects from "./projects.js";
import {createTaskForm, createTaskDiv} from "./domTask.js";

function createProjectDiv(project) {
    function toggleProjectDiv(projectDiv, project) {
        if (divExpanded) {
            const toRemove = [];
            for (const element of projectDiv.children) {
                if (!element.classList.contains("header")) {
                    toRemove.push(element);
                }
            }
            toRemove.forEach((element) => { element.remove() });
        } else {
            projectDiv.appendChild(addTaskButton);
            for (const task of project.getTasks()) {
                projectDiv.appendChild(createTaskDiv(task, project));
            }

        }
        divExpanded = !divExpanded;
    }

    let divExpanded = false;
    const projectDiv = document.createElement('div');
    const projectNameDiv = document.createElement('div');
    const projectHeader = document.createElement('div');
    const deleteButton = document.createElement('input');
    const addTaskButton = document.createElement('input');
    
    projectNameDiv.innerText = project.getName();
    projectNameDiv.classList.add('project-name');

    deleteButton.type = 'button';
    deleteButton.value = 'X';
    deleteButton.classList.add('delete');
    deleteButton.addEventListener("click", (e) => {
        e.stopPropagation();
        projectDiv.remove();
        projects.removeProject(project);
    });

    projectHeader.classList.add('header');
    projectHeader.appendChild(projectNameDiv);
    projectHeader.appendChild(deleteButton);

    addTaskButton.type = 'button';
    addTaskButton.value = "Add Task";
    addTaskButton.addEventListener('click', (e) => {
        e.stopPropagation();
        projectDiv.insertBefore(createTaskForm(projectDiv, project), addTaskButton);
    });

    projectDiv.classList.add('project');
    projectDiv.addEventListener('click', (e) => {
        toggleProjectDiv(projectDiv, project);
    });
    projectDiv.appendChild(projectHeader);
    
    return projectDiv;
}

export default createProjectDiv;