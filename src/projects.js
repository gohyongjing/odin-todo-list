const projects = (() => {
    const _projects = [];

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

        return {getName, addTask, getTasks};
    }

    function addProject(projectName) {
        const project = _makeProject(projectName);
        _projects.push(project);
        return project;
    }

    function getProjects() {
        return Array(..._projects);
    }

    return {addProject, getProjects};
})();

export default projects;