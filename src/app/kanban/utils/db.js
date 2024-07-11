import Dexie from 'dexie';

export const db = new Dexie('KanbanBoardDB');
db.version(3).stores({
  tasks: '++id, name, status',
});

// Seed the database with some dummy data
db.on('populate', () => {
  db.tasks.bulkPut([
    { title: 'Task 1', status: 'todo' },
    { title: 'Task 2', status: 'todo' },
    { title: 'Task 3', status: 'inprogress' },
    { title: 'Task 4', status: 'complete' },
  ]);
});
