const projects = (() => {
    const _projects = [];

    function _makeProject(projectName) {
        const _tasks = [];

        function _makeTask(taskName) {
            function get_name() {return taskName;}

            return {get_name};
        }

        function getName() {return projectName;}

        function addTask(taskName) {
            const task = _makeTask(taskName);
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