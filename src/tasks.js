function makeTask(taskName, taskDescription, taskDueDate, taskPriority) {
    function getName() { return taskName; }
    function getDescription() { return taskDescription; }
    function getDueDate() { return taskDueDate; }
    function getPriority() { return taskPriority; }

    return { getName, getDescription, getDueDate, getPriority };
}

export {makeTask};