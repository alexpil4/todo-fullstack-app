const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

// Express config
const app = express();
// Use the port from .env or the fallback one
const port = process.env.PORT || 5000; 

// Enable CORS
app.use(cors());

// JSON data parser
app.use(bodyParser.json());

// Initialize MongoDB connection variable
let db;

// MongoDB connection
const connectDB = async () => {
  try {
    const client = await MongoClient.connect(process.env.MONGODB_URI);
    db = client.db(process.env.MONGODB_NAME);
    console.log('Connected to MongoDB!');
  } catch (err) {
    console.error('Failed to connect to MongoDB:', err);
    // Exit if cannot connect
    process.exit(1);
  }
};

// Run MongoDB connection
connectDB();

// POST task endpoint
app.post('/add-task', async (req, res) => {
  const { title, description, completed } = req.body;

  try {
    // Insert the new task into the collection
    const result = await db.collection('tasks').insertOne({
      title,
      description,
      completed,
      timestamp: new Date(),
    });

    // Fetch the inserted task by its ID (using the insertedId)
    const insertedTask = await db.collection('tasks').findOne({ _id: result.insertedId });

    // Return the full inserted task document
    res.status(201).json(insertedTask);
  } catch (err) {
    console.error('Error saving task:', err);
    res.status(500).json({ message: 'Error saving task', error: err });
  }
});

// GET tasks endpoint
app.get('/tasks', async (req, res) => {
  try {
    if (!db) {
      return res.status(500).json({ message: 'Database not connected' });
    }

    const tasks = await db.collection('tasks').find().toArray();
    res.status(200).json(tasks); // Send back all tasks
  } catch (err) {
    console.error('Error fetching tasks:', err);
    res.status(500).json({ message: 'Error fetching tasks', error: err.message });
  }
});

// Run the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
