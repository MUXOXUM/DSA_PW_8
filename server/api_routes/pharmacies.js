const express = require('express');
const router = express.Router();

// In-memory data store for pharmacies (replace with a database later)
let pharmacies = [];
let currentId = 1;

// GET all pharmacies
router.get('/', (req, res) => {
  res.json(pharmacies);
});

// GET a specific pharmacy by ID
router.get('/:id', (req, res) => {
  const pharmacy = pharmacies.find(p => p.id === parseInt(req.params.id));
  if (!pharmacy) return res.status(404).send('Pharmacy not found.');
  res.json(pharmacy);
});

// POST (create) a new pharmacy
router.post('/', (req, res) => {
  const { name, address, phone } = req.body;
  if (!name || !address) {
    return res.status(400).send('Name and address are required.');
  }
  const newPharmacy = { id: currentId++, name, address, phone };
  pharmacies.push(newPharmacy);
  res.status(201).json(newPharmacy);
});

// PUT (update) an existing pharmacy
router.put('/:id', (req, res) => {
  const pharmacy = pharmacies.find(p => p.id === parseInt(req.params.id));
  if (!pharmacy) return res.status(404).send('Pharmacy not found.');

  const { name, address, phone } = req.body;
  if (name) pharmacy.name = name;
  if (address) pharmacy.address = address;
  if (phone) pharmacy.phone = phone;

  res.json(pharmacy);
});

// DELETE a pharmacy
router.delete('/:id', (req, res) => {
  const pharmacyIndex = pharmacies.findIndex(p => p.id === parseInt(req.params.id));
  if (pharmacyIndex === -1) return res.status(404).send('Pharmacy not found.');

  const deletedPharmacy = pharmacies.splice(pharmacyIndex, 1);
  res.json(deletedPharmacy[0]);
});

module.exports = router; 