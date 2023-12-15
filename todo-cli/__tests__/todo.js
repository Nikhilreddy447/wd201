/* eslint-disable no-undef */
const todoList = require("../todo");
const { all, markAsComplete, add, overdue, dueToday, dueLater } = todoList();
const oneDay = 60 * 60 * 24 * 1000;
const todayDate = new Date();
describe("Todo test suite", () => {
  beforeAll(() => {
    const todayDate = new Date();
    add({
      title: "test todo",
      completed: false,
      dueDate: new Date().toISOString().slice(0, 10),
    });
    add({
      title: "test todo 2",
      completed: false,
      dueDate: new Date(todayDate.getTime() - 1 * oneDay)
        .toISOString()
        .slice(0, 10),
    });
    add({
      title: "test todo 3",
      completed: false,
      dueDate: new Date(todayDate.getTime() + 1 * oneDay)
        .toISOString()
        .slice(0, 10),
    });
  });
  test("should add new todo", () => {
    const todolistcount = all.length;
    add({
      title: "test todo",
      completed: false,
      dueDate: new Date().toISOString().slice(0, 10),
    });
    expect(all.length).toBe(todolistcount + 1);
  });
  test("Should mark to do as complete", () => {
    expect(all[0].completed).toBe(false);
    markAsComplete(0);
    expect(all[0].completed).toBe(true);
  });
  test("Check and return overdue todos", () => {
    const overDueTodoItemsCount = overdue().length;
    add({
      title: "Test Todo",
      completed: false,
      dueDate: new Date(todayDate.getTime() - 1 * oneDay)
        .toISOString()
        .slice(0, 10),
    });
    expect(overdue().length).toBe(overDueTodoItemsCount + 1);
  });
  test("check return a list of todos due today", () => {
    const dueTodayTodoItemsCount = dueToday().length;
    add({
      title: "Test todo 3",
      completed: false,
      dueDate: new Date().toISOString().slice(0, 10),
    });
    expect(dueToday().length).toBe(dueTodayTodoItemsCount + 1);
  });
  test("check return a list of todos due later", () => {
    const dueLaterTodoItemsCount = dueLater().length;
    add({
      title: "test todo2",
      completed: false,
      dueDate: new Date(todayDate.getTime() + 2 * oneDay)
        .toISOString()
        .slice(0, 10),
    });
    expect(dueLater().length).toBe(dueLaterTodoItemsCount + 1);
  });
});
