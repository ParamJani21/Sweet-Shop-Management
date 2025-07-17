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
      const sweet = { ...req.body, id: Number(req.body.id) };
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

// Search sweets by name, category, or price range
app.get('/sweets/search', (req, res) => {
    let results = shop.getAllSweets();
    const { name, category, minPrice, maxPrice } = req.query;
    if (name) {
        results = shop.searchByName(name);
    }
    if (category) {
        results = results.filter(s => s.category.toLowerCase() === category.toLowerCase());
    }
    if (minPrice || maxPrice) {
        const min = minPrice ? Number(minPrice) : Number.MIN_SAFE_INTEGER;
        const max = maxPrice ? Number(maxPrice) : Number.MAX_SAFE_INTEGER;
        results = results.filter(s => s.price >= min && s.price <= max);
    }
    res.json(results);
});

// Sort sweets by field and order
app.get('/sweets/sort', (req, res) => {
    const { field, order } = req.query;
    if (!field) return res.status(400).json({ error: 'Field is required for sorting' });
    const sorted = shop.sortSweets(field, order || 'asc');
    res.json(sorted);
});

// Purchase sweet (decrease quantity)
app.post('/sweets/:id/purchase', (req, res) => {
    const id = Number(req.params.id);
    const { quantity } = req.body;
    console.log('Purchase request:', { id, quantity });
    console.log('Current sweets:', shop.getAllSweets());
    try {
        shop.purchaseSweet(id, Number(quantity));
        res.json({ message: 'Purchase successful' });
    } catch (err) {
        console.error('Purchase error:', err.message);
        res.status(400).json({ error: err.message });
    }
});

// Restock sweet (increase quantity)
app.post('/sweets/:id/restock', (req, res) => {
    const id = Number(req.params.id);
    const { quantity } = req.body;
    console.log('Restock request:', { id, quantity });
    console.log('Current sweets:', shop.getAllSweets());
    try {
        shop.restockSweet(id, Number(quantity));
        res.json({ message: 'Restock successful' });
    } catch (err) {
        console.error('Restock error:', err.message);
        res.status(400).json({ error: err.message });
    }
});

// Start the server on port 3001...!    

app.listen(3001, () => {
    console.log('Server is running on port 3001...!');
})