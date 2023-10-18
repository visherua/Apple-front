import { MongoClient } from 'mongodb';

export async function connectToDatabase() {
  const client = await MongoClient.connect(
    'mongodb+srv://vito:12345678$@applecluster.cifwaaa.mongodb.net/nestjs-demo?retryWrites=true&w=majority'
  );

  return client;
}
