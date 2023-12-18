/* eslint-disable no-unused-vars */
const { count } = require("yargs");
const { connect } = require("./connectDB.js");
const Todo = require("./TodoModel.js");

//.Create Method

const createTodo = async () => {
  try {
    await connect();
    const todo = await Todo.addTask({
      title: "Second Item",
      dueDate: new Date(),
      completed: false,
    });
    console.log(`Created todo with ID : ${todo.id}`);
  } catch (error) {
    console.log(error);
  }
};

//.count Method

const countItems = async () => {
  try {
    const total_count = await Todo.count();
    console.log(`Found ${total_count} Items in the Table`);
  } catch (error) {
    console.log(error);
  }
};

//.findAll method

const getAllTodos = async () => {
  try {
    const todos = await Todo.findAll();
    const todoList = todos.map((todo) => todo.displayableString()).join("\n");
    console.log(todoList);
  } catch (error) {
    console.log(error);
  }
};

//.findone Method

const getSingleTodo = async () => {
  try {
    const todo = await Todo.findOne({
      where: {
        completed: false,
      },
      order: [["id", "DESC"]],
    });
    //const todoList = todos.map(todo =>todo.displayableString()).join("\n")
    console.log(todo.displayableString());
  } catch (error) {
    console.log(error);
  }
};

//.Update Method

const updateItem = async (id) => {
  try {
    await Todo.update(
      { completed: true },
      {
        where: {
          id: id,
        },
      },
    );
  } catch (error) {
    console.error(error);
  }
};

//.Destroy Method

const deleteItem = async (id) => {
  try {
    const deletedRowCount = await Todo.destroy({
      where: {
        id: id,
      },
    });
    console.log(`Deleted ${deletedRowCount} rows!`);
  } catch (error) {
    console.error(error);
  }
};

(async () => {
  //await createTodo();
  //await countItems();
  await getAllTodos();
  //await getSingleTodo();
  //await updateItem(2);
  await deleteItem(2);
  await getAllTodos();
})();
