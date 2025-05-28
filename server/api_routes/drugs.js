const express = require('express');
const router = express.Router();

// In-memory data store for drugs
let drugs = [];
let currentDrugId = 1;

// GET all drugs
router.get('/', (req, res) => {
  res.json(drugs);
});

// GET drugs by search query (e.g., by name)
router.get('/search', (req, res) => {
  const { name } = req.query;
  if (!name) {
    return res.status(400).send('Search query (e.g., name) is required.');
  }
  const searchTerm = name.toLowerCase();
  const results = drugs.filter(drug => drug.name.toLowerCase().includes(searchTerm));
  res.json(results);
});

// GET a specific drug by ID
router.get('/:id', (req, res) => {
  const drug = drugs.find(d => d.id === parseInt(req.params.id));
  if (!drug) return res.status(404).send('Drug not found.');
  res.json(drug);
});

// POST (create) a new drug
router.post('/', (req, res) => {
  const { name, manufacturer, dosage, price } = req.body;
  if (!name || !manufacturer || !price) {
    return res.status(400).send('Name, manufacturer, and price are required.');
  }
  const newDrug = { id: currentDrugId++, name, manufacturer, dosage, price: parseFloat(price) };
  drugs.push(newDrug);
  res.status(201).json(newDrug);
});

// PUT (update) an existing drug
router.put('/:id', (req, res) => {
  const drug = drugs.find(d => d.id === parseInt(req.params.id));
  if (!drug) return res.status(404).send('Drug not found.');

  const { name, manufacturer, dosage, price } = req.body;
  if (name) drug.name = name;
  if (manufacturer) drug.manufacturer = manufacturer;
  if (dosage) drug.dosage = dosage;
  if (price) drug.price = parseFloat(price);

  res.json(drug);
});

// DELETE a drug
router.delete('/:id', (req, res) => {
  const drugIndex = drugs.findIndex(d => d.id === parseInt(req.params.id));
  if (drugIndex === -1) return res.status(404).send('Drug not found.');

  const deletedDrug = drugs.splice(drugIndex, 1);
  res.json(deletedDrug[0]);
});

module.exports = router; 