//SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract TodoList {
    struct Task {
        uint256 id;
        string description;
        bool isCompleted;
    }

    mapping(uint256 => Task) public tasks;
    uint256 public taskCount;

    event TaskAdded(uint256 id, string description);
    event TaskCompleted(uint256 id);
    event TaskRemoved(uint256 id);

    function addTask(string memory _description) public {
        taskCount++;
        tasks[taskCount] = Task(taskCount, _description, false);
        emit TaskAdded(taskCount, _description);
    }

    function completeTask(uint256 _id) public {
        require(_id > 0 && _id <= taskCount, "Task does not exist");
        Task storage task = tasks[_id];
        task.isCompleted = true;
        emit TaskCompleted(_id);
    }

    function removeTask(uint256 _id) public {
        require(_id > 0 && _id <= taskCount, "Task does not exist");
        delete tasks[_id];
        emit TaskRemoved(_id);
    }

    function getAllTasks() public view returns (Task[] memory) {
        Task[] memory allTasks = new Task[](taskCount);
        for (uint256 i = 1; i <= taskCount; i++) {
            allTasks[i - 1] = tasks[i];
        }
        return allTasks;
    }
}
