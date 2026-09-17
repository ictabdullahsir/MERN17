const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 5000;
const DATA_FILE = path.join(__dirname, 'data.json');

app.use(cors());
app.use(express.json());

// Helper function to read JSON data safely
const readData = () => {
  const jsonData = fs.readFileSync(DATA_FILE, 'utf8');
  return JSON.parse(jsonData);
};

// Helper function to write JSON data safely
const writeData = (data) => {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf8');
};

// GET: Fetch all items
app.get('/api/users', (req, res) => {
  try {
    const users = readData();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Failed to read data' });
  }
});

// POST: Add a new item to data.json
app.post('/api/users', (req, res) => {
  try {
    const users = readData();
    const newUser = {
      id: Date.now(),
      name: req.body.name,
      role: req.body.role
    };

    users.push(newUser);
    writeData(users);

    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ error: 'Failed to save data' });
  }
});

app.listen(PORT, () => console.log(`Server listening on http://localhost:${PORT}`));
