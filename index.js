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
    const topPlaceCollection = database.collection('all_places');
    const orderCollection = database.collection('orders');

    // GET all top places

    app.get('/top-places', async (req, res) => {
      const cursor = topPlaceCollection.find({});
      const places = await cursor.toArray();
      res.send(places);
    });

    // GET a single place by ID

    app.get('/place/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const place = await topPlaceCollection.findOne(query);
      res.send(place);
    });

    // GET all orders

    app.get('all-orders', async (req, res) => {
      const cursor = orderCollection.find({});
      const orders = await cursor.toArray();
      res.send(orders);
    });

    // DELETE a single order by ID

    app.delete('/order/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await orderCollection.deleteOne(query);
      res.json(result);
    });
  } finally {
    // await client.close()
  }
}

run().catch(console.dir);

app.get('/', (req, res) => res.send('Welcome to Dreamy Travel Server'));
app.listen(port, () => console.log(`Server Running on localhost:${port}`));
