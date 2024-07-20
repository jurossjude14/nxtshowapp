import { db } from "./db";

const useDexie = () => {
    const updateTask = async (data, pid) => {
        try {
            await db.tasks.update(pid, { ...data });
            console.log("Updated Task | useHooks");
        } catch (error) {
            console.log(error)
        }

    };
    const addTask = async (data) => {
        try {
            await db.tasks.add({ ...data, status: 'To Do' }); 
            console.log("Added Task | useHooks");
        } catch (error) {
            console.log(error); 
        }
    };

    const deleteTask = async (id) => {
        try {
            await db.tasks.delete(id);
            console.log("Delete Data | useHooks");
        } catch (error) {
            console.log(error);
        }
    }

    const moveTask = async (id, status) => {
        try {
            await db.tasks.update(id, { status });
            console.log("move data | useHooks");       
        } catch (error) {   
            console.log(error);
        }
      };
    return {
        updateTask,
        addTask,
        deleteTask,
        moveTask
    };

}
export default useDexie;