

// import { MongoClient, Db } from 'mongodb';

// const uri = 'mongodb://localhost:27017'; // MongoDB URI
// const dbName = 'BlogApplication'; // Your database name

// let cachedClient: MongoClient | null = null;
// let cachedDb: Db | null = null;

// async function connectToDatabase(): Promise<Db> {
//   if (cachedDb) {
//     return cachedDb; // Return cached DB instance if available
//   }

//   try {
//     // If no client cached, create a new MongoClient and connect
//     if (!cachedClient) {
//       cachedClient = new MongoClient(uri);
//       await cachedClient.connect(); // Establish connection
//     }

//     const db = cachedClient.db(dbName); // Use your database name
//     cachedDb = db; // Cache the database for future use
//     return db;

//   } catch (error) {
//     console.error('Failed to connect to database:', error);
//     throw new Error('Failed to connect to database');
//   }
// }

// export { connectToDatabase };


import { MongoClient, Db } from 'mongodb';

const uri = 'mongodb://localhost:27017'; // MongoDB URI
const dbName = 'BlogApplication'; // Your database name

let cachedClient: MongoClient | null = null;

async function connectToDatabase(): Promise<MongoClient> {
  if (cachedClient) {
    return cachedClient; // Return cached client if available
  }

  try {
    // If no client cached, create a new MongoClient and connect
    cachedClient = new MongoClient(uri);
    await cachedClient.connect(); // Establish connection
    return cachedClient; // Return the MongoClient instance

  } catch (error) {
    console.error('Failed to connect to database:', error);
    throw new Error('Failed to connect to database');
  }
}

export { connectToDatabase };
