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
            _tasks.push(_makeTask(taskName));
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