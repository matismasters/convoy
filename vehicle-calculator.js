#!/usr/bin/env node

/**
 * Convoy Management System - Vehicle Statistics Calculator
 * Calculates all vehicle statistics based on real-world specifications
 * Usage: node vehicle-calculator.js <json-input>
 */

class VehicleCalculator {
  constructor() {
    // Displacement modifiers for fuel consumption
    this.displacementModifiers = {
      small: 1.0, // < 2.0L
      medium: 1.5, // 2.0L - 4.0L
      large: 2.0, // 4.0L - 6.0L
      veryLarge: 3.0, // > 6.0L
    };

    // Vehicle type base durability
    this.vehicleTypeDurability = {
      motorcycle: 20,
      car: 40,
      truck: 60,
      suv: 60,
      commercial: 80,
      military: 120,
      specialty: 80,
    };

    // Size modifiers for durability
    this.sizeModifiers = {
      compact: -10,
      midsize: 0,
      fullsize: 10,
      large: 20,
      oversized: 40,
    };

    // Drive type bonuses for maneuverability
    this.driveTypeBonuses = {
      fwd: 0,
      rwd: 1,
      awd: 2,
      "4wd": 3,
      tracks: 0,
    };

    // Complexity modifiers for maintenance cost
    this.complexityModifiers = {
      simple: 1.0,
      standard: 1.5,
      complex: 2.0,
      specialized: 3.0,
    };

    // Military modifiers for maintenance cost
    this.militaryModifiers = {
      light: 2.0,
      medium: 2.5,
      heavy: 3.0,
      specialized: 2.5,
    };

    // Alternative fuel consumption by vehicle type
    this.vehicleTypeFuelConsumption = {
      motorcycle: 2,
      compactCar: 4,
      midsizeCar: 6,
      fullsizeCar: 8,
      pickupTruck: 10,
      semiTruck: 20,
      heavyEquipment: 25,
    };
  }

  /**
   * Calculate Speed Rating from top speed
   * @param {number} topSpeed - Top speed in km/h
   * @returns {number} Speed rating
   */
  calculateSpeedRating(topSpeed) {
    const spd = Math.round(topSpeed / 16);
    return Math.max(spd, 1); // Minimum 1
  }

  /**
   * Determine displacement category
   * @param {number} displacement - Engine displacement in liters
   * @returns {string} Displacement category
   */
  getDisplacementCategory(displacement) {
    if (displacement < 2.0) return "small";
    if (displacement <= 4.0) return "medium";
    if (displacement <= 6.0) return "large";
    return "veryLarge";
  }

  /**
   * Calculate Fuel Consumption from engine specifications
   * @param {number} cylinders - Number of cylinders
   * @param {number} displacement - Engine displacement in liters
   * @param {boolean} isMilitary - Whether vehicle is military
   * @returns {number} Fuel consumption rating
   */
  calculateFuelConsumption(cylinders, displacement, isMilitary = false) {
    if (!cylinders || !displacement) {
      // Use alternative calculation if engine data unavailable
      return null; // Will need vehicle type for alternative calculation
    }

    const displacementCategory = this.getDisplacementCategory(displacement);
    const modifier = this.displacementModifiers[displacementCategory];
    let fc = cylinders * modifier;

    // Apply military penalty
    if (isMilitary) {
      fc *= 1.25;
    }

    return Math.round(fc);
  }

  /**
   * Calculate alternative fuel consumption from vehicle type
   * @param {string} vehicleType - Type of vehicle
   * @param {boolean} isMilitary - Whether vehicle is military
   * @returns {number} Fuel consumption rating
   */
  calculateAlternativeFuelConsumption(vehicleType, isMilitary = false) {
    const baseFC = this.vehicleTypeFuelConsumption[vehicleType] || 8;
    return isMilitary ? Math.round(baseFC * 1.25) : baseFC;
  }

  /**
   * Determine cargo capacity category and units
   * @param {string} sizeCategory - Vehicle size category
   * @param {string} vehicleType - Vehicle type
   * @returns {object} Cargo capacity info
   */
  calculateCargoCapacity(sizeCategory, vehicleType) {
    const cargoRanges = {
      motorcycle: { min: 1, max: 2, category: "Personal" },
      compactCar: { min: 3, max: 5, category: "Light" },
      midsizeCar: { min: 4, max: 7, category: "Light" },
      fullsizeCar: { min: 6, max: 8, category: "Light" },
      compactSuv: { min: 4, max: 6, category: "Light" },
      midsizeSuv: { min: 6, max: 8, category: "Light" },
      fullsizeSuv: { min: 8, max: 12, category: "Medium" },
      pickupTruck: { min: 12, max: 20, category: "Medium" },
      van: { min: 15, max: 25, category: "Heavy" },
      boxTruck: { min: 25, max: 40, category: "Heavy" },
      semiTruck: { min: 50, max: 80, category: "Industrial" },
      military: { min: 6, max: 30, category: "Medium" },
      specialty: { min: 8, max: 50, category: "Heavy" },
    };

    // Determine vehicle subtype
    let subtype = vehicleType.toLowerCase();
    if (vehicleType.toLowerCase() === "car") {
      subtype = sizeCategory.toLowerCase() + "Car";
    } else if (vehicleType.toLowerCase() === "suv") {
      subtype = sizeCategory.toLowerCase() + "Suv";
    }

    const range = cargoRanges[subtype] || cargoRanges.midsizeCar;
    const capacity = Math.floor((range.min + range.max) / 2);

    return {
      capacity: capacity,
      category: range.category,
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
   * Calculate Durability from vehicle type and size
   * @param {string} vehicleType - Type of vehicle
   * @param {string} sizeCategory - Size category
   * @param {boolean} isMilitary - Whether vehicle is military
   * @returns {number} Durability rating
   */
  calculateDurability(vehicleType, sizeCategory, isMilitary = false) {
    const baseType = vehicleType.toLowerCase();
    const baseDur = this.vehicleTypeDurability[baseType] || 60;
    const sizeModifier = this.sizeModifiers[sizeCategory.toLowerCase()] || 0;

    let durability = baseDur + sizeModifier;

    // Apply military bonus
    if (isMilitary) {
      durability = Math.round(durability * 1.5);
    }

    return Math.max(durability, 10); // Minimum 10
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
      return Math.floor(Math.random() * 5) + 11; // 11-15
    }

    return 3; // Default fallback
  }

  /**
   * Calculate Maintenance Cost
   * @param {number} fuelConsumption - Fuel consumption rating
   * @param {number} speedRating - Speed rating
   * @param {string} complexity - Complexity level
   * @param {string} militaryClass - Military classification (if applicable)
   * @returns {number} Maintenance cost
   */
  calculateMaintenanceCost(
    fuelConsumption,
    speedRating,
    complexity,
    militaryClass = null
  ) {
    const baseMC = Math.max((fuelConsumption + speedRating) / 10, 1);

    const complexityModifier =
      this.complexityModifiers[complexity.toLowerCase()] || 1.5;

    let finalMC = baseMC * complexityModifier;

    // Apply military modifier if applicable
    if (militaryClass && militaryClass.toLowerCase() !== "n/a") {
      const militaryModifier =
        this.militaryModifiers[militaryClass.toLowerCase()] || 2.0;
      finalMC *= militaryModifier;
    }

    return Math.round(finalMC);
  }

  /**
   * Determine vehicle categories based on specifications
   * @param {object} specs - Vehicle specifications
   * @returns {object} Categorization results
   */
  categorizeVehicle(specs) {
    const categories = {
      sizeCategory: this.determineSizeCategory(specs),
      typeCategory: this.determineTypeCategory(specs),
      complexityLevel: this.determineComplexityLevel(specs),
      militaryClass: specs.militaryClass || "N/A",
    };

    return categories;
  }

  /**
   * Determine size category from weight and dimensions
   * @param {object} specs - Vehicle specifications
   * @returns {string} Size category
   */
  determineSizeCategory(specs) {
    // If explicitly provided, use it
    if (specs.sizeCategory) return specs.sizeCategory;

    // Determine from vehicle type and weight
    const type = specs.vehicleType.toLowerCase();

    if (type === "motorcycle") return "Compact";
    if (type === "car") {
      if (specs.weight && specs.weight < 1400) return "Compact";
      if (specs.weight && specs.weight < 1800) return "Mid-size";
      return "Full-size";
    }
    if (type === "suv") {
      if (specs.weight && specs.weight < 2000) return "Mid-size";
      return "Full-size";
    }
    if (type === "truck") return "Full-size";
    if (type === "commercial") {
      if (specs.weight && specs.weight > 15000) return "Oversized";
      return "Large";
    }
    if (type === "military") {
      if (specs.weight && specs.weight > 20000) return "Oversized";
      return "Large";
    }
    if (type === "specialty") return "Large";

    return "Mid-size"; // Default
  }

  /**
   * Determine type category
   * @param {object} specs - Vehicle specifications
   * @returns {string} Type category
   */
  determineTypeCategory(specs) {
    return specs.vehicleType || "Car";
  }

  /**
   * Determine complexity level
   * @param {object} specs - Vehicle specifications
   * @returns {string} Complexity level
   */
  determineComplexityLevel(specs) {
    if (specs.complexityLevel) return specs.complexityLevel;

    const type = specs.vehicleType.toLowerCase();
    const year = specs.year || 2000;

    if (type === "motorcycle") return "Simple";
    if (type === "military") return "Specialized";
    if (type === "specialty") return "Specialized";
    if (specs.isLuxury) return "Complex";
    if (year > 2015) return "Standard";
    if (year > 2000) return "Standard";
    return "Simple";
  }

  /**
   * Calculate all vehicle statistics
   * @param {object} input - Vehicle input specifications
   * @returns {object} Complete vehicle statistics
   */
  calculateVehicleStats(input) {
    try {
      // Validate required fields
      this.validateInput(input);

      // Determine categories
      const categories = this.categorizeVehicle(input);
      const isMilitary = categories.typeCategory.toLowerCase() === "military";

      // Calculate core statistics
      const spd = this.calculateSpeedRating(input.topSpeed);

      let fc;
      if (input.cylinders && input.displacement) {
        fc = this.calculateFuelConsumption(
          input.cylinders,
          input.displacement,
          isMilitary
        );
      } else {
        // Use alternative calculation
        const vehicleSubtype = this.getVehicleSubtype(
          input.vehicleType,
          categories.sizeCategory
        );
        fc = this.calculateAlternativeFuelConsumption(
          vehicleSubtype,
          isMilitary
        );
      }

      const cargoInfo = this.calculateCargoCapacity(
        categories.sizeCategory,
        categories.typeCategory
      );
      const man = this.calculateManeuverability(
        categories.sizeCategory,
        input.driveType,
        isMilitary
      );
      const dur = this.calculateDurability(
        categories.typeCategory,
        categories.sizeCategory,
        isMilitary
      );
      const pwr = this.calculatePowerRating(
        input.horsepower,
        input.displacement
      );
      const mc = this.calculateMaintenanceCost(
        fc,
        spd,
        categories.complexityLevel,
        categories.militaryClass
      );

      // Build result object
      const result = {
        vehicleName: input.vehicleName || "Unnamed Vehicle",
        makeModelYear: `${input.make || ""} ${input.model || ""} ${
          input.year || ""
        }`.trim(),

        // Input specifications
        inputSpecs: {
          topSpeed: input.topSpeed,
          horsepower: input.horsepower,
          cylinders: input.cylinders,
          displacement: input.displacement,
          driveType: input.driveType,
          fuelType: input.fuelType,
          weight: input.weight,
        },

        // Calculated categories
        categories: categories,

        // Core statistics
        statistics: {
          speedRating: spd,
          sustainableSpeed: spd * 10, // km/h
          fuelConsumption: fc,
          cargoCapacity: cargoInfo.capacity,
          cargoCategory: cargoInfo.category,
          maneuverability: man,
          durability: dur,
          powerRating: pwr,
          maintenanceCost: mc,
        },

        // Calculated details
        details: {
          speedCalculation: `${input.topSpeed} km/h ÷ 16 = ${spd} (${
            spd * 10
          } km/h sustainable)`,
          fuelCalculation:
            input.cylinders && input.displacement
              ? `${input.cylinders}-cyl × ${
                  this.displacementModifiers[
                    this.getDisplacementCategory(input.displacement)
                  ]
                } (${input.displacement}L) ${
                  isMilitary ? "+ 25% military penalty" : ""
                }`
              : `Vehicle type base consumption ${
                  isMilitary ? "+ 25% military penalty" : ""
                }`,
          cargoCalculation: `${categories.sizeCategory} ${categories.typeCategory} = ${cargoInfo.category} category`,
          maneuverabilityCalculation: `10 - (${this.getSizePenalty(
            categories.sizeCategory
          )} × 2 size penalty) + ${
            this.driveTypeBonuses[input.driveType.toLowerCase()] || 0
          } (${input.driveType}) ${isMilitary ? "+ 2 military bonus" : ""}`,
          durabilityCalculation: `${
            this.vehicleTypeDurability[categories.typeCategory.toLowerCase()] ||
            60
          } base + ${
            this.sizeModifiers[categories.sizeCategory.toLowerCase()] || 0
          } size ${isMilitary ? "× 1.5 military bonus" : ""}`,
          powerCalculation: input.horsepower
            ? `${input.horsepower} HP ÷ 50 = ${pwr}`
            : `Estimated from ${input.displacement}L engine`,
          maintenanceCalculation: `(${fc} + ${spd}) ÷ 10 × ${
            this.complexityModifiers[categories.complexityLevel.toLowerCase()]
          } complexity ${
            categories.militaryClass !== "N/A"
              ? `× ${
                  this.militaryModifiers[
                    categories.militaryClass.toLowerCase()
                  ] || 2.0
                } military`
              : ""
          }`,
        },
      };

      return result;
    } catch (error) {
      return {
        error: error.message,
        input: input,
      };
    }
  }

  /**
   * Get vehicle subtype for alternative fuel calculation
   * @param {string} vehicleType - Vehicle type
   * @param {string} sizeCategory - Size category
   * @returns {string} Vehicle subtype
   */
  getVehicleSubtype(vehicleType, sizeCategory) {
    const type = vehicleType.toLowerCase();
    const size = sizeCategory.toLowerCase();

    if (type === "motorcycle") return "motorcycle";
    if (type === "car") return size + "Car";
    if (type === "truck" || type === "pickup") return "pickupTruck";
    if (type === "commercial") return "semiTruck";
    if (type === "specialty") return "heavyEquipment";

    return "midsizeCar"; // Default
  }

  /**
   * Validate input specifications
   * @param {object} input - Input specifications
   * @throws {Error} If required fields are missing
   */
  validateInput(input) {
    const required = ["topSpeed", "vehicleType", "driveType"];

    for (const field of required) {
      if (
        input[field] === undefined ||
        input[field] === null ||
        input[field] === ""
      ) {
        throw new Error(`Required field missing: ${field}`);
      }
    }

    if (input.topSpeed <= 0) {
      throw new Error("Top speed must be greater than 0");
    }

    if (input.cylinders && input.cylinders <= 0) {
      throw new Error("Cylinders must be greater than 0 if specified");
    }

    if (input.displacement && input.displacement <= 0) {
      throw new Error("Displacement must be greater than 0 if specified");
    }
  }
}

// Command line interface
function main() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.log(`
Convoy Management System - Vehicle Calculator

Usage: node vehicle-calculator.js '<json-input>'

Required fields:
- topSpeed: Top speed in km/h
- vehicleType: car, truck, suv, commercial, military, specialty, motorcycle
- driveType: fwd, rwd, awd, 4wd, tracks

Optional fields:
- vehicleName: Display name
- make, model, year: Vehicle identification
- cylinders: Number of engine cylinders
- displacement: Engine displacement in liters
- horsepower: Engine horsepower
- fuelType: gasoline, diesel, multi-fuel
- weight: Vehicle weight in kg
- sizeCategory: compact, midsize, fullsize, large, oversized
- complexityLevel: simple, standard, complex, specialized
- militaryClass: light, medium, heavy, specialized
- isLuxury: true/false

Example:
node vehicle-calculator.js '{"topSpeed": 200, "vehicleType": "car", "driveType": "awd", "cylinders": 4, "displacement": 1.5, "horsepower": 174, "make": "Honda", "model": "Civic", "year": 2019}'
        `);
    process.exit(1);
  }

  try {
    const inputJson = args[0];
    const input = JSON.parse(inputJson);

    const calculator = new VehicleCalculator();
    const result = calculator.calculateVehicleStats(input);

    console.log(JSON.stringify(result, null, 2));
  } catch (error) {
    console.error("Error:", error.message);
    process.exit(1);
  }
}

// Export for use as module
module.exports = VehicleCalculator;

// Run if called directly
if (require.main === module) {
  main();
}
