import projects from "./projects.js";

import './style.css';

const dom = () => {
    function createProjectForm() {
        return document.createElement('div');
    }

    function createProjectsDiv() {
        function createProjectDiv(project) {
            function createTaskForm(project) {
                return document.createElement('div');
            }

            function createTaskDiv(task) {
                const taskDiv = document.createElement('div');
                taskDiv.classList.add('task');
                taskDiv.innerText = task.get_name();
                return taskDiv;
            }

            const projectDiv = document.createElement('div');
            const projectNameDiv = document.createElement('div');

            projectNameDiv.innerText = project.getName();

            projectDiv.classList.add('project');
            projectDiv.appendChild(projectNameDiv);
            projectDiv.appendChild(createTaskForm(project));
            for (const task of project.getTasks()) {
                projectDiv.appendChild(createTaskDiv(task));
            }
            return projectDiv;
        }

        const projectsDiv = document.createElement('div');
        projectsDiv.classList.add("projects");

        for (let project of projects.getProjects()) {
            projectsDiv.appendChild(createProjectDiv(project));
        }

        return projectsDiv;
    }

    function getContent() {
        const content = document.createElement('div');
        const projectForm = createProjectForm(content);
        const projectsDiv = createProjectsDiv(content);

        content.classList.add('content');
        content.appendChild(projectForm);
        content.appendChild(projectsDiv);
        
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