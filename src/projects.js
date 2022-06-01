import { makeTask } from "./tasks.js";

const projects = (() => {
    function storageAvailable(type) {
        let storage;
        try {
            storage = window[type];
            let x = '__storage_test__';
            storage.setItem(x, x);
            storage.removeItem(x);
            return true;
        }
        catch (e) {
            return e instanceof DOMException && (
                // everything except Firefox
                e.code === 22 ||
                // Firefox
                e.code === 1014 ||
                // test name field too, because code might not be present
                // everything except Firefox
                e.name === 'QuotaExceededError' ||
                // Firefox
                e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
                // acknowledge QuotaExceededError only if there's something already stored
                (storage && storage.length !== 0);
        }
    }

    function _retrieveProjects() {
        if (storageAvailable('localStorage')) {
            const jsonResult = localStorage.getItem('projects');
            if (jsonResult) {
                _projects = JSON.parse(jsonResult).map((jsonProject) => {
                    let project = _makeProject(jsonProject['name']);
                    project.parseTasks(jsonProject['tasks']);
                    return project;
                });
            }
        }
    }

    function _saveProjects() {
        if (storageAvailable('localStorage')) {
            localStorage.setItem('projects', JSON.stringify(_projects.map((project) => {
                return {
                    'name': project.getName(),
                    'tasks': project.getTasks().map((task) => {
                        return {
                            'name': task.getName(),
                            'description': task.getDescription(),
                            'due-date': task.getDueDate(),
                            'priority': task.getPriority()
                        };
                    })
                };
            })));
        }
    }

    let _projects = [];
    _retrieveProjects();

    function _makeProject(projectName) {
        const _tasks = [];

        function getName() { return projectName; }

        function addTask(taskName, taskDescription, taskDueDate, taskPriority) {
            const task = makeTask(taskName, taskDescription, taskDueDate, taskPriority);
            _tasks.push(task);
            _saveProjects();
            return task;
        }

        function getTasks() {
            return Array(..._tasks);
        }

        function removeTask(task) {
            for (let i = 0; i < _tasks.length; i++) {
                if (task === _tasks[i]) {
                    _tasks.splice(i, 1);
                    _saveProjects();
                    break;
                }
            }
        }

        function parseTasks(jsonTasks) {
            for (const jsonTask of jsonTasks) {
                _tasks.push(makeTask(jsonTask['name'],
                    jsonTask['description'],
                    jsonTask['due-date'],
                    jsonTask['priority']));
            }
        }

        return { getName, addTask, getTasks, removeTask, parseTasks };
    }

    function addProject(projectName) {
        const project = _makeProject(projectName);
        _projects.push(project);
        _saveProjects();
        return project;
    }

    function getProjects() {
        return Array(..._projects);
    }

    function removeProject(project) {
        for (let i = 0; i < _projects.length; i++) {
            if (project === _projects[i]) {
                _projects.splice(i, 1);
                _saveProjects();
                break;
            }
        }
    }

    return { addProject, getProjects, removeProject };
})();

export default projects;