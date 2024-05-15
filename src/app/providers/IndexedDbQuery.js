'use client';

import Dexie from 'dexie';

export const db = new Dexie('animaDB');
db.version(1).stores({
  animelist: '++id, mal_id, title, images, episodes, aired, status, type' // Primary key and indexed props
});
