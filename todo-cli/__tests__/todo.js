const todoList = require('../todo.js');

const {all,markAsComplete,add} = todoList();

describe("ToDo list Test suite",()=>{
    beforeAll(()=>{
        add(
            {
                title:"todo test",
                completed:false,
                dueDate: new Date().toISOString().slice(0,10)
            }
        );
    })
    test("should add new todo",()=>{
        const todoItemCount = all.length;
        add(
            {
                title:"todo test",
                completed:false,
                dueDate: new Date().toISOString().slice(0,10)
            }
        );
        expect(all.length).toBe(todoItemCount+1);
    });
    test("Mark as complete",()=>{
        expect(all[0].completed).toBe(false)
        markAsComplete(0);
        expect(all[0].completed).toBe(true)
    })
});