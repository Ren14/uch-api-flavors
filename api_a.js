// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require("axios");

const app = express();
const PORT = process.env.PORT || 3005;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Sample data
let flavors = [
    { id: 1, name: 'Vanilla', price: 1000},
    { id: 2, name: 'Chocolate', price: 1000 },
    { id: 3, name: 'Strawberry', price: 1500 },
];

// CRUD Operations

// Read All
app.get('/flavors', (req, res) => {
    res.json(flavors);
});

// Base path http://localhost:3000/

// Read All
app.get('/flavors/dolar', async (req, res) => {
    const response = await axios.get('https://criptoya.com/api/dolar');
    let dolarPrice = response.data.blue.ask;
    flavors.forEach((flavor, i) => {
        flavors[i].price = parseFloat(flavor.price / dolarPrice);
    });
    res.json(flavors);
});

// Read One
app.get('/flavors/:id', (req, res) => {
    const flavor = flavors.find(f => f.id === parseInt(req.params.id));
    if (!flavor) return res.status(404).send('Flavor not found');
    res.json(flavor);
});

// Create
app.post('/flavors', (req, res) => {
    const newFlavor = {
        id: flavors.length + 1,
        name: req.body.name,
    };
    flavors.push(newFlavor);
    res.status(201).json(newFlavor);
});

// Update
app.put('/flavors/:id', (req, res) => {
    const flavor = flavors.find(f => f.id === parseInt(req.params.id));
    if (!flavor) return res.status(404).send('Flavor not found');

    flavor.name = req.body.name;
    res.json(flavor);
});

// Delete
app.delete('/flavors/:id', (req, res) => {
    const flavorIndex = flavors.findIndex(f => f.id === parseInt(req.params.id));
    if (flavorIndex === -1) return res.status(404).send('Flavor not found');

    flavors.splice(flavorIndex, 1);
    res.status(204).send();
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});