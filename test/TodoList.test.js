const { expect } = require("chai");

describe("TodoList", function () {
  let TodoList, todoList, owner;

  beforeEach(async () => {
    [owner] = await ethers.getSigners();
    TodoList = await ethers.getContractFactory("TodoList");
    todoList = await TodoList.deploy();
    await todoList.deployed();
  });

  it("Should add a task correctly", async () => {
    await todoList.addTask("Learn Solidity");
    const task = await todoList.tasks(1);

    expect(task.description).to.equal("Learn Solidity");
    expect(task.isCompleted).to.equal(false);
  });

  it("Should mark a task as completed", async () => {
    await todoList.addTask("Learn Solidity");
    await todoList.completeTask(1);
    const task = await todoList.tasks(1);

    expect(task.isCompleted).to.equal(true);
  });

  it("Should remove a task", async () => {
    await todoList.addTask("Learn Solidity");
    await todoList.removeTask(1);
    const task = await todoList.tasks(1);

    expect(task.id).to.equal(0);
  });

  it("Should return all tasks", async () => {
    await todoList.addTask("Learn Solidity");
    await todoList.addTask("Build a dApp");

    const tasks = await todoList.getAllTasks();
    expect(tasks.length).to.equal(2);
    expect(tasks[0].description).to.equal("Learn Solidity");
    expect(tasks[1].description).to.equal("Build a dApp");
  });
});