const express = require('express');
const router = express.Router();

// In-memory data store for orders
let orders = [];
let currentOrderId = 1;

// GET all orders
router.get('/', (req, res) => {
  res.json(orders);
});

// GET a specific order by ID
router.get('/:id', (req, res) => {
  const order = orders.find(o => o.id === parseInt(req.params.id));
  if (!order) return res.status(404).send('Order not found.');
  res.json(order);
});

// POST (create) a new order
router.post('/', (req, res) => {
  const { pharmacyId, supplierId, items, expectedDeliveryDate, status } = req.body;
  if (!pharmacyId || !supplierId || !items || items.length === 0) {
    return res.status(400).send('Pharmacy ID, Supplier ID, and at least one item are required.');
  }
  // Basic validation for items
  for (const item of items) {
    if (!item.drugId || !item.quantity || !item.pricePerItem) {
      return res.status(400).send('Each order item must have drugId, quantity, and pricePerItem.');
    }
  }
  const newOrder = {
    id: currentOrderId++,
    pharmacyId: parseInt(pharmacyId),
    supplierId: parseInt(supplierId),
    items: items.map(item => ({
      drugId: parseInt(item.drugId),
      quantity: parseInt(item.quantity),
      pricePerItem: parseFloat(item.pricePerItem)
    })),
    orderDate: new Date().toISOString(),
    expectedDeliveryDate,
    status: status || 'pending' // Default status
  };
  orders.push(newOrder);
  res.status(201).json(newOrder);
});

// PUT (update) an existing order (e.g., update status or items)
router.put('/:id', (req, res) => {
  const orderId = parseInt(req.params.id);
  const order = orders.find(o => o.id === orderId);
  if (!order) return res.status(404).send('Order not found.');

  const { pharmacyId, supplierId, items, expectedDeliveryDate, status } = req.body;

  // For simplicity, we'll allow updating certain fields.
  // In a real system, order updates might be more restrictive.
  if (pharmacyId) order.pharmacyId = parseInt(pharmacyId);
  if (supplierId) order.supplierId = parseInt(supplierId);
  if (items && items.length > 0) {
    // Basic validation for items
    for (const item of items) {
        if (!item.drugId || !item.quantity || !item.pricePerItem) {
            return res.status(400).send('Each order item must have drugId, quantity, and pricePerItem.');
        }
    }
    order.items = items.map(item => ({
        drugId: parseInt(item.drugId),
        quantity: parseInt(item.quantity),
        pricePerItem: parseFloat(item.pricePerItem)
      }));
  }
  if (expectedDeliveryDate) order.expectedDeliveryDate = expectedDeliveryDate;
  if (status) order.status = status;

  res.json(order);
});

// DELETE an order (or mark as cancelled)
router.delete('/:id', (req, res) => {
  const orderIndex = orders.findIndex(o => o.id === parseInt(req.params.id));
  if (orderIndex === -1) return res.status(404).send('Order not found.');

  // Option 1: Actually delete
  // const deletedOrder = orders.splice(orderIndex, 1);
  // res.json(deletedOrder[0]);

  // Option 2: Mark as cancelled (often preferred)
  orders[orderIndex].status = 'cancelled';
  res.json(orders[orderIndex]);
});

module.exports = router; 