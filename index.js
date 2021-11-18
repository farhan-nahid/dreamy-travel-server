const express = require('express');
const cors = require('cors');
const { MongoClient, ObjectId } = require('mongodb');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// USE MIDDLEWARE

app.use(cors());
app.use(express.json());

// CONNECT WITH MONGODB

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.2xoju.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function run() {
  try {
    const database = client.db(`${process.env.DB_NAME}`);
    const topPlaceCollection = database.collection('places');
    console.log('database connect successfully');
  } catch {
    // await client.close()
  }
}
run().catch(console.dir);

app.get('/', (req, res) => res.send('Welcome to Dreamy Travel Server'));
app.listen(port, () => console.log(`Server Running on localhost:${port}`));
