const projects = (() => {
    let _projects = [];

    function _makeProject(projectName) {
        const _tasks = [];

        function _makeTask(taskName, taskDescription, taskDueDate, taskPriority) {
            function getName() {return taskName;}
            function getDescription() {return taskDescription;}
            function getDueDate() {return taskDueDate;}
            function getPriority() {return taskPriority;}

            return {getName, getDescription, getDueDate, getPriority};
        }

        function getName() {return projectName;}

        function addTask(taskName, taskDescription, taskDueDate, taskPriority) {
            const task = _makeTask(taskName, taskDescription, taskDueDate, taskPriority);
            _tasks.push(task);
            return task;
        }

        function getTasks() {
            return Array(..._tasks);
        }
        
        function removeTask(task) {
            for (let i = 0; i < _tasks.length; i++) {
                if (task === _tasks[i]) {
                    _tasks.splice(i, 1);
                    break;
                }
            }
        }

        return {getName, addTask, getTasks, removeTask};
    }

    function addProject(projectName) {
        const project = _makeProject(projectName);
        _projects.push(project);
        return project;
    }

    function getProjects() {
        return Array(..._projects);
    }

    function removeProject(project) {
        for (let i = 0; i < _projects.length; i++) {
            if (project === _projects[i]) {
                _projects.splice(i, 1);
                break;
            }
        }
    }

    return {addProject, getProjects, removeProject};
})();

export default projects;