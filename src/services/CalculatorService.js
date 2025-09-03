/**
 * Calculator Service
 * Contains all vehicle calculation logic extracted from the original calculator
 */
class CalculatorService {
  constructor() {
    // Drive type bonuses for maneuverability
    this.driveTypeBonuses = {
      fwd: 0,
      rwd: 1,
      awd: 2,
      "4wd": 3,
      tracks: -1,
    };

    // Vehicle type base durability
    this.vehicleTypeDurability = {
      motorcycle: 20,
      car: 40,
      suv: 50,
      truck: 60,
      commercial: 80,
      military: 120,
      specialty: 100,
    };

    // Size modifiers for durability
    this.sizeModifiers = {
      compact: -10,
      midsize: 0,
      fullsize: 10,
      large: 20,
      oversized: 30,
    };

    // Complexity multipliers for maintenance cost
    this.complexityMultipliers = {
      simple: 1.0,
      standard: 1.5,
      complex: 2.0,
      specialized: 3.0,
    };

    // Military class multipliers for maintenance cost
    this.militaryMultipliers = {
      light: 2.0,
      medium: 2.5,
      heavy: 3.0,
      specialized: 4.0,
    };
  }

  /**
   * Calculate all vehicle statistics
   * @param {Vehicle} vehicle - Vehicle instance to calculate
   * @returns {Vehicle} Vehicle with calculated statistics
   */
  calculateVehicleStatistics(vehicle) {
    try {
      // Validate input first
      if (!vehicle.validate()) {
        return vehicle; // Return with errors
      }

      const specs = vehicle.specs;
      const isMilitary = vehicle.isMilitary();

      // Calculate categories first (needed for other calculations)
      vehicle.categories = this.categorizeVehicle(specs, isMilitary);

      // Calculate individual statistics
      const speedRating = this.calculateSpeedRating(specs.topSpeed);
      const fuelConsumption = this.calculateFuelConsumption(
        specs.cylinders,
        specs.displacement,
        isMilitary,
        specs.vehicleType
      );
      const powerRating = this.calculatePowerRating(specs.horsepower, specs.displacement);
      const cargoInfo = this.calculateCargoCapacity(
        vehicle.categories.sizeCategory,
        vehicle.categories.typeCategory
      );
      const maneuverability = this.calculateManeuverability(
        vehicle.categories.sizeCategory,
        specs.driveType,
        isMilitary
      );
      const durability = this.calculateDurability(
        vehicle.categories.typeCategory,
        vehicle.categories.sizeCategory,
        isMilitary
      );
      const maintenanceCost = this.calculateMaintenanceCost(
        fuelConsumption,
        speedRating,
        vehicle.categories.complexityLevel,
        vehicle.categories.militaryClass
      );

      // Populate statistics
      vehicle.statistics = {
        speedRating,
        sustainableSpeed: speedRating * 10,
        fuelConsumption,
        cargoCapacity: cargoInfo.capacity,
        cargoCategory: cargoInfo.category,
        maneuverability,
        durability,
        powerRating,
        maintenanceCost,
      };

      // Generate calculation details
      vehicle.calculationDetails = this.generateCalculationDetails(
        specs,
        vehicle.categories,
        vehicle.statistics,
        isMilitary
      );

      return vehicle;
    } catch (error) {
      vehicle.errors.push(`Calculation error: ${error.message}`);
      return vehicle;
    }
  }

  /**
   * Calculate Speed Rating from top speed
   * @param {number} topSpeed - Maximum speed in km/h
   * @returns {number} Speed rating
   */
  calculateSpeedRating(topSpeed) {
    const rating = Math.round(topSpeed / 16);
    return Math.max(rating, 1); // Minimum 1
  }

  /**
   * Calculate Fuel Consumption from engine specifications
   * @param {number} cylinders - Number of cylinders
   * @param {number} displacement - Engine displacement in liters
   * @param {boolean} isMilitary - Whether vehicle is military
   * @param {string} vehicleType - Type of vehicle for fallback calculation
   * @returns {number} Fuel consumption rating
   */
  calculateFuelConsumption(cylinders, displacement, isMilitary, vehicleType) {
    let consumption;

    if (cylinders && displacement) {
      // Primary calculation: cylinders × displacement multiplier
      const displacementMultiplier = this.getDisplacementMultiplier(displacement);
      consumption = cylinders * displacementMultiplier;

      // Apply military penalty
      if (isMilitary) {
        consumption = Math.round(consumption * 1.25);
      }
    } else {
      // Fallback calculation based on vehicle type
      consumption = this.getFallbackFuelConsumption(vehicleType, isMilitary);
    }

    return Math.max(consumption, 1); // Minimum 1
  }

  /**
   * Get displacement category and multiplier
   * @param {number} displacement - Engine displacement in liters
   * @returns {number} Displacement multiplier
   */
  getDisplacementMultiplier(displacement) {
    if (displacement < 2.0) return 1.0; // Small
    if (displacement <= 4.0) return 1.5; // Medium
    if (displacement <= 6.0) return 2.0; // Large
    return 3.0; // Very Large (> 6.0L)
  }

  /**
   * Get displacement category name
   * @param {number} displacement - Engine displacement in liters
   * @returns {string} Category name
   */
  getDisplacementCategory(displacement) {
    if (displacement < 2.0) return "small";
    if (displacement <= 4.0) return "medium";
    if (displacement <= 6.0) return "large";
    return "veryLarge";
  }

  /**
   * Fallback fuel consumption calculation
   * @param {string} vehicleType - Type of vehicle
   * @param {boolean} isMilitary - Whether vehicle is military
   * @returns {number} Estimated fuel consumption
   */
  getFallbackFuelConsumption(vehicleType, isMilitary) {
    const baseFuelConsumption = {
      motorcycle: 3,
      car: 8,
      suv: 12,
      truck: 15,
      commercial: 25,
      military: 30,
      specialty: 20,
    };

    let consumption = baseFuelConsumption[vehicleType.toLowerCase()] || 10;

    if (isMilitary) {
      consumption = Math.round(consumption * 1.25);
    }

    return consumption;
  }

  /**
   * Calculate Power Rating from horsepower
   * @param {number} horsepower - Engine horsepower
   * @param {number} displacement - Engine displacement (fallback)
   * @returns {number} Power rating
   */
  calculatePowerRating(horsepower, displacement = null) {
    if (horsepower !== undefined && horsepower !== null) {
      return Math.max(Math.round(horsepower / 50), 1);
    }

    // Alternative calculation based on engine size
    if (displacement) {
      if (displacement < 2.0) return Math.floor(Math.random() * 3) + 2; // 2-4
      if (displacement <= 4.0) return Math.floor(Math.random() * 3) + 5; // 5-7
      if (displacement <= 6.0) return Math.floor(Math.random() * 3) + 8; // 8-10
      return Math.floor(Math.random() * 5) + 12; // 12-16
    }

    // Default fallback
    return 3;
  }

  /**
   * Calculate Cargo Capacity from size and type
   * @param {string} sizeCategory - Vehicle size category
   * @param {string} typeCategory - Vehicle type category
   * @returns {object} Cargo capacity info
   */
  calculateCargoCapacity(sizeCategory, typeCategory) {
    // Base capacity by size
    const sizeCapacities = {
      compact: { min: 2, max: 4 },
      midsize: { min: 4, max: 8 },
      fullsize: { min: 8, max: 12 },
      large: { min: 12, max: 20 },
      oversized: { min: 20, max: 40 },
    };

    // Type multipliers
    const typeMultipliers = {
      motorcycle: 0.2,
      car: 0.8,
      suv: 1.0,
      truck: 1.5,
      commercial: 2.0,
      military: 1.2,
      specialty: 1.3,
    };

    const sizeRange = sizeCapacities[sizeCategory.toLowerCase()] || { min: 4, max: 8 };
    const typeMultiplier = typeMultipliers[typeCategory.toLowerCase()] || 1.0;

    const baseCapacity = (sizeRange.min + sizeRange.max) / 2;
    const capacity = Math.round(baseCapacity * typeMultiplier);

    // Determine category
    let category;
    if (capacity <= 3) category = "Very Small";
    else if (capacity <= 6) category = "Small";
    else if (capacity <= 12) category = "Medium";
    else if (capacity <= 20) category = "Large";
    else category = "Very Large";

    return {
      capacity: capacity,
      category: category,
    };
  }

  /**
   * Get size penalty for maneuverability calculation
   * @param {string} sizeCategory - Vehicle size category
   * @returns {number} Size penalty value
   */
  getSizePenalty(sizeCategory) {
    const sizePenalties = {
      compact: 0,
      midsize: 1,
      fullsize: 2,
      large: 3,
      oversized: 4,
    };
    return sizePenalties[sizeCategory.toLowerCase()] || 0;
  }

  /**
   * Calculate Maneuverability from size and drive type
   * @param {string} sizeCategory - Vehicle size category
   * @param {string} driveType - Drive type (FWD, RWD, AWD, 4WD, Tracks)
   * @param {boolean} isMilitary - Whether vehicle is military
   * @returns {number} Maneuverability rating
   */
  calculateManeuverability(sizeCategory, driveType, isMilitary = false) {
    // Size penalty
    const sizePenalty = this.getSizePenalty(sizeCategory);
    const driveBonus = this.driveTypeBonuses[driveType.toLowerCase()] || 0;

    let maneuverability = 10 - sizePenalty * 2 + driveBonus;

    // Military vehicles get +2 in combat/rough terrain (base rating)
    if (isMilitary) {
      maneuverability += 2;
    }

    return Math.max(maneuverability, 1); // Minimum 1
  }

  /**
   * Calculate Durability from type and size
   * @param {string} typeCategory - Vehicle type
   * @param {string} sizeCategory - Vehicle size
   * @param {boolean} isMilitary - Whether vehicle is military
   * @returns {number} Durability rating
   */
  calculateDurability(typeCategory, sizeCategory, isMilitary = false) {
    const baseDurability = this.vehicleTypeDurability[typeCategory.toLowerCase()] || 60;
    const sizeModifier = this.sizeModifiers[sizeCategory.toLowerCase()] || 0;

    let durability = baseDurability + sizeModifier;

    // Military vehicles get 50% bonus
    if (isMilitary) {
      durability = Math.round(durability * 1.5);
    }

    return Math.max(durability, 10); // Minimum 10
  }

  /**
   * Calculate Maintenance Cost
   * @param {number} fuelConsumption - Fuel consumption rating
   * @param {number} speedRating - Speed rating
   * @param {string} complexityLevel - Complexity level
   * @param {string} militaryClass - Military class (if applicable)
   * @returns {number} Maintenance cost
   */
  calculateMaintenanceCost(fuelConsumption, speedRating, complexityLevel, militaryClass) {
    const baseComplexity = this.complexityMultipliers[complexityLevel.toLowerCase()] || 1.5;
    const militaryMultiplier = militaryClass
      ? this.militaryMultipliers[militaryClass.toLowerCase()] || 1.0
      : 1.0;

    const cost = ((fuelConsumption + speedRating) / 10) * baseComplexity * militaryMultiplier;

    return Math.max(Math.round(cost), 1); // Minimum 1
  }

  /**
   * Categorize vehicle based on specifications
   * @param {object} specs - Vehicle specifications
   * @param {boolean} isMilitary - Whether vehicle is military
   * @returns {object} Vehicle categories
   */
  categorizeVehicle(specs, isMilitary) {
    const sizeCategory = this.determineSizeCategory(specs);
    const typeCategory = specs.vehicleType.toLowerCase();
    const complexityLevel = this.determineComplexityLevel(specs, isMilitary);
    const militaryClass = isMilitary ? (specs.militaryClass || "light") : "N/A";

    return {
      sizeCategory: this.capitalizeFirst(sizeCategory),
      typeCategory,
      complexityLevel: this.capitalizeFirst(complexityLevel),
      militaryClass,
    };
  }

  /**
   * Determine vehicle size category
   * @param {object} specs - Vehicle specifications
   * @returns {string} Size category
   */
  determineSizeCategory(specs) {
    // Use weight if available
    if (specs.weight) {
      if (specs.weight < 1500) return "compact";
      if (specs.weight < 2500) return "midsize";
      if (specs.weight < 4000) return "fullsize";
      if (specs.weight < 10000) return "large";
      return "oversized";
    }

    // Fallback to vehicle type and engine size
    const type = specs.vehicleType.toLowerCase();
    const displacement = specs.displacement || 0;

    if (type === "motorcycle") return "compact";
    if (type === "military" && displacement > 10) return "oversized";
    if (type === "commercial" || type === "specialty") return "large";
    if (type === "truck" && displacement > 5) return "large";
    if (displacement > 4) return "fullsize";
    if (displacement > 2) return "midsize";

    return "compact";
  }

  /**
   * Determine vehicle complexity level
   * @param {object} specs - Vehicle specifications
   * @param {boolean} isMilitary - Whether vehicle is military
   * @returns {string} Complexity level
   */
  determineComplexityLevel(specs, isMilitary) {
    if (isMilitary) return "specialized";

    const type = specs.vehicleType.toLowerCase();
    const displacement = specs.displacement || 0;
    const cylinders = specs.cylinders || 0;

    if (type === "specialty" || type === "commercial") return "complex";
    if (displacement > 6 || cylinders > 8) return "complex";
    if (displacement > 3 || cylinders > 4) return "standard";

    return "simple";
  }

  /**
   * Generate detailed calculation explanations
   * @param {object} specs - Vehicle specifications
   * @param {object} categories - Vehicle categories
   * @param {object} statistics - Calculated statistics
   * @param {boolean} isMilitary - Whether vehicle is military
   * @returns {object} Calculation details
   */
  generateCalculationDetails(specs, categories, statistics, isMilitary) {
    const details = {
      speedCalculation: `${specs.topSpeed} km/h ÷ 16 = ${statistics.speedRating} SPD (${statistics.sustainableSpeed} km/h sustainable)`,
      powerCalculation: specs.horsepower
        ? `${specs.horsepower} HP ÷ 50 = ${statistics.powerRating} PWR`
        : `Estimated based on vehicle type = ${statistics.powerRating} PWR`,
      cargoCalculation: `${categories.sizeCategory} ${categories.typeCategory} = ${statistics.cargoCategory} category`,
      maneuverabilityCalculation: `10 - (${this.getSizePenalty(categories.sizeCategory)} × 2 size penalty) + ${
        this.driveTypeBonuses[specs.driveType.toLowerCase()] || 0
      } (${specs.driveType}) ${isMilitary ? "+ 2 military bonus" : ""}`,
      durabilityCalculation: `${
        this.vehicleTypeDurability[categories.typeCategory.toLowerCase()] || 60
      } base + ${
        this.sizeModifiers[categories.sizeCategory.toLowerCase()] || 0
      } size ${isMilitary ? "× 1.5 military bonus" : ""}`,
      maintenanceCalculation: `(${statistics.fuelConsumption} FC + ${statistics.speedRating} SPD) ÷ 10 × ${
        this.complexityMultipliers[categories.complexityLevel.toLowerCase()]
      } complexity ${
        categories.militaryClass !== "N/A"
          ? `× ${this.militaryMultipliers[categories.militaryClass.toLowerCase()]} military`
          : ""
      }`,
    };

    // Fuel calculation details
    if (specs.cylinders && specs.displacement) {
      const category = this.getDisplacementCategory(specs.displacement);
      const multiplier = this.getDisplacementMultiplier(specs.displacement);
      details.fuelCalculation = `${specs.cylinders}-cyl × ${multiplier} (${category} ${specs.displacement}L) ${
        isMilitary ? "+ 25% military penalty" : ""
      }`;
    } else {
      details.fuelCalculation = `Vehicle type base consumption ${isMilitary ? "+ 25% military penalty" : ""}`;
    }

    return details;
  }

  /**
   * Capitalize first letter of string
   * @param {string} str - String to capitalize
   * @returns {string} Capitalized string
   */
  capitalizeFirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
}

module.exports = CalculatorService;
