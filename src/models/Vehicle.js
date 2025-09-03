/**
 * Vehicle Model Class
 * Represents an individual vehicle with its specifications and calculated statistics
 */
class Vehicle {
  constructor(specs = {}) {
    // Input specifications
    this.specs = {
      vehicleName: specs.vehicleName || "Unnamed Vehicle",
      make: specs.make || "",
      model: specs.model || "",
      year: specs.year || null,
      topSpeed: specs.topSpeed,
      vehicleType: specs.vehicleType,
      driveType: specs.driveType,
      cylinders: specs.cylinders || null,
      displacement: specs.displacement || null,
      horsepower: specs.horsepower || null,
      fuelType: specs.fuelType || "gasoline",
      militaryClass: specs.militaryClass || null,
      weight: specs.weight || null,
    };

    // Calculated statistics (will be populated by CalculatorService)
    this.statistics = {
      speedRating: null,
      sustainableSpeed: null,
      fuelConsumption: null,
      cargoCapacity: null,
      cargoCategory: null,
      maneuverability: null,
      durability: null,
      powerRating: null,
      maintenanceCost: null,
    };

    // Vehicle categories (will be populated by CalculatorService)
    this.categories = {
      sizeCategory: null,
      typeCategory: null,
      complexityLevel: null,
      militaryClass: null,
    };

    // Calculation details for transparency
    this.calculationDetails = {};

    // Validation errors
    this.errors = [];
  }

  /**
   * Get the vehicle's display name
   * @returns {string} Formatted vehicle name
   */
  getDisplayName() {
    if (this.specs.make && this.specs.model) {
      const year = this.specs.year ? ` ${this.specs.year}` : "";
      return `${this.specs.make} ${this.specs.model}${year}`;
    }
    return this.specs.vehicleName;
  }

  /**
   * Get the vehicle's full identifier
   * @returns {string} Full vehicle identifier
   */
  getFullIdentifier() {
    const displayName = this.getDisplayName();
    return this.specs.vehicleName !== displayName
      ? `${this.specs.vehicleName} (${displayName})`
      : displayName;
  }

  /**
   * Check if the vehicle is military
   * @returns {boolean} True if military vehicle
   */
  isMilitary() {
    return this.specs.vehicleType === "military" || this.specs.militaryClass;
  }

  /**
   * Check if the vehicle has valid statistics
   * @returns {boolean} True if statistics have been calculated
   */
  hasValidStatistics() {
    return (
      this.statistics.speedRating !== null &&
      this.statistics.fuelConsumption !== null &&
      this.errors.length === 0
    );
  }

  /**
   * Get vehicle summary for convoy calculations
   * @returns {object} Summary object with key statistics
   */
  getSummary() {
    return {
      name: this.getDisplayName(),
      speedRating: this.statistics.speedRating,
      fuelConsumption: this.statistics.fuelConsumption,
      cargoCapacity: this.statistics.cargoCapacity,
      maneuverability: this.statistics.maneuverability,
      durability: this.statistics.durability,
      powerRating: this.statistics.powerRating,
      maintenanceCost: this.statistics.maintenanceCost,
      isMilitary: this.isMilitary(),
      sizeCategory: this.categories.sizeCategory,
      typeCategory: this.categories.typeCategory,
    };
  }

  /**
   * Validate vehicle specifications
   * @returns {boolean} True if valid
   */
  validate() {
    this.errors = [];

    // Required fields
    const required = ["topSpeed", "vehicleType", "driveType"];
    for (const field of required) {
      if (
        this.specs[field] === undefined ||
        this.specs[field] === null ||
        this.specs[field] === ""
      ) {
        this.errors.push(`Required field missing: ${field}`);
      }
    }

    // Value validations
    if (this.specs.topSpeed !== undefined && this.specs.topSpeed <= 0) {
      this.errors.push("Top speed must be greater than 0");
    }

    if (this.specs.cylinders && this.specs.cylinders <= 0) {
      this.errors.push("Cylinders must be greater than 0 if specified");
    }

    if (this.specs.displacement && this.specs.displacement <= 0) {
      this.errors.push("Displacement must be greater than 0 if specified");
    }

    if (this.specs.horsepower && this.specs.horsepower < 0) {
      this.errors.push("Horsepower cannot be negative");
    }

    return this.errors.length === 0;
  }

  /**
   * Export vehicle data as JSON
   * @returns {object} Complete vehicle data
   */
  toJSON() {
    return {
      vehicleName: this.specs.vehicleName,
      makeModelYear: this.getDisplayName(),
      inputSpecs: { ...this.specs },
      categories: { ...this.categories },
      statistics: { ...this.statistics },
      details: { ...this.calculationDetails },
      errors: [...this.errors],
    };
  }

  /**
   * Create Vehicle from JSON data
   * @param {object} data - JSON data
   * @returns {Vehicle} New Vehicle instance
   */
  static fromJSON(data) {
    const vehicle = new Vehicle(data.inputSpecs || data);
    
    if (data.categories) {
      vehicle.categories = { ...data.categories };
    }
    
    if (data.statistics) {
      vehicle.statistics = { ...data.statistics };
    }
    
    if (data.details) {
      vehicle.calculationDetails = { ...data.details };
    }
    
    if (data.errors) {
      vehicle.errors = [...data.errors];
    }

    return vehicle;
  }
}

module.exports = Vehicle;
