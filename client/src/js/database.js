// Start of JS file
// Initialize database from idb package.
import { openDB } from 'idb';

const initdb = async () =>
  openDB('dc', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('dc')) {
        console.log('dc database already exists');
        return;
      }
      db.createObjectStore('dc', { keyPath: 'id', autoIncrement: true });
      console.log('dc database created');
    },
  });

// PUT function for database.
export const putDb = async (content) => {
  console.log('Update the database');

  const dcDb = await openDB('dc', 1);

  const tx = dcDb.transaction('dc', 'readwrite');

  const store = tx.objectStore('dc');

  const request = store.put({ id: 1, value: content });

  const result = await request;
  console.log('Database updated', result);
}

// GET function for database.
export const getDb = async () => {
  console.log('GET from the database');

  const dcDb = await openDB('dc', 1);

  const tx = dcDb.transaction('dc', 'readonly');

  const store = tx.objectStore('dc');

  const request = store.getAll();

  const result = await request;
  console.log('result.value', result);
  return result;
}

initdb();
// End of JS file