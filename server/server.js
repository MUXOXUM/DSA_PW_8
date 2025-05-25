const express = require('express');
const pharmacyRoutes = require('./api_routes/pharmacies'); // Import pharmacy routes

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json()); // Middleware to parse JSON bodies

// API routes
app.use('/api/pharmacies', pharmacyRoutes); // Use pharmacy routes

// Placeholder for other API routes
app.get('/', (req, res) => {
  res.send('Pharmacy API is running!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
}); 