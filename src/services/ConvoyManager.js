const Vehicle = require('../models/Vehicle');
const Convoy = require('../models/Convoy');
const CalculatorService = require('./CalculatorService');

/**
 * Convoy Manager Service
 * High-level service for managing convoys and vehicle calculations
 */
class ConvoyManager {
  constructor() {
    this.calculator = new CalculatorService();
  }

  /**
   * Create a vehicle from specifications
   * @param {object} specs - Vehicle specifications
   * @returns {Vehicle} Calculated vehicle instance
   */
  createVehicle(specs) {
    const vehicle = new Vehicle(specs);
    return this.calculator.calculateVehicleStatistics(vehicle);
  }

  /**
   * Create multiple vehicles from an array of specifications
   * @param {Array} specsArray - Array of vehicle specifications
   * @returns {Array} Array of calculated vehicle instances
   */
  createVehicles(specsArray) {
    return specsArray.map(specs => this.createVehicle(specs));
  }

  /**
   * Create a convoy from vehicle specifications
   * @param {string} convoyName - Name for the convoy
   * @param {Array} vehicleSpecs - Array of vehicle specifications
   * @param {object} options - Optional convoy configuration
   * @returns {Convoy} Convoy instance with calculated statistics
   */
  createConvoy(convoyName, vehicleSpecs, options = {}) {
    const convoy = new Convoy(convoyName);
    
    // Apply operational parameters if provided
    if (options.operationalParams) {
      convoy.operationalParams = { ...convoy.operationalParams, ...options.operationalParams };
    }

    // Create and add vehicles
    const vehicles = this.createVehicles(vehicleSpecs);
    
    vehicles.forEach(vehicle => {
      if (vehicle.hasValidStatistics()) {
        convoy.addVehicle(vehicle);
      } else {
        convoy.errors.push(`Failed to add vehicle ${vehicle.getDisplayName()}: ${vehicle.errors.join(', ')}`);
      }
    });

    // Apply modifiers if provided
    if (options.terrainModifier) {
      convoy.setTerrainModifier(options.terrainModifier);
    }
    
    if (options.weatherModifier) {
      convoy.setWeatherModifier(options.weatherModifier);
    }

    return convoy;
  }

  /**
   * Process convoy input data (handles both single vehicle and convoy requests)
   * @param {object} input - Input data
   * @returns {object} Processed result
   */
  processInput(input) {
    try {
      // Check if input is for a single vehicle or convoy
      if (this.isSingleVehicleInput(input)) {
        return this.processSingleVehicle(input);
      } else if (this.isConvoyInput(input)) {
        return this.processConvoyInput(input);
      } else {
        throw new Error('Invalid input format. Expected single vehicle specs or convoy configuration.');
      }
    } catch (error) {
      return {
        error: error.message,
        inputReceived: input
      };
    }
  }

  /**
   * Check if input is for a single vehicle
   * @param {object} input - Input data
   * @returns {boolean} True if single vehicle input
   */
  isSingleVehicleInput(input) {
    return !!(input.topSpeed && input.vehicleType && input.driveType && !input.vehicles && !input.convoyName);
  }

  /**
   * Check if input is for a convoy
   * @param {object} input - Input data
   * @returns {boolean} True if convoy input
   */
  isConvoyInput(input) {
    return !!((input.vehicles && Array.isArray(input.vehicles)) || input.convoyName);
  }

  /**
   * Process single vehicle input
   * @param {object} input - Single vehicle specifications
   * @returns {object} Vehicle calculation result
   */
  processSingleVehicle(input) {
    const vehicle = this.createVehicle(input);
    
    return {
      type: 'vehicle',
      result: vehicle.toJSON()
    };
  }

  /**
   * Process convoy input
   * @param {object} input - Convoy configuration
   * @returns {object} Convoy calculation result
   */
  processConvoyInput(input) {
    const convoyName = input.convoyName || 'Unnamed Convoy';
    const vehicleSpecs = input.vehicles || [];
    
    // Extract options
    const options = {
      terrainModifier: input.terrainModifier,
      weatherModifier: input.weatherModifier,
      operationalParams: input.operationalParams
    };

    const convoy = this.createConvoy(convoyName, vehicleSpecs, options);
    
    return {
      type: 'convoy',
      result: convoy.toJSON()
    };
  }

  /**
   * Calculate convoy statistics from existing vehicles
   * @param {Array} vehicles - Array of Vehicle instances
   * @param {string} convoyName - Name for the convoy
   * @param {object} options - Optional convoy configuration
   * @returns {Convoy} Convoy instance
   */
  createConvoyFromVehicles(vehicles, convoyName = 'Unnamed Convoy', options = {}) {
    const convoy = new Convoy(convoyName);
    
    // Apply operational parameters if provided
    if (options.operationalParams) {
      convoy.operationalParams = { ...convoy.operationalParams, ...options.operationalParams };
    }

    // Add vehicles to convoy
    vehicles.forEach(vehicle => {
      if (vehicle.hasValidStatistics()) {
        convoy.addVehicle(vehicle);
      } else {
        convoy.errors.push(`Failed to add vehicle ${vehicle.getDisplayName()}: ${vehicle.errors.join(', ')}`);
      }
    });

    // Apply modifiers if provided
    if (options.terrainModifier) {
      convoy.setTerrainModifier(options.terrainModifier);
    }
    
    if (options.weatherModifier) {
      convoy.setWeatherModifier(options.weatherModifier);
    }

    return convoy;
  }

  /**
   * Validate convoy configuration
   * @param {object} config - Convoy configuration
   * @returns {Array} Array of validation errors
   */
  validateConvoyConfig(config) {
    const errors = [];

    if (!config.vehicles || !Array.isArray(config.vehicles)) {
      errors.push('Convoy configuration must include a vehicles array');
    } else if (config.vehicles.length === 0) {
      errors.push('Convoy must have at least one vehicle');
    }

    if (config.terrainModifier && (config.terrainModifier < 0.1 || config.terrainModifier > 1.0)) {
      errors.push('Terrain modifier must be between 0.1 and 1.0');
    }

    if (config.weatherModifier && (config.weatherModifier < 0.1 || config.weatherModifier > 1.0)) {
      errors.push('Weather modifier must be between 0.1 and 1.0');
    }

    return errors;
  }

  /**
   * Get convoy comparison summary
   * @param {Array} convoys - Array of Convoy instances
   * @returns {object} Comparison summary
   */
  compareConvoys(convoys) {
    if (!convoys || convoys.length === 0) {
      return { error: 'No convoys provided for comparison' };
    }

    const comparison = {
      convoys: convoys.map(convoy => ({
        name: convoy.name,
        vehicleCount: convoy.statistics.vehicleCount,
        sustainableSpeed: convoy.statistics.sustainableSpeed,
        dailyRange: convoy.statistics.dailyTravelDistance,
        monthlyRange: convoy.statistics.monthlyTravelDistance,
        fuelLimitedRange: convoy.statistics.fuelLimitedRange,
        totalCargo: convoy.statistics.totalCargoCapacity,
        totalPower: convoy.statistics.totalPowerRating,
        monthlyFuelConsumption: convoy.statistics.monthlyFuelConsumption,
        monthlyMaintenanceCost: convoy.statistics.monthlyMaintenanceHours
      })),
      fastest: null,
      longestRange: null,
      mostCargo: null,
      mostPowerful: null,
      mostEfficient: null
    };

    // Find best in each category
    let fastestSpeed = 0;
    let longestRange = 0;
    let mostCargo = 0;
    let mostPower = 0;
    let bestEfficiency = Infinity;

    comparison.convoys.forEach(convoy => {
      if (convoy.sustainableSpeed > fastestSpeed) {
        fastestSpeed = convoy.sustainableSpeed;
        comparison.fastest = convoy.name;
      }
      
      if (convoy.fuelLimitedRange > longestRange) {
        longestRange = convoy.fuelLimitedRange;
        comparison.longestRange = convoy.name;
      }
      
      if (convoy.totalCargo > mostCargo) {
        mostCargo = convoy.totalCargo;
        comparison.mostCargo = convoy.name;
      }
      
      if (convoy.totalPower > mostPower) {
        mostPower = convoy.totalPower;
        comparison.mostPowerful = convoy.name;
      }

      // Efficiency: fuel consumption per km of range
      const efficiency = convoy.monthlyFuelConsumption / convoy.monthlyRange;
      if (efficiency < bestEfficiency) {
        bestEfficiency = efficiency;
        comparison.mostEfficient = convoy.name;
      }
    });

    return comparison;
  }

  /**
   * Generate convoy recommendations based on mission requirements
   * @param {object} requirements - Mission requirements
   * @param {Array} availableVehicles - Array of available vehicle specs
   * @returns {object} Convoy recommendations
   */
  generateConvoyRecommendations(requirements, availableVehicles) {
    const recommendations = {
      requirements,
      recommendations: [],
      analysis: {}
    };

    // Analyze requirements
    const needsSpeed = requirements.minSpeed || 0;
    const needsRange = requirements.minRange || 0;
    const needsCargo = requirements.minCargo || 0;
    const needsPower = requirements.minPower || 0;
    const maxVehicles = requirements.maxVehicles || 10;

    // Create vehicles from specs
    const vehicles = this.createVehicles(availableVehicles);
    const validVehicles = vehicles.filter(v => v.hasValidStatistics());

    if (validVehicles.length === 0) {
      recommendations.analysis.error = 'No valid vehicles available';
      return recommendations;
    }

    // Generate different convoy configurations
    const configs = [
      { name: 'Speed Focused', vehicles: this.selectVehiclesForSpeed(validVehicles, maxVehicles) },
      { name: 'Range Focused', vehicles: this.selectVehiclesForRange(validVehicles, maxVehicles) },
      { name: 'Cargo Focused', vehicles: this.selectVehiclesForCargo(validVehicles, maxVehicles) },
      { name: 'Balanced', vehicles: this.selectVehiclesBalanced(validVehicles, maxVehicles) }
    ];

    // Evaluate each configuration
    configs.forEach(config => {
      if (config.vehicles.length > 0) {
        const convoy = this.createConvoyFromVehicles(config.vehicles, config.name);
        const stats = convoy.statistics;
        
        const meetsRequirements = 
          stats.sustainableSpeed >= needsSpeed &&
          stats.fuelLimitedRange >= needsRange &&
          stats.totalCargoCapacity >= needsCargo &&
          stats.totalPowerRating >= needsPower;

        recommendations.recommendations.push({
          name: config.name,
          meetsRequirements,
          vehicles: config.vehicles.map(v => v.getDisplayName()),
          statistics: {
            speed: stats.sustainableSpeed,
            range: stats.fuelLimitedRange,
            cargo: stats.totalCargoCapacity,
            power: stats.totalPowerRating,
            efficiency: Math.round(stats.monthlyFuelConsumption / stats.monthlyTravelDistance * 100) / 100
          }
        });
      }
    });

    return recommendations;
  }

  /**
   * Select vehicles optimized for speed
   * @param {Array} vehicles - Available vehicles
   * @param {number} maxCount - Maximum vehicle count
   * @returns {Array} Selected vehicles
   */
  selectVehiclesForSpeed(vehicles, maxCount) {
    return vehicles
      .sort((a, b) => b.statistics.speedRating - a.statistics.speedRating)
      .slice(0, Math.min(maxCount, 3)); // Keep convoy small for speed
  }

  /**
   * Select vehicles optimized for range
   * @param {Array} vehicles - Available vehicles
   * @param {number} maxCount - Maximum vehicle count
   * @returns {Array} Selected vehicles
   */
  selectVehiclesForRange(vehicles, maxCount) {
    return vehicles
      .sort((a, b) => a.statistics.fuelConsumption - b.statistics.fuelConsumption)
      .slice(0, Math.min(maxCount, 4));
  }

  /**
   * Select vehicles optimized for cargo capacity
   * @param {Array} vehicles - Available vehicles
   * @param {number} maxCount - Maximum vehicle count
   * @returns {Array} Selected vehicles
   */
  selectVehiclesForCargo(vehicles, maxCount) {
    return vehicles
      .sort((a, b) => b.statistics.cargoCapacity - a.statistics.cargoCapacity)
      .slice(0, maxCount);
  }

  /**
   * Select vehicles for balanced convoy
   * @param {Array} vehicles - Available vehicles
   * @param {number} maxCount - Maximum vehicle count
   * @returns {Array} Selected vehicles
   */
  selectVehiclesBalanced(vehicles, maxCount) {
    // Score vehicles based on multiple factors
    const scoredVehicles = vehicles.map(vehicle => {
      const stats = vehicle.statistics;
      const score = 
        stats.speedRating * 0.3 +
        (20 - stats.fuelConsumption) * 0.2 + // Lower fuel consumption is better
        stats.cargoCapacity * 0.2 +
        stats.powerRating * 0.15 +
        stats.maneuverability * 0.15;
      
      return { vehicle, score };
    });

    return scoredVehicles
      .sort((a, b) => b.score - a.score)
      .slice(0, maxCount)
      .map(item => item.vehicle);
  }
}

module.exports = ConvoyManager;
