const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;
const filePath = path.join(__dirname, 'userInput.json');

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Backend server is running');
});

// POST route to save user input
app.post('/save', (req, res) => {
  console.log(req)
  const userData = req.body;
  console.log(userData)
  fs.readFile(filePath, 'utf8', (err, data) => {
    let userInput = [];
    if (!err && data) {
      try {
        userInput = JSON.parse(data);
      } catch (parseErr) {
        console.error('Error parsing JSON:', parseErr);
      }
    }

    userInput.push(userData);

    fs.writeFile(filePath, JSON.stringify(userInput, null, 2), (err) => {
      if (err) {
        console.error('Error writing file:', err);
        return res.status(500).send('Failed to save input');
      }
      res.status(200).send('User input saved successfully');
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
