import React from 'react';
import { useDrop } from 'react-dnd';
import Task from './Task';
import { db } from '../utils/db';

const Column = ({ status, tasks, setTasks }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'TASK',
    drop: (item) => moveTask(item.id, status),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const moveTask = async (id, status) => {
    await db.tasks.update(id, { status });
    const updatedTasks = await db.tasks.toArray();
    setTasks(updatedTasks);
  };

  const deleteTask = async(id) => {
     db.tasks.delete(id)
  }

  return (
    <div ref={drop} className={`column ${isOver ? 'highlight' : ''}`}>
      <h2>{status}</h2>
      {tasks
        ?.filter((task) => task.status === status)
        .map((task) => (
          <Task key={task.id} task={task} deleteTask={deleteTask}/>
        ))}
    </div>
  );
};

export default Column;
