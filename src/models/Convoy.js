/**
 * Convoy Model Class
 * Represents a collection of vehicles with convoy-level statistics and calculations
 */
class Convoy {
  constructor(name = "Unnamed Convoy") {
    this.name = name;
    this.vehicles = [];

    // Convoy-level statistics
    this.statistics = {
      // Speed and Movement
      convoySpeed: null, // Minimum SPD × 10 × modifiers (km/h)
      sustainableSpeed: null, // Actual travel speed considering convoy size

      // Logistics
      totalFuelConsumption: null, // Sum of all vehicle FC
      totalCargoCapacity: null, // Sum of all vehicle CC
      averageManeuverability: null, // Weighted average MAN

      // Durability and Power
      totalDurability: null, // Sum of all vehicle DUR
      totalPowerRating: null, // Sum of all vehicle PWR
      totalMaintenanceCost: null, // Sum of all vehicle MC

      // Convoy Characteristics
      vehicleCount: 0,
      convoySize: null, // Small/Medium/Large/Huge
      convoyComplexity: null, // Simple/Standard/Complex/Specialized

      // Operational Capabilities
      dailyTravelDistance: null, // km per day (8 hours @ 85% efficiency)
      monthlyTravelDistance: null, // km per month (20 travel days)
      fuelLimitedRange: null, // Maximum range before refueling (km)
      monthlyFuelConsumption: null, // Liters per month
      monthlyMaintenanceHours: null, // Hours per month
      monthlyPartsCost: null, // Parts units per month
    };

    // Convoy modifiers
    this.modifiers = {
      sizeModifier: 1.0, // Speed penalty for convoy size
      terrainModifier: 1.0, // Speed modifier for terrain
      weatherModifier: 1.0, // Speed modifier for weather
      synergies: [], // Active synergy bonuses
    };

    // Operational parameters
    this.operationalParams = {
      hoursPerDay: 8, // Travel hours per day
      efficiency: 0.85, // Travel efficiency factor
      travelDaysPerMonth: 20, // Travel days per month (rest 2 days per 5)
      fuelReserve: 0.1, // 10% fuel reserve
    };

    this.errors = [];
  }

  /**
   * Add a vehicle to the convoy
   * @param {Vehicle} vehicle - Vehicle instance to add
   */
  addVehicle(vehicle) {
    if (!vehicle.hasValidStatistics()) {
      throw new Error(
        `Cannot add vehicle with invalid statistics: ${vehicle.getDisplayName()}`
      );
    }

    this.vehicles.push(vehicle);
    this._updateConvoyStatistics();
  }

  /**
   * Remove a vehicle from the convoy
   * @param {number} index - Index of vehicle to remove
   */
  removeVehicle(index) {
    if (index >= 0 && index < this.vehicles.length) {
      this.vehicles.splice(index, 1);
      this._updateConvoyStatistics();
    }
  }

  /**
   * Get convoy size category based on vehicle count
   * @returns {string} Size category
   */
  getConvoySizeCategory() {
    const count = this.vehicles.length;
    if (count <= 2) return "Small";
    if (count <= 5) return "Medium";
    if (count <= 10) return "Large";
    return "Huge";
  }

  /**
   * Get convoy size modifier for speed calculations
   * @returns {number} Size modifier (0.5 to 1.0)
   */
  getConvoySizeModifier() {
    const sizeCategory = this.getConvoySizeCategory();
    const modifiers = {
      Small: 1.0,
      Medium: 0.9,
      Large: 0.8,
      Huge: 0.5,
    };
    return modifiers[sizeCategory] || 1.0;
  }

  /**
   * Get convoy complexity level
   * @returns {string} Complexity level
   */
  getConvoyComplexity() {
    if (this.vehicles.length === 0) return "Simple";

    const complexities = this.vehicles.map((v) => v.categories.complexityLevel);
    const hasSpecialized = complexities.includes("Specialized");
    const hasComplex = complexities.includes("Complex");
    const hasStandard = complexities.includes("Standard");

    if (hasSpecialized) return "Specialized";
    if (hasComplex) return "Complex";
    if (hasStandard) return "Standard";
    return "Simple";
  }

  /**
   * Calculate minimum speed rating in convoy
   * @returns {number} Minimum SPD among all vehicles
   */
  getMinimumSpeedRating() {
    if (this.vehicles.length === 0) return 0;
    return Math.min(...this.vehicles.map((v) => v.statistics.speedRating));
  }

  /**
   * Calculate weighted average maneuverability
   * @returns {number} Weighted average maneuverability
   */
  getAverageManeuverability() {
    if (this.vehicles.length === 0) return 0;

    const totalManeuverability = this.vehicles.reduce(
      (sum, v) => sum + v.statistics.maneuverability,
      0
    );
    return Math.round(totalManeuverability / this.vehicles.length);
  }

  /**
   * Update all convoy-level statistics
   * @private
   */
  _updateConvoyStatistics() {
    const stats = this.statistics;

    // Basic counts
    stats.vehicleCount = this.vehicles.length;
    stats.convoySize = this.getConvoySizeCategory();
    stats.convoyComplexity = this.getConvoyComplexity();

    if (this.vehicles.length === 0) {
      // Reset all statistics for empty convoy
      Object.keys(stats).forEach((key) => {
        if (typeof stats[key] === "number") {
          stats[key] = 0;
        }
      });
      return;
    }

    // Speed calculations
    const minSpeedRating = this.getMinimumSpeedRating();
    this.modifiers.sizeModifier = this.getConvoySizeModifier();

    stats.convoySpeed = Math.round(
      minSpeedRating *
        10 *
        this.modifiers.sizeModifier *
        this.modifiers.terrainModifier
    );
    stats.sustainableSpeed = stats.convoySpeed;

    // Aggregate statistics
    stats.totalFuelConsumption = this.vehicles.reduce(
      (sum, v) => sum + v.statistics.fuelConsumption,
      0
    );
    stats.totalCargoCapacity = this.vehicles.reduce(
      (sum, v) => sum + v.statistics.cargoCapacity,
      0
    );
    stats.totalDurability = this.vehicles.reduce(
      (sum, v) => sum + v.statistics.durability,
      0
    );
    stats.totalPowerRating = this.vehicles.reduce(
      (sum, v) => sum + v.statistics.powerRating,
      0
    );
    stats.totalMaintenanceCost = this.vehicles.reduce(
      (sum, v) => sum + v.statistics.maintenanceCost,
      0
    );

    stats.averageManeuverability = this.getAverageManeuverability();

    // Operational calculations
    const params = this.operationalParams;

    // Daily travel: speed × hours × efficiency
    stats.dailyTravelDistance = Math.round(
      stats.sustainableSpeed * params.hoursPerDay * params.efficiency
    );

    // Monthly travel: daily × travel days per month
    stats.monthlyTravelDistance =
      stats.dailyTravelDistance * params.travelDaysPerMonth;

    // Fuel-limited range (assuming average fuel tank capacity)
    const averageFuelCapacity = this._estimateAverageFuelCapacity();
    const totalFuelCapacity = averageFuelCapacity * this.vehicles.length;
    const fuelConsumptionPerKm = stats.totalFuelConsumption / 100; // FC is per 100km
    stats.fuelLimitedRange = Math.round(
      (totalFuelCapacity * (1 - params.fuelReserve)) / fuelConsumptionPerKm
    );

    // Monthly fuel consumption: monthly distance × consumption rate
    stats.monthlyFuelConsumption = Math.round(
      (stats.monthlyTravelDistance / 100) * stats.totalFuelConsumption
    );

    // Monthly maintenance
    stats.monthlyMaintenanceHours = stats.totalMaintenanceCost;
    stats.monthlyPartsCost = Math.round(stats.totalMaintenanceCost * 0.2);
  }

  /**
   * Estimate average fuel capacity based on vehicle types
   * @returns {number} Estimated fuel capacity in liters
   * @private
   */
  _estimateAverageFuelCapacity() {
    if (this.vehicles.length === 0) return 50;

    const capacityEstimates = {
      motorcycle: 15,
      car: 50,
      suv: 70,
      truck: 100,
      commercial: 200,
      military: 500,
      specialty: 300,
    };

    const totalCapacity = this.vehicles.reduce((sum, vehicle) => {
      const type = vehicle.categories.typeCategory.toLowerCase();
      return sum + (capacityEstimates[type] || 50);
    }, 0);

    return Math.round(totalCapacity / this.vehicles.length);
  }

  /**
   * Apply terrain modifier
   * @param {number} modifier - Terrain speed modifier (0.1 to 1.0)
   */
  setTerrainModifier(modifier) {
    this.modifiers.terrainModifier = Math.max(0.1, Math.min(1.0, modifier));
    this._updateConvoyStatistics();
  }

  /**
   * Apply weather modifier
   * @param {number} modifier - Weather speed modifier (0.1 to 1.0)
   */
  setWeatherModifier(modifier) {
    this.modifiers.weatherModifier = Math.max(0.1, Math.min(1.0, modifier));
    this._updateConvoyStatistics();
  }

  /**
   * Get operational summary
   * @returns {string} Formatted operational summary
   */
  getOperationalSummary() {
    const stats = this.statistics;

    return `${this.name} Operational Summary:
- ${stats.vehicleCount} vehicles (${stats.convoySize} convoy, ${
      stats.convoyComplexity
    } complexity)
- Sustainable Speed: ${stats.sustainableSpeed} km/h
- Daily Travel: ${stats.dailyTravelDistance} km (${
      this.operationalParams.hoursPerDay
    }h @ ${Math.round(this.operationalParams.efficiency * 100)}% efficiency)
- Monthly Travel: ${stats.monthlyTravelDistance} km (${
      this.operationalParams.travelDaysPerMonth
    } travel days)
- Fuel-Limited Range: ${stats.fuelLimitedRange} km
- Monthly Consumption: ${stats.monthlyFuelConsumption}L fuel, ${
      stats.monthlyMaintenanceHours
    }h maintenance, ${stats.monthlyPartsCost} parts units
- Total Cargo: ${stats.totalCargoCapacity} units, Power: ${
      stats.totalPowerRating
    } PWR, Durability: ${stats.totalDurability} DUR`;
  }

  /**
   * Export convoy data as JSON
   * @returns {object} Complete convoy data
   */
  toJSON() {
    return {
      name: this.name,
      vehicles: this.vehicles.map((v) => v.toJSON()),
      statistics: { ...this.statistics },
      modifiers: { ...this.modifiers },
      operationalParams: { ...this.operationalParams },
      operationalSummary: this.getOperationalSummary(),
      errors: [...this.errors],
    };
  }

  /**
   * Create Convoy from JSON data
   * @param {object} data - JSON data
   * @returns {Convoy} New Convoy instance
   */
  static fromJSON(data) {
    const convoy = new Convoy(data.name);

    if (data.vehicles) {
      // Import vehicles (assuming Vehicle.fromJSON exists)
      const Vehicle = require("./Vehicle");
      data.vehicles.forEach((vehicleData) => {
        const vehicle = Vehicle.fromJSON(vehicleData);
        if (vehicle.hasValidStatistics()) {
          convoy.vehicles.push(vehicle);
        }
      });
    }

    if (data.modifiers) {
      convoy.modifiers = { ...convoy.modifiers, ...data.modifiers };
    }

    if (data.operationalParams) {
      convoy.operationalParams = {
        ...convoy.operationalParams,
        ...data.operationalParams,
      };
    }

    convoy._updateConvoyStatistics();

    return convoy;
  }
}

module.exports = Convoy;
