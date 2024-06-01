'use client';

import Dexie from 'dexie';

export const db = new Dexie('animaDB');
db.version(1).stores({
  animelist: '++id, mal_id, title, images, episodes, aired, status, type' // Primary key and indexed props
});

db.version(3).stores({
  leadlist: '++leadid, fullname, email, phone, webservice, desc, datelog' // Primary key and indexed props
});

