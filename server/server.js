const express = require('express');
const pharmacyRoutes = require('./api_routes/pharmacies'); // Import pharmacy routes
const drugRoutes = require('./api_routes/drugs'); // Import drug routes
const supplierRoutes = require('./api_routes/suppliers'); // Import supplier routes
const orderRoutes = require('./api_routes/orders'); // Import order routes
const inventoryRoutes = require('./api_routes/inventory'); // Import inventory routes

const app = express();
const port = process.env.PORT || 3000;

// Hardcoded token for demonstration purposes
const AUTH_TOKEN = 'SECRET_STATIC_TOKEN';

// Authentication middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (token == null) {
    return res.sendStatus(401); // If no token, unauthorized
  }

  if (token === AUTH_TOKEN) {
    next(); // Token is valid, proceed to the next middleware or route handler
  } else {
    return res.sendStatus(403); // If token is not valid, forbidden
  }
};

app.use(express.json()); // Middleware to parse JSON bodies

// Apply authentication middleware to all /api routes
app.use('/api', authenticateToken);

// API routes
app.use('/api/pharmacies', pharmacyRoutes); // Use pharmacy routes
app.use('/api/drugs', drugRoutes); // Use drug routes
app.use('/api/suppliers', supplierRoutes); // Use supplier routes
app.use('/api/orders', orderRoutes); // Use order routes
app.use('/api/inventory', inventoryRoutes); // Use inventory routes

// Placeholder for other API routes
app.get('/', (req, res) => {
  res.send('Pharmacy API is running!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
}); 