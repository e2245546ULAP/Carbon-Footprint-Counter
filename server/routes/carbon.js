const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const mysql = require('mysql2/promise');
const { calculateCarbonFootprint } = require('../services/climatiqService');

// Database configuration (same as server.js)
const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
};
const pool = mysql.createPool(dbConfig);

// Middleware to verify JWT
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer <token>
  if (!token) {
    return res.status(401).json({ success: false, message: 'Access token required' });
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ success: false, message: 'Invalid or expired token' });
    }
    req.user = user; // Attach user info (id, email) to request
    next();
  });
};

// Supported emission factors and their Climatiq activity IDs
const emissionFactorMap = {
  electricity: 'electricity-supply_grid-source_supplier_mix',
  passenger_vehicle: 'passenger_vehicle-vehicle_type_car-fuel_source_na-engine_size_na-vehicle_age_na-vehicle_weight_na'
};

// Validate input data
const validateInput = (emission_factor, parameters) => {
  if (!emission_factor || typeof emission_factor !== 'string') {
    return 'Emission factor is required and must be a string';
  }
  if (!emissionFactorMap[emission_factor]) {
    return `Unsupported emission factor: ${emission_factor}. Supported values: ${Object.keys(emissionFactorMap).join(', ')}`;
  }
  if (!parameters || typeof parameters !== 'object') {
    return 'Parameters are required and must be an object';
  }
  // Validation for specific emission factors
  if (emission_factor === 'electricity') {
    if (!parameters.energy || typeof parameters.energy !== 'number' || parameters.energy <= 0) {
      return 'Energy must be a positive number for electricity';
    }
    const unit = parameters.unit || parameters.energy_unit;
    if (!unit || !['kWh', 'MWh'].includes(unit)) {
      return 'Energy unit must be kWh or MWh for electricity';
    }
    if (parameters.region && typeof parameters.region !== 'string') {
      return 'Region must be a string for electricity (e.g., US, GB)';
    }
  } else if (emission_factor === 'passenger_vehicle') {
    if (!parameters.distance || typeof parameters.distance !== 'number' || parameters.distance <= 0) {
      return 'Distance must be a positive number for passenger_vehicle';
    }
    const unit = parameters.unit || parameters.distance_unit;
    if (!unit || !['km', 'mi'].includes(unit)) {
      return 'Unit must be km or mi for passenger_vehicle';
    }
  }
  return null; // No errors
};

// POST /api/carbon
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { emission_factor, parameters } = req.body;

    // Validate input
    const validationError = validateInput(emission_factor, parameters);
    if (validationError) {
      return res.status(400).json({ success: false, message: validationError });
    }

    // Format parameters for Climatiq API
    let climatiqParameters = { ...parameters };
    if (emission_factor === 'electricity') {
      climatiqParameters = {
        energy: parameters.energy,
        energy_unit: parameters.unit || parameters.energy_unit // Map unit to energy_unit
      };
    } else if (emission_factor === 'passenger_vehicle') {
      climatiqParameters = {
        distance: parameters.distance,
        distance_unit: parameters.unit || parameters.distance_unit // Map unit to distance_unit
      };
    }

    // Format data for Climatiq API
    const activityData = {
      emission_factor: {
        activity_id: emissionFactorMap[emission_factor],
        data_version: "21.21", // Temporary to match direct test
        ...(parameters.region && { region: parameters.region }) // Optional region
      },
      parameters: climatiqParameters
    };

    // Calculate carbon footprint using Climatiq API
    const result = await calculateCarbonFootprint(activityData);
    if (!result || !result.co2e) {
      return res.status(500).json({ success: false, message: 'Failed to calculate carbon footprint' });
    }

    // Store result in database
    const [dbResult] = await pool.query(
      'INSERT INTO carbon_calculations (user_id, emission_factor, parameters, co2e, created_at) VALUES (?, ?, ?, ?, NOW())',
      [req.user.id, emission_factor, JSON.stringify(parameters), result.co2e]
    );

    // Respond with result
    res.status(200).json({
      success: true,
      message: 'Carbon footprint calculated successfully',
      data: {
        calculation_id: dbResult.insertId,
        co2e: result.co2e,
        unit: result.co2e_unit || 'kg',
        details: result
      }
    });
  } catch (error) {
    console.error('Error in /api/carbon:', error);
    const message = error.message.includes('No emission factors')
      ? 'Invalid activity or parameters. Please check your input.'
      : error.message || 'Internal server error';
    res.status(500).json({ success: false, message });
  }
});

// Test DB connection route
router.get('/test-db', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT 1 AS test');
    res.status(200).json({ success: true, message: 'Database connection successful', data: rows });
  } catch (error) {
    console.error('Database test error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
