/**
 * Convoy Management System Calculator
 * Implements all vehicle and convoy calculations based on the D&D 5e system
 */

class ConvoyCalculator {
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

    // Convoy size modifiers
    this.convoySizeModifiers = {
      1: 1.0,
      2: 0.95,
      3: 0.95,
      4: 0.9,
      5: 0.9,
      6: 0.9,
      7: 0.85,
      8: 0.85,
      9: 0.85,
      10: 0.85,
    };
  }

  /**
   * Calculate all vehicle statistics
   * @param {Object} specs - Vehicle specifications
   * @returns {Object} Complete vehicle data with calculated statistics
   */
  calculateVehicle(specs) {
    try {
      // Validate required fields
      const errors = this.validateVehicleSpecs(specs);
      if (errors.length > 0) {
        return { error: errors.join(", "), specs };
      }

      const isMilitary =
        specs.vehicleType === "military" || specs.militaryClass;

      // Calculate categories first
      const categories = this.categorizeVehicle(specs, isMilitary);

      // Calculate individual statistics
      const speedRating = this.calculateSpeedRating(specs.topSpeed);
      const fuelConsumption = this.calculateFuelConsumption(
        specs.cylinders,
        specs.displacement,
        isMilitary,
        specs.vehicleType
      );
      const powerRating = this.calculatePowerRating(
        specs.horsepower,
        specs.displacement
      );
      const cargoInfo = this.calculateCargoCapacity(
        categories.sizeCategory,
        categories.typeCategory
      );
      const maneuverability = this.calculateManeuverability(
        categories.sizeCategory,
        specs.driveType,
        isMilitary
      );
      const durability = this.calculateDurability(
        categories.typeCategory,
        categories.sizeCategory,
        isMilitary
      );
      const maintenanceCost = this.calculateMaintenanceCost(
        fuelConsumption,
        speedRating,
        categories.complexityLevel,
        categories.militaryClass
      );

      return {
        id: this.generateId(),
        specs: { ...specs },
        categories,
        statistics: {
          speedRating,
          sustainableSpeed: speedRating * 10,
          fuelConsumption,
          cargoCapacity: cargoInfo.capacity,
          cargoCategory: cargoInfo.category,
          maneuverability,
          durability,
          powerRating,
          maintenanceCost,
          // Base stats (before condition modifiers)
          baseSpeedRating: speedRating,
          baseFuelConsumption: fuelConsumption,
          baseMaintenanceCost: maintenanceCost,
        },
        displayName: this.getDisplayName(specs),
        // New tracking systems
        condition: {
          currentDurability: durability,
          maxDurability: durability,
          damageHistory: [],
          maintenanceHistory: [],
          conditionState: "Pristine", // Pristine, Damaged, Heavily Damaged, Critical
        },
        cargo: {
          currentLoad: 0,
          maxCapacity: cargoInfo.capacity,
          items: [],
        },
        createdAt: new Date().toISOString(),
        lastModified: new Date().toISOString(),
      };
    } catch (error) {
      return { error: `Calculation error: ${error.message}`, specs };
    }
  }

  /**
   * Calculate convoy statistics from array of vehicles
   * @param {Array} vehicles - Array of vehicle objects
   * @returns {Object} Convoy statistics and operational data
   */
  calculateConvoy(vehicles) {
    if (!vehicles || vehicles.length === 0) {
      return this.getEmptyConvoyStats();
    }

    const validVehicles = vehicles.filter((v) => v.statistics && !v.error);
    if (validVehicles.length === 0) {
      return this.getEmptyConvoyStats();
    }

    // Basic convoy info
    const vehicleCount = validVehicles.length;
    const convoySize = this.getConvoySize(vehicleCount);
    const sizeModifier = this.getConvoySizeModifier(vehicleCount);

    // Calculate aggregate statistics
    const minSpeedRating = Math.min(
      ...validVehicles.map((v) => v.statistics.speedRating)
    );
    const convoySpeed = Math.round(minSpeedRating * 10 * sizeModifier);

    const totalFuelConsumption = validVehicles.reduce(
      (sum, v) => sum + v.statistics.fuelConsumption,
      0
    );
    const totalCargoCapacity = validVehicles.reduce(
      (sum, v) => sum + v.statistics.cargoCapacity,
      0
    );
    const totalDurability = validVehicles.reduce(
      (sum, v) => sum + v.statistics.durability,
      0
    );
    const totalPowerRating = validVehicles.reduce(
      (sum, v) => sum + v.statistics.powerRating,
      0
    );
    const totalMaintenanceCost = validVehicles.reduce(
      (sum, v) => sum + v.statistics.maintenanceCost,
      0
    );

    const averageManeuverability = Math.round(
      validVehicles.reduce((sum, v) => sum + v.statistics.maneuverability, 0) /
        vehicleCount
    );

    // Operational calculations
    const hoursPerDay = 8;
    const efficiency = 0.85;
    const travelDaysPerMonth = 20;

    const dailyTravelDistance = Math.round(
      convoySpeed * hoursPerDay * efficiency
    );
    const monthlyTravelDistance = dailyTravelDistance * travelDaysPerMonth;

    // Estimate fuel capacity and range
    const averageFuelCapacity = this.estimateAverageFuelCapacity(validVehicles);
    const totalFuelCapacity = averageFuelCapacity * vehicleCount;
    const fuelConsumptionPerKm = totalFuelConsumption / 100;
    const fuelLimitedRange = Math.round(
      (totalFuelCapacity * 0.9) / fuelConsumptionPerKm
    );

    const monthlyFuelConsumption = Math.round(
      (monthlyTravelDistance / 100) * totalFuelConsumption
    );
    const monthlyMaintenanceHours = totalMaintenanceCost;
    const monthlyPartsCost = Math.round(totalMaintenanceCost * 0.2);

    return {
      vehicleCount,
      convoySize,
      statistics: {
        convoySpeed,
        sustainableSpeed: convoySpeed,
        totalFuelConsumption,
        totalCargoCapacity,
        averageManeuverability,
        totalDurability,
        totalPowerRating,
        totalMaintenanceCost,
      },
      operational: {
        dailyTravelDistance,
        monthlyTravelDistance,
        fuelLimitedRange,
        monthlyFuelConsumption,
        monthlyMaintenanceHours,
        monthlyPartsCost,
      },
      summary: this.generateOperationalSummary({
        vehicleCount,
        convoySize,
        convoySpeed,
        dailyTravelDistance,
        monthlyTravelDistance,
        fuelLimitedRange,
        monthlyFuelConsumption,
        monthlyMaintenanceHours,
        monthlyPartsCost,
        totalCargoCapacity,
        totalPowerRating,
        totalDurability,
      }),
    };
  }

  // Individual calculation methods

  calculateSpeedRating(topSpeed) {
    const rating = Math.round(topSpeed / 16);
    return Math.max(rating, 1);
  }

  calculateFuelConsumption(cylinders, displacement, isMilitary, vehicleType) {
    let consumption;

    if (cylinders && displacement) {
      const displacementMultiplier =
        this.getDisplacementMultiplier(displacement);
      consumption = cylinders * displacementMultiplier;

      if (isMilitary) {
        consumption = Math.round(consumption * 1.25);
      }
    } else {
      consumption = this.getFallbackFuelConsumption(vehicleType, isMilitary);
    }

    return Math.max(consumption, 1);
  }

  getDisplacementMultiplier(displacement) {
    if (displacement < 2.0) return 1.0;
    if (displacement <= 4.0) return 1.5;
    if (displacement <= 6.0) return 2.0;
    return 3.0;
  }

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

  calculatePowerRating(horsepower, displacement = null) {
    if (horsepower !== undefined && horsepower !== null && horsepower > 0) {
      return Math.max(Math.round(horsepower / 50), 1);
    }

    if (displacement) {
      if (displacement < 2.0) return 3;
      if (displacement <= 4.0) return 5;
      if (displacement <= 6.0) return 8;
      return 12;
    }

    return 3;
  }

  calculateCargoCapacity(sizeCategory, typeCategory) {
    const sizeCapacities = {
      compact: { min: 2, max: 4 },
      midsize: { min: 4, max: 8 },
      fullsize: { min: 8, max: 12 },
      large: { min: 12, max: 20 },
      oversized: { min: 20, max: 40 },
    };

    const typeMultipliers = {
      motorcycle: 0.2,
      car: 0.8,
      suv: 1.0,
      truck: 1.5,
      commercial: 2.0,
      military: 1.2,
      specialty: 1.3,
    };

    const sizeRange = sizeCapacities[sizeCategory.toLowerCase()] || {
      min: 4,
      max: 8,
    };
    const typeMultiplier = typeMultipliers[typeCategory.toLowerCase()] || 1.0;

    const baseCapacity = (sizeRange.min + sizeRange.max) / 2;
    const capacity = Math.round(baseCapacity * typeMultiplier);

    let category;
    if (capacity <= 3) category = "Very Small";
    else if (capacity <= 6) category = "Small";
    else if (capacity <= 12) category = "Medium";
    else if (capacity <= 20) category = "Large";
    else category = "Very Large";

    return { capacity, category };
  }

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

  calculateManeuverability(sizeCategory, driveType, isMilitary = false) {
    const sizePenalty = this.getSizePenalty(sizeCategory);
    const driveBonus = this.driveTypeBonuses[driveType.toLowerCase()] || 0;

    let maneuverability = 10 - sizePenalty * 2 + driveBonus;

    if (isMilitary) {
      maneuverability += 2;
    }

    return Math.max(maneuverability, 1);
  }

  calculateDurability(typeCategory, sizeCategory, isMilitary = false) {
    const baseDurability =
      this.vehicleTypeDurability[typeCategory.toLowerCase()] || 60;
    const sizeModifier = this.sizeModifiers[sizeCategory.toLowerCase()] || 0;

    let durability = baseDurability + sizeModifier;

    if (isMilitary) {
      durability = Math.round(durability * 1.5);
    }

    return Math.max(durability, 10);
  }

  calculateMaintenanceCost(
    fuelConsumption,
    speedRating,
    complexityLevel,
    militaryClass
  ) {
    const baseComplexity =
      this.complexityMultipliers[complexityLevel.toLowerCase()] || 1.5;
    const militaryMultiplier = militaryClass
      ? this.militaryMultipliers[militaryClass.toLowerCase()] || 1.0
      : 1.0;

    const cost =
      ((fuelConsumption + speedRating) / 10) *
      baseComplexity *
      militaryMultiplier;

    return Math.max(Math.round(cost), 1);
  }

  // Categorization methods

  categorizeVehicle(specs, isMilitary) {
    const sizeCategory = this.determineSizeCategory(specs);
    const typeCategory = specs.vehicleType.toLowerCase();
    const complexityLevel = this.determineComplexityLevel(specs, isMilitary);
    const militaryClass = isMilitary ? specs.militaryClass || "light" : "N/A";

    return {
      sizeCategory: this.capitalizeFirst(sizeCategory),
      typeCategory,
      complexityLevel: this.capitalizeFirst(complexityLevel),
      militaryClass,
    };
  }

  determineSizeCategory(specs) {
    if (specs.weight) {
      if (specs.weight < 1500) return "compact";
      if (specs.weight < 2500) return "midsize";
      if (specs.weight < 4000) return "fullsize";
      if (specs.weight < 10000) return "large";
      return "oversized";
    }

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

  // Convoy calculation helpers

  getConvoySize(vehicleCount) {
    if (vehicleCount <= 2) return "Small";
    if (vehicleCount <= 5) return "Medium";
    if (vehicleCount <= 10) return "Large";
    return "Huge";
  }

  getConvoySizeModifier(vehicleCount) {
    if (vehicleCount <= 10) {
      return this.convoySizeModifiers[vehicleCount] || 0.8;
    }
    return 0.8;
  }

  estimateAverageFuelCapacity(vehicles) {
    const capacityEstimates = {
      motorcycle: 15,
      car: 50,
      suv: 70,
      truck: 100,
      commercial: 200,
      military: 500,
      specialty: 300,
    };

    const totalCapacity = vehicles.reduce((sum, vehicle) => {
      const type = vehicle.categories.typeCategory.toLowerCase();
      return sum + (capacityEstimates[type] || 50);
    }, 0);

    return Math.round(totalCapacity / vehicles.length);
  }

  generateOperationalSummary(stats) {
    return `${stats.convoySize} convoy with ${stats.vehicleCount} vehicles
• Sustainable Speed: ${stats.convoySpeed} km/h
• Daily Travel: ${stats.dailyTravelDistance} km (8h @ 85% efficiency)
• Monthly Travel: ${stats.monthlyTravelDistance} km (20 travel days)
• Fuel-Limited Range: ${stats.fuelLimitedRange} km
• Monthly Consumption: ${stats.monthlyFuelConsumption}L fuel, ${stats.monthlyMaintenanceHours}h maintenance, ${stats.monthlyPartsCost} parts units
• Total Cargo: ${stats.totalCargoCapacity} units, Power: ${stats.totalPowerRating} PWR, Durability: ${stats.totalDurability} DUR`;
  }

  getEmptyConvoyStats() {
    return {
      vehicleCount: 0,
      convoySize: "Empty",
      statistics: {
        convoySpeed: 0,
        sustainableSpeed: 0,
        totalFuelConsumption: 0,
        totalCargoCapacity: 0,
        averageManeuverability: 0,
        totalDurability: 0,
        totalPowerRating: 0,
        totalMaintenanceCost: 0,
      },
      operational: {
        dailyTravelDistance: 0,
        monthlyTravelDistance: 0,
        fuelLimitedRange: 0,
        monthlyFuelConsumption: 0,
        monthlyMaintenanceHours: 0,
        monthlyPartsCost: 0,
      },
      summary: "Add vehicles to see operational capabilities.",
    };
  }

  // Utility methods

  validateVehicleSpecs(specs) {
    const errors = [];

    if (!specs.vehicleName || specs.vehicleName.trim() === "") {
      errors.push("Vehicle name is required");
    }

    if (!specs.topSpeed || specs.topSpeed <= 0) {
      errors.push("Top speed must be greater than 0");
    }

    if (!specs.vehicleType) {
      errors.push("Vehicle type is required");
    }

    if (!specs.driveType) {
      errors.push("Drive type is required");
    }

    return errors;
  }

  getDisplayName(specs) {
    if (specs.make && specs.model) {
      const year = specs.year ? ` ${specs.year}` : "";
      return `${specs.vehicleName} (${specs.make} ${specs.model}${year})`;
    }
    return specs.vehicleName;
  }

  generateId() {
    return "vehicle_" + Math.random().toString(36).substr(2, 9);
  }

  capitalizeFirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  // Damage and Maintenance Methods

  applyDamage(
    vehicle,
    damageAmount,
    damageType = "Physical",
    source = "Unknown"
  ) {
    if (!vehicle.condition) {
      this.initializeCondition(vehicle);
    }

    const actualDamage = Math.max(
      0,
      Math.min(damageAmount, vehicle.condition.currentDurability)
    );
    vehicle.condition.currentDurability -= actualDamage;

    // Record damage history
    vehicle.condition.damageHistory.push({
      date: new Date().toISOString(),
      amount: actualDamage,
      type: damageType,
      source: source,
      durabilityAfter: vehicle.condition.currentDurability,
    });

    // Update condition state
    this.updateConditionState(vehicle);
    vehicle.lastModified = new Date().toISOString();

    return {
      damageApplied: actualDamage,
      newDurability: vehicle.condition.currentDurability,
      conditionState: vehicle.condition.conditionState,
    };
  }

  performMaintenance(
    vehicle,
    repairAmount,
    partsCost = 0,
    timeSpent = 0,
    notes = ""
  ) {
    if (!vehicle.condition) {
      this.initializeCondition(vehicle);
    }

    const actualRepair = Math.min(
      repairAmount,
      vehicle.condition.maxDurability - vehicle.condition.currentDurability
    );
    vehicle.condition.currentDurability += actualRepair;

    // Record maintenance history
    vehicle.condition.maintenanceHistory.push({
      date: new Date().toISOString(),
      repairAmount: actualRepair,
      partsCost: partsCost,
      timeSpent: timeSpent,
      notes: notes,
      durabilityAfter: vehicle.condition.currentDurability,
    });

    // Update condition state
    this.updateConditionState(vehicle);
    vehicle.lastModified = new Date().toISOString();

    return {
      repairApplied: actualRepair,
      newDurability: vehicle.condition.currentDurability,
      conditionState: vehicle.condition.conditionState,
    };
  }

  updateConditionState(vehicle) {
    const durabilityPercent =
      (vehicle.condition.currentDurability / vehicle.condition.maxDurability) *
      100;

    if (durabilityPercent >= 100) {
      vehicle.condition.conditionState = "Pristine";
    } else if (durabilityPercent >= 50) {
      vehicle.condition.conditionState = "Damaged";
    } else if (durabilityPercent >= 25) {
      vehicle.condition.conditionState = "Heavily Damaged";
    } else if (durabilityPercent > 0) {
      vehicle.condition.conditionState = "Critical";
    } else {
      vehicle.condition.conditionState = "Destroyed";
    }

    // Apply condition-based stat modifiers
    this.applyConditionModifiers(vehicle);
  }

  applyConditionModifiers(vehicle) {
    // Ensure we have base stats to work from
    if (!vehicle.statistics.baseSpeedRating) {
      vehicle.statistics.baseSpeedRating = vehicle.statistics.speedRating;
      vehicle.statistics.baseFuelConsumption =
        vehicle.statistics.fuelConsumption;
      vehicle.statistics.baseMaintenanceCost =
        vehicle.statistics.maintenanceCost;
    }

    const condition = vehicle.condition.conditionState;

    // Reset to base stats
    vehicle.statistics.speedRating = vehicle.statistics.baseSpeedRating;
    vehicle.statistics.fuelConsumption = vehicle.statistics.baseFuelConsumption;
    vehicle.statistics.maintenanceCost = vehicle.statistics.baseMaintenanceCost;

    // Apply condition penalties based on D&D 5e rules
    switch (condition) {
      case "Pristine":
        // No penalties
        break;

      case "Damaged":
        // +1 FC, Disadvantage on PWR checks (noted in UI)
        vehicle.statistics.fuelConsumption += 1;
        break;

      case "Heavily Damaged":
        // Speed halved, +2 FC, 2× MC, Disadvantage on MAN & PWR checks
        vehicle.statistics.speedRating = Math.max(
          1,
          Math.floor(vehicle.statistics.speedRating / 2)
        );
        vehicle.statistics.fuelConsumption += 2;
        vehicle.statistics.maintenanceCost *= 2;
        break;

      case "Critical":
        // Speed = 0 (must tow), +3 FC, 3× MC, Disadvantage on all checks
        vehicle.statistics.speedRating = 0;
        vehicle.statistics.fuelConsumption += 3;
        vehicle.statistics.maintenanceCost *= 3;
        break;

      case "Destroyed":
        // Vehicle inoperable
        vehicle.statistics.speedRating = 0;
        vehicle.statistics.fuelConsumption = 0;
        vehicle.statistics.powerRating = 0;
        break;
    }

    // Update sustainable speed
    vehicle.statistics.sustainableSpeed = vehicle.statistics.speedRating * 10;
  }

  initializeCondition(vehicle) {
    if (!vehicle.condition) {
      vehicle.condition = {
        currentDurability: vehicle.statistics.durability,
        maxDurability: vehicle.statistics.durability,
        damageHistory: [],
        maintenanceHistory: [],
        conditionState: "Pristine",
      };
    }

    // Ensure base stats are preserved
    if (!vehicle.statistics.baseSpeedRating) {
      vehicle.statistics.baseSpeedRating = vehicle.statistics.speedRating;
      vehicle.statistics.baseFuelConsumption =
        vehicle.statistics.fuelConsumption;
      vehicle.statistics.baseMaintenanceCost =
        vehicle.statistics.maintenanceCost;
    }

    // Apply current condition modifiers
    this.updateConditionState(vehicle);
  }

  // Cargo Management Methods

  addCargo(vehicle, itemName, weight, category = "General", notes = "") {
    if (!vehicle.cargo) {
      this.initializeCargo(vehicle);
    }

    if (vehicle.cargo.currentLoad + weight > vehicle.cargo.maxCapacity) {
      return {
        success: false,
        error: `Not enough cargo space. Available: ${
          vehicle.cargo.maxCapacity - vehicle.cargo.currentLoad
        }, Required: ${weight}`,
      };
    }

    const cargoItem = {
      id: this.generateId(),
      name: itemName,
      weight: weight,
      category: category,
      notes: notes,
      addedDate: new Date().toISOString(),
    };

    vehicle.cargo.items.push(cargoItem);
    vehicle.cargo.currentLoad += weight;
    vehicle.lastModified = new Date().toISOString();

    return {
      success: true,
      item: cargoItem,
      newLoad: vehicle.cargo.currentLoad,
      remainingCapacity: vehicle.cargo.maxCapacity - vehicle.cargo.currentLoad,
    };
  }

  removeCargo(vehicle, itemId) {
    if (!vehicle.cargo) {
      this.initializeCargo(vehicle);
      return { success: false, error: "No cargo to remove" };
    }

    const itemIndex = vehicle.cargo.items.findIndex(
      (item) => item.id === itemId
    );
    if (itemIndex === -1) {
      return { success: false, error: "Item not found" };
    }

    const removedItem = vehicle.cargo.items.splice(itemIndex, 1)[0];
    vehicle.cargo.currentLoad -= removedItem.weight;
    vehicle.lastModified = new Date().toISOString();

    return {
      success: true,
      removedItem: removedItem,
      newLoad: vehicle.cargo.currentLoad,
      remainingCapacity: vehicle.cargo.maxCapacity - vehicle.cargo.currentLoad,
    };
  }

  initializeCargo(vehicle) {
    if (!vehicle.cargo) {
      vehicle.cargo = {
        currentLoad: 0,
        maxCapacity: vehicle.statistics.cargoCapacity,
        items: [],
      };
    }
  }

  // Travel Planning Methods

  calculateTravelPlan(
    convoy,
    distanceKm,
    terrainModifier = 1.0,
    weatherModifier = 1.0
  ) {
    const convoyStats = this.calculateConvoy(convoy);

    if (convoyStats.vehicleCount === 0) {
      return {
        error: "No vehicles in convoy",
      };
    }

    // Apply terrain and weather modifiers
    const effectiveSpeed =
      convoyStats.statistics.convoySpeed * terrainModifier * weatherModifier;
    const effectiveFuelConsumption =
      convoyStats.statistics.totalFuelConsumption;

    // Calculate travel time
    const hoursOfTravel = distanceKm / effectiveSpeed;
    const daysOfTravel = Math.ceil(hoursOfTravel / 8); // 8 hours of travel per day

    // Only add rest days for multi-day journeys
    let totalDays;
    if (daysOfTravel <= 1) {
      totalDays = 1; // Single day trips don't need rest days
    } else {
      totalDays = Math.ceil(daysOfTravel * 1.4); // Add 40% for rest days (2 rest for every 5 travel)
    }

    // Calculate fuel requirements
    const fuelRequired = (distanceKm / 100) * effectiveFuelConsumption;

    // Estimate fuel capacity
    const estimatedFuelCapacity = this.estimateConvoyFuelCapacity(convoy);
    const fuelStopsNeeded = Math.max(
      0,
      Math.ceil(fuelRequired / (estimatedFuelCapacity * 0.9)) - 1
    );

    return {
      distance: distanceKm,
      effectiveSpeed: Math.round(effectiveSpeed),
      travelTime: {
        hours: Math.round(hoursOfTravel * 10) / 10,
        travelDays: daysOfTravel,
        totalDays: totalDays,
      },
      fuel: {
        required: Math.round(fuelRequired),
        capacity: estimatedFuelCapacity,
        stopsNeeded: fuelStopsNeeded,
      },
      modifiers: {
        terrain: terrainModifier,
        weather: weatherModifier,
      },
      summary: this.generateTravelSummary({
        distanceKm,
        effectiveSpeed: Math.round(effectiveSpeed),
        hoursOfTravel: Math.round(hoursOfTravel * 10) / 10,
        totalDays,
        fuelRequired: Math.round(fuelRequired),
        fuelStopsNeeded,
      }),
    };
  }

  estimateConvoyFuelCapacity(convoy) {
    return convoy.reduce((total, vehicle) => {
      const typeCapacity = {
        motorcycle: 15,
        car: 50,
        suv: 70,
        truck: 100,
        commercial: 200,
        military: 500,
        specialty: 300,
      };
      const type = vehicle.categories.typeCategory.toLowerCase();
      return total + (typeCapacity[type] || 50);
    }, 0);
  }

  generateTravelSummary(data) {
    const timeDescription =
      data.hoursOfTravel < 8
        ? `${data.hoursOfTravel}h (same day)`
        : `${data.totalDays} days (${data.hoursOfTravel}h travel time)`;

    return `Journey of ${data.distanceKm}km will take ${timeDescription} at ${
      data.effectiveSpeed
    } km/h. Fuel required: ${data.fuelRequired}L${
      data.fuelStopsNeeded > 0
        ? `, requiring ${data.fuelStopsNeeded} refuel stop(s)`
        : ""
    }.`;
  }
}

// Make the calculator available globally
window.ConvoyCalculator = ConvoyCalculator;
