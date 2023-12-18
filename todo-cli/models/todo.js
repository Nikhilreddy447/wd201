/* eslint-disable no-unused-vars */
"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static async addTask(params) {
      return await Todo.create(params);
    }
    static associate(models) {
      // define association here
    }
    static async showList() {
      console.log("My Todo list \n");

      console.log("Overdue");
      let overDueString = await Todo.overdue();
      console.log(
        overDueString.map((items) => items.displayableString()).join("\n"),
      );
      console.log("\n");

      console.log("Due Today");
      let todayDueString = await Todo.dueToday();
      console.log(
        todayDueString.map((items) => items.displayableString()).join("\n"),
      );
      console.log("\n");

      console.log("Due Later");
      let laterDueString = await Todo.dueLater();
      console.log(
        laterDueString.map((items) => items.displayableString()).join("\n"),
      );
    }

    static async overdue() {
      const over = await Todo.findAll({
        where: {
          dueDate: {
            [sequelize.Sequelize.Op.lt]: Todo.today,
          },
        },
      });
      return over;
    }

    static async dueToday() {
      const tod = await Todo.findAll({
        where: {
          dueDate: Todo.today,
        },
      });
      return tod;
    }

    static async dueLater() {
      let tom = new Date().setDate(new Date().getDate() + 1);
      const lat = await Todo.findAll({
        where: {
          dueDate: {
            [sequelize.Sequelize.Op.gte]: tom,
          },
        },
      });
      return lat;
    }

    static async markAsComplete(id) {
      const item = await Todo.findByPk(id);

      if (item) {
        item.completed = true;
        await item.save();
      }
      console.log("Item not Found !");
    }
    displayableString() {
      let checkbox = this.completed ? "[x]" : "[ ]";
      const checkToday = (date, t) => {
        let date_arr = String(date).split("-");
        let today_arr = String(t).split("-");

        for (let i = 0; i < 8; i++) {
          if (date_arr[i] != today_arr[i]) {
            return false;
          }
        }
        return true;
      };

      if (checkToday(this.dueDate, Todo.today)) {
        return `${this.id}. ${checkbox} ${this.title}`;
      }
      return `${this.id}. ${checkbox} ${this.title} ${this.dueDate}`;
    }
  }
  Todo.init(
    {
      title: DataTypes.STRING,
      dueDate: DataTypes.DATEONLY,
      completed: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Todo",
    },
  );
  return Todo;
};
