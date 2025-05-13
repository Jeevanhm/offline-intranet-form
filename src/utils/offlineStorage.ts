
// Database configuration
const DB_NAME = 'IntranetAppDB';
const DB_VERSION = 1;
const STORE_NAME = 'formSubmissions';

// Initialize the database
export const initDB = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    
    request.onerror = (event) => {
      reject('Error opening database');
    };
    
    request.onsuccess = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      resolve(db);
    };
    
    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      
      // Create object store for form submissions if it doesn't exist
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        const store = db.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true });
        
        // Create indexes for searching/filtering
        store.createIndex('dateRequested', 'dateRequested', { unique: false });
        store.createIndex('appName', 'appName', { unique: false });
        store.createIndex('requestor', 'requestor', { unique: false });
      }
    };
  });
};

// Save form data to IndexedDB
export const saveFormData = async (formData: any): Promise<number> => {
  const db = await initDB();
  
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME], 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    
    // Add timestamp to form data
    const dataToSave = {
      ...formData,
      timestamp: new Date().toISOString()
    };
    
    const request = store.add(dataToSave);
    
    request.onsuccess = (event) => {
      const id = (event.target as IDBRequest).result as number;
      resolve(id);
    };
    
    request.onerror = (event) => {
      reject('Error saving form data');
    };
  });
};

// Get all form submissions from IndexedDB
export const getAllFormData = async (): Promise<any[]> => {
  const db = await initDB();
  
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME], 'readonly');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.getAll();
    
    request.onsuccess = (event) => {
      const results = (event.target as IDBRequest).result;
      resolve(results);
    };
    
    request.onerror = (event) => {
      reject('Error retrieving form data');
    };
  });
};

// Delete a form submission
export const deleteFormData = async (id: number): Promise<void> => {
  const db = await initDB();
  
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME], 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.delete(id);
    
    request.onsuccess = () => {
      resolve();
    };
    
    request.onerror = () => {
      reject('Error deleting form data');
    };
  });
};
