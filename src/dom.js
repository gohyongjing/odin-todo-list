import projects from "./projects.js";
import createProjectDiv from "./domProject.js";

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