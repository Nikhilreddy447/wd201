/* eslint-disable no-undef */
const todoList = require("../todo");
const { all, markAsComplete, add } = todoList();

describe("Todo test suite", () => {
  beforeAll(() => {
    add({
      title: "test todo",
      completed: false,
      dueDate: new Date().toISOString().slice(0, 10),
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
});
