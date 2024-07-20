import Dexie from 'dexie';

export const db = new Dexie('KanbanBoardDB');
db.version(3).stores({
  tasks: '++id, name, status',
});
