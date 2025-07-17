const express = require('express');
const SweetShop = require('./SweetShop');
const app = express();
const cors = require('cors');

app.use(express.json()); //middleware to parse JSON bodies...!
app.use(cors()); //middleware to handle CORS...!
const shop = new SweetShop(); //create an object of SweetShop...!

// Add a new sweet
app.post('/sweets', (req, res) => {
    try {
      const sweet = req.body;
      shop.addSweet(sweet);
      res.status(201).json({ message: 'Sweet added!', sweet });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
});

// Get all sweets
app.get('/sweets', (req, res) => {
    res.json(shop.getAllSweets());
});

// Get a sweet by id
app.get('/sweets/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const sweet = shop.getAllSweets().find(s => s.id === id);
    if (sweet) {
        res.json(sweet);
    } else {
        res.status(404).json({ error: 'Sweet not found' });
    }
});

// Update a sweet by id
app.put('/sweets/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = shop.getAllSweets().findIndex(s => s.id === id);
    if (index !== -1) {
        shop.sweets[index] = { ...shop.sweets[index], ...req.body };
        res.json(shop.sweets[index]);
    } else {
        res.status(404).json({ error: 'Sweet not found' });
    }
});

// Delete a sweet by id
app.delete('/sweets/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = shop.getAllSweets().findIndex(s => s.id === id);
    if (index !== -1) {
        const deleted = shop.sweets.splice(index, 1);
        res.json({ message: 'Sweet deleted', sweet: deleted[0] });
    } else {
        res.status(404).json({ error: 'Sweet not found' });
    }
});

// Start the server on port 3001...!    

app.listen(3001, () => {
    console.log('Server is running on port 3001...!');
})