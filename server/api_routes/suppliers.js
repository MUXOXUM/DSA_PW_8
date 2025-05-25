const express = require('express');
const router = express.Router();

// In-memory data store for suppliers
let suppliers = [];
let currentSupplierId = 1;

// GET all suppliers
router.get('/', (req, res) => {
  res.json(suppliers);
});

// GET a specific supplier by ID
router.get('/:id', (req, res) => {
  const supplier = suppliers.find(s => s.id === parseInt(req.params.id));
  if (!supplier) return res.status(404).send('Supplier not found.');
  res.json(supplier);
});

// POST (create) a new supplier
router.post('/', (req, res) => {
  const { name, contactPerson, phone, email } = req.body;
  if (!name || !contactPerson) {
    return res.status(400).send('Name and contact person are required.');
  }
  const newSupplier = { id: currentSupplierId++, name, contactPerson, phone, email };
  suppliers.push(newSupplier);
  res.status(201).json(newSupplier);
});

// PUT (update) an existing supplier
router.put('/:id', (req, res) => {
  const supplier = suppliers.find(s => s.id === parseInt(req.params.id));
  if (!supplier) return res.status(404).send('Supplier not found.');

  const { name, contactPerson, phone, email } = req.body;
  if (name) supplier.name = name;
  if (contactPerson) supplier.contactPerson = contactPerson;
  if (phone) supplier.phone = phone;
  if (email) supplier.email = email;

  res.json(supplier);
});

// DELETE a supplier
router.delete('/:id', (req, res) => {
  const supplierIndex = suppliers.findIndex(s => s.id === parseInt(req.params.id));
  if (supplierIndex === -1) return res.status(404).send('Supplier not found.');

  const deletedSupplier = suppliers.splice(supplierIndex, 1);
  res.json(deletedSupplier[0]);
});

module.exports = router; 