/**
 * Convoy Management System - Main Entry Point
 * 
 * This file provides easy access to all the main classes and services
 * for programmatic usage of the Convoy Management System.
 */

// Models
const Vehicle = require('./src/models/Vehicle');
const Convoy = require('./src/models/Convoy');

// Services
const CalculatorService = require('./src/services/CalculatorService');
const ConvoyManager = require('./src/services/ConvoyManager');

// CLI (for programmatic access)
const ConvoyCLI = require('./src/cli');

module.exports = {
  // Models
  Vehicle,
  Convoy,
  
  // Services
  CalculatorService,
  ConvoyManager,
  
  // CLI
  ConvoyCLI,
  
  // Convenience factory functions
  createVehicle: (specs) => {
    const manager = new ConvoyManager();
    return manager.createVehicle(specs);
  },
  
  createConvoy: (name, vehicleSpecs, options = {}) => {
    const manager = new ConvoyManager();
    return manager.createConvoy(name, vehicleSpecs, options);
  },
  
  // Quick calculation function for backward compatibility
  calculateVehicle: (specs) => {
    const manager = new ConvoyManager();
    const vehicle = manager.createVehicle(specs);
    return vehicle.toJSON();
  }
};
