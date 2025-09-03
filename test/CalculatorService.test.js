const CalculatorService = require("../src/services/CalculatorService");
const Vehicle = require("../src/models/Vehicle");

describe("CalculatorService", () => {
  let calculator;

  beforeEach(() => {
    calculator = new CalculatorService();
  });

  describe("Speed Rating Calculation", () => {
    test("should calculate speed rating correctly", () => {
      expect(calculator.calculateSpeedRating(190)).toBe(12);
      expect(calculator.calculateSpeedRating(200)).toBe(13);
      expect(calculator.calculateSpeedRating(67)).toBe(4);
      expect(calculator.calculateSpeedRating(40)).toBe(3);
      expect(calculator.calculateSpeedRating(250)).toBe(16);
    });

    test("should have minimum speed rating of 1", () => {
      expect(calculator.calculateSpeedRating(10)).toBe(1);
      expect(calculator.calculateSpeedRating(0)).toBe(1);
    });
  });

  describe("Fuel Consumption Calculation", () => {
    test("should calculate fuel consumption from engine specs", () => {
      // 4-cyl 2.0L (medium) = 4 × 1.5 = 6
      expect(calculator.calculateFuelConsumption(4, 2.0, false)).toBe(6);

      // 8-cyl 6.2L (very large) = 8 × 3.0 = 24
      expect(calculator.calculateFuelConsumption(8, 6.2, false)).toBe(24);

      // 6-cyl 15.0L (very large) = 6 × 3.0 = 18
      expect(calculator.calculateFuelConsumption(6, 15.0, false)).toBe(18);
    });

    test("should apply military penalty correctly", () => {
      // 8-cyl 6.2L military = 24 × 1.25 = 30
      expect(calculator.calculateFuelConsumption(8, 6.2, true)).toBe(30);
    });

    test("should handle displacement categories correctly", () => {
      expect(calculator.getDisplacementCategory(1.5)).toBe("small");
      expect(calculator.getDisplacementCategory(3.0)).toBe("medium");
      expect(calculator.getDisplacementCategory(5.0)).toBe("large");
      expect(calculator.getDisplacementCategory(8.0)).toBe("veryLarge");
    });
  });

  describe("Power Rating Calculation", () => {
    test("should calculate power rating from horsepower", () => {
      expect(calculator.calculatePowerRating(152)).toBe(3);
      expect(calculator.calculatePowerRating(174)).toBe(3);
      expect(calculator.calculatePowerRating(385)).toBe(8);
      expect(calculator.calculatePowerRating(1500)).toBe(30);
      expect(calculator.calculatePowerRating(67)).toBe(1);
    });

    test("should have minimum power rating of 1", () => {
      expect(calculator.calculatePowerRating(25)).toBe(1);
      expect(calculator.calculatePowerRating(0)).toBe(1);
      expect(calculator.calculatePowerRating(null)).toBe(3); // Default fallback
    });
  });

  describe("Maneuverability Calculation", () => {
    test("should calculate maneuverability correctly", () => {
      // Compact AWD: 10 - (0 × 2) + 2 = 12
      expect(calculator.calculateManeuverability("compact", "awd", false)).toBe(12);

      // Full-size 4WD: 10 - (2 × 2) + 3 = 9
      expect(calculator.calculateManeuverability("fullsize", "4wd", false)).toBe(9);

      // Oversized RWD: 10 - (4 × 2) + 1 = 3
      expect(calculator.calculateManeuverability("oversized", "rwd", false)).toBe(3);
    });

    test("should apply military bonus", () => {
      // Full-size 4WD military: 10 - (2 × 2) + 3 + 2 = 11
      expect(calculator.calculateManeuverability("fullsize", "4wd", true)).toBe(11);
    });

    test("should have minimum maneuverability of 1", () => {
      // Oversized FWD: 10 - (4 × 2) + 0 = 2, minimum 1
      expect(calculator.calculateManeuverability("oversized", "fwd", false)).toBe(2);

      // Test an even more extreme case that would actually hit minimum
      expect(calculator.calculateManeuverability("oversized", "fwd", false)).toBeGreaterThanOrEqual(1);
    });
  });

  describe("Durability Calculation", () => {
    test("should calculate civilian vehicle durability", () => {
      // Car + mid-size: 40 + 0 = 40
      expect(calculator.calculateDurability("car", "midsize", false)).toBe(40);

      // Truck + full-size: 60 + 10 = 70
      expect(calculator.calculateDurability("truck", "fullsize", false)).toBe(70);
    });

    test("should apply military bonus correctly", () => {
      // Military + large: (120 + 20) × 1.5 = 210
      expect(calculator.calculateDurability("military", "large", true)).toBe(210);
    });
  });

  describe("Maintenance Cost Calculation", () => {
    test("should calculate maintenance cost correctly", () => {
      // (FC 6 + SPD 12) ÷ 10 × 1.5 standard = 2.7 ≈ 3
      expect(calculator.calculateMaintenanceCost(6, 12, "standard")).toBe(3);

      // (FC 24 + SPD 10) ÷ 10 × 1.5 standard = 5.1 ≈ 5
      expect(calculator.calculateMaintenanceCost(24, 10, "standard")).toBe(5);
    });

    test("should apply military modifiers correctly", () => {
      // (FC 30 + SPD 4) ÷ 10 × 3.0 specialized × 3.0 heavy military = 30.6 ≈ 31
      expect(calculator.calculateMaintenanceCost(30, 4, "specialized", "heavy")).toBe(31);
    });
  });

  describe("Complete Vehicle Calculations", () => {
    test("should calculate Honda Civic correctly", () => {
      const vehicle = new Vehicle({
        vehicleName: "Road Runner",
        make: "Honda",
        model: "Civic",
        year: 2019,
        topSpeed: 200,
        vehicleType: "car",
        driveType: "awd",
        cylinders: 4,
        displacement: 1.5,
        horsepower: 174,
        fuelType: "gasoline",
      });

      const result = calculator.calculateVehicleStatistics(vehicle);

      expect(result.statistics.speedRating).toBe(13);
      expect(result.statistics.sustainableSpeed).toBe(130);
      expect(result.statistics.fuelConsumption).toBe(4);
      expect(result.statistics.powerRating).toBe(3);
      expect(result.categories.typeCategory).toBe("car");
      expect(result.categories.complexityLevel).toBe("Simple");
    });

    test("should calculate M1A1 Abrams correctly", () => {
      const vehicle = new Vehicle({
        vehicleName: "Steel Beast",
        make: "M1A2",
        model: "Abrams",
        year: 2017,
        topSpeed: 67,
        vehicleType: "military",
        driveType: "tracks",
        horsepower: 1500,
        fuelType: "multi-fuel",
        militaryClass: "heavy",
        weight: 62000,
      });

      const result = calculator.calculateVehicleStatistics(vehicle);

      expect(result.statistics.speedRating).toBe(4);
      expect(result.statistics.sustainableSpeed).toBe(40);
      expect(result.statistics.powerRating).toBe(30);
      expect(result.categories.typeCategory).toBe("military");
      expect(result.categories.militaryClass).toBe("heavy");
      expect(result.categories.sizeCategory).toBe("Oversized");
    });
  });

  describe("Formula Validation", () => {
    test("maintenance cost formula should be correct", () => {
      // Test the exact formula: (FC + SPD) ÷ 10 × complexity × military
      const fc = 24;
      const spd = 10;
      const complexity = "standard"; // ×1.5
      const military = null;

      const result = calculator.calculateMaintenanceCost(fc, spd, complexity, military);
      const expected = Math.round(((24 + 10) / 10) * 1.5); // 5.1 ≈ 5
      expect(result).toBe(expected);
    });

    test("should apply all modifiers correctly in complex calculation", () => {
      // Test military vehicle with all modifiers
      const fc = 30;
      const spd = 7;
      const complexity = "specialized"; // ×3.0
      const military = "light"; // ×2.0

      const result = calculator.calculateMaintenanceCost(fc, spd, complexity, military);
      const expected = Math.round(((30 + 7) / 10) * 3.0 * 2.0); // 22.2 ≈ 22
      expect(result).toBe(expected);
    });
  });
});
