const express = require('express');
const router = express.Router();

// In-memory data store for inventory (associates drugs with pharmacies)
// Each item: { pharmacyId, drugId, quantity, purchasePrice, expiryDate, batchNumber }
let inventory = [];

// Helper function to find an inventory item
const findInventoryItem = (pharmacyId, drugId) => {
  return inventory.find(item => item.pharmacyId === pharmacyId && item.drugId === drugId);
};

// Helper function to find an inventory item index
const findInventoryItemIndex = (pharmacyId, drugId) => {
  return inventory.findIndex(item => item.pharmacyId === pharmacyId && item.drugId === drugId);
};

// POST: Add/Update drug in a pharmacy's inventory (upsert logic)
router.post('/pharmacies/:pharmacyId/drugs/:drugId', (req, res) => {
  const pharmacyId = parseInt(req.params.pharmacyId);
  const drugId = parseInt(req.params.drugId);
  const { quantity, purchasePrice, expiryDate, batchNumber } = req.body;

  if (quantity === undefined || purchasePrice === undefined || !expiryDate) {
    return res.status(400).send('Quantity, purchase price, and expiry date are required.');
  }

  const itemIndex = findInventoryItemIndex(pharmacyId, drugId);

  if (itemIndex > -1) {
    // Update existing item (e.g., add to quantity, update price if it changed)
    inventory[itemIndex].quantity += parseInt(quantity);
    inventory[itemIndex].purchasePrice = parseFloat(purchasePrice); // Or average it, etc.
    inventory[itemIndex].expiryDate = expiryDate;
    inventory[itemIndex].batchNumber = batchNumber || inventory[itemIndex].batchNumber;
    res.json(inventory[itemIndex]);
  } else {
    // Add new item
    const newItem = {
      pharmacyId,
      drugId,
      quantity: parseInt(quantity),
      purchasePrice: parseFloat(purchasePrice),
      expiryDate,
      batchNumber
    };
    inventory.push(newItem);
    res.status(201).json(newItem);
  }
});

// GET: All inventory for a specific pharmacy
router.get('/pharmacies/:pharmacyId', (req, res) => {
  const pharmacyId = parseInt(req.params.pharmacyId);
  const pharmacyInventory = inventory.filter(item => item.pharmacyId === pharmacyId);
  res.json(pharmacyInventory);
});

// GET: Specific drug in a pharmacy's inventory
router.get('/pharmacies/:pharmacyId/drugs/:drugId', (req, res) => {
  const pharmacyId = parseInt(req.params.pharmacyId);
  const drugId = parseInt(req.params.drugId);
  const item = findInventoryItem(pharmacyId, drugId);
  if (!item) return res.status(404).send('Inventory item not found.');
  res.json(item);
});

// PUT: Update details of a specific drug in inventory (e.g., quantity, expiry)
router.put('/pharmacies/:pharmacyId/drugs/:drugId', (req, res) => {
  const pharmacyId = parseInt(req.params.pharmacyId);
  const drugId = parseInt(req.params.drugId);
  const item = findInventoryItem(pharmacyId, drugId);

  if (!item) return res.status(404).send('Inventory item not found.');

  const { quantity, purchasePrice, expiryDate, batchNumber } = req.body;

  // Update only provided fields
  if (quantity !== undefined) item.quantity = parseInt(quantity);
  if (purchasePrice !== undefined) item.purchasePrice = parseFloat(purchasePrice);
  if (expiryDate) item.expiryDate = expiryDate;
  if (batchNumber) item.batchNumber = batchNumber;

  res.json(item);
});

// DELETE: Remove a drug from a pharmacy's inventory
router.delete('/pharmacies/:pharmacyId/drugs/:drugId', (req, res) => {
  const pharmacyId = parseInt(req.params.pharmacyId);
  const drugId = parseInt(req.params.drugId);
  const itemIndex = findInventoryItemIndex(pharmacyId, drugId);

  if (itemIndex === -1) return res.status(404).send('Inventory item not found.');

  const deletedItem = inventory.splice(itemIndex, 1);
  res.json(deletedItem[0]);
});

// GET: Expired drugs for a specific pharmacy
router.get('/pharmacies/:pharmacyId/expired', (req, res) => {
  const pharmacyId = parseInt(req.params.pharmacyId);
  const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
  const expiredItems = inventory.filter(item => 
    item.pharmacyId === pharmacyId && item.expiryDate < today
  );
  res.json(expiredItems);
});

// GET: Out-of-stock (quantity = 0) drugs for a specific pharmacy
router.get('/pharmacies/:pharmacyId/outofstock', (req, res) => {
  const pharmacyId = parseInt(req.params.pharmacyId);
  const outOfStockItems = inventory.filter(item => 
    item.pharmacyId === pharmacyId && item.quantity === 0
  );
  res.json(outOfStockItems);
});

// GET: Total value of inventory for a specific pharmacy
router.get('/pharmacies/:pharmacyId/value', (req, res) => {
  const pharmacyId = parseInt(req.params.pharmacyId);
  const pharmacyInventory = inventory.filter(item => item.pharmacyId === pharmacyId);
  const totalValue = pharmacyInventory.reduce((sum, item) => {
    return sum + (item.quantity * item.purchasePrice);
  }, 0);
  res.json({ pharmacyId, totalValue: parseFloat(totalValue.toFixed(2)) });
});

module.exports = router; 