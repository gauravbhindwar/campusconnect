import { MongoClient } from 'mongodb';
import { initUserCommunicationsCollections } from './communicationSchema';

const uri = process.env.MONGODB_URI;
const options = {};

let client;
let clientPromise;

if (!uri) {
  throw new Error('Please add your MongoDB URI to .env.local');
}

if (process.env.NODE_ENV === 'development') {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // In production mode, it's best to not use a global variable.
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export const connectToDatabase = async () => {
  const client = await clientPromise;
  const db = client.db('campusconnect');
  
  // Initialize collections with schema validation
  await initUserCommunicationsCollections(db);
  
  return { client, db };
};

// Export a module-scoped MongoClient promise for direct MongoDB access
export default clientPromise;