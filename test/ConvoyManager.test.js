const ConvoyManager = require("../src/services/ConvoyManager");
const Vehicle = require("../src/models/Vehicle");
const Convoy = require("../src/models/Convoy");

describe("ConvoyManager", () => {
  let manager;

  beforeEach(() => {
    manager = new ConvoyManager();
  });

  describe("Single Vehicle Operations", () => {
    test("should create and calculate vehicle statistics", () => {
      const specs = {
        vehicleName: "Test Car",
        topSpeed: 200,
        vehicleType: "car",
        driveType: "awd",
        horsepower: 174,
      };

      const vehicle = manager.createVehicle(specs);

      expect(vehicle).toBeInstanceOf(Vehicle);
      expect(vehicle.hasValidStatistics()).toBe(true);
      expect(vehicle.statistics.speedRating).toBe(13);
      expect(vehicle.statistics.powerRating).toBe(3);
    });

    test("should handle invalid vehicle specifications", () => {
      const specs = {
        vehicleName: "Invalid Car",
        // Missing required fields
      };

      const vehicle = manager.createVehicle(specs);

      expect(vehicle.hasValidStatistics()).toBe(false);
      expect(vehicle.errors.length).toBeGreaterThan(0);
    });

    test("should process single vehicle input", () => {
      const input = {
        topSpeed: 150,
        vehicleType: "truck",
        driveType: "4wd",
        horsepower: 285,
      };

      const result = manager.processSingleVehicle(input);

      expect(result.type).toBe("vehicle");
      expect(result.result.statistics).toBeDefined();
      expect(result.result.statistics.speedRating).toBe(9);
    });
  });

  describe("Convoy Operations", () => {
    test("should create convoy from vehicle specifications", () => {
      const vehicleSpecs = [
        {
          vehicleName: "Lead Car",
          topSpeed: 200,
          vehicleType: "car",
          driveType: "awd",
          horsepower: 174,
        },
        {
          vehicleName: "Support Truck",
          topSpeed: 150,
          vehicleType: "truck",
          driveType: "4wd",
          horsepower: 285,
        },
      ];

      const convoy = manager.createConvoy("Test Convoy", vehicleSpecs);

      expect(convoy).toBeInstanceOf(Convoy);
      expect(convoy.vehicles.length).toBe(2);
      expect(convoy.statistics.vehicleCount).toBe(2);
      expect(convoy.statistics.convoySize).toBe("Small");
    });

    test("should calculate convoy statistics correctly", () => {
      const vehicleSpecs = [
        {
          topSpeed: 200, // SPD 13
          vehicleType: "car",
          driveType: "awd",
          cylinders: 4,
          displacement: 1.5, // FC 4
          horsepower: 174, // PWR 3
        },
        {
          topSpeed: 150, // SPD 9 (minimum)
          vehicleType: "truck",
          driveType: "4wd",
          cylinders: 6,
          displacement: 3.5, // FC 9
          horsepower: 285, // PWR 6
        },
      ];

      const convoy = manager.createConvoy("Test Convoy", vehicleSpecs);

      // Convoy speed should be minimum SPD × 10 × size modifier
      expect(convoy.statistics.sustainableSpeed).toBe(90); // 9 × 10 × 1.0 (small convoy)
      expect(convoy.statistics.totalFuelConsumption).toBe(13); // 4 + 9
      expect(convoy.statistics.totalPowerRating).toBe(9); // 3 + 6
    });

    test("should apply convoy size modifiers", () => {
      // Create a large convoy (6 vehicles)
      const vehicleSpecs = Array(6).fill({
        topSpeed: 100, // SPD 6
        vehicleType: "car",
        driveType: "fwd",
      });

      const convoy = manager.createConvoy("Large Convoy", vehicleSpecs);

      expect(convoy.statistics.convoySize).toBe("Large");
      expect(convoy.statistics.sustainableSpeed).toBe(48); // 6 × 10 × 0.8 (large convoy modifier)
    });

    test("should handle terrain and weather modifiers", () => {
      const vehicleSpecs = [
        {
          topSpeed: 100, // SPD 6
          vehicleType: "car",
          driveType: "fwd",
        },
      ];

      const options = {
        terrainModifier: 0.7,
        weatherModifier: 0.9,
      };

      const convoy = manager.createConvoy("Modified Convoy", vehicleSpecs, options);

      // Speed should be affected by terrain modifier
      expect(convoy.statistics.sustainableSpeed).toBe(42); // 6 × 10 × 1.0 × 0.7
    });

    test("should process convoy input", () => {
      const input = {
        convoyName: "Alpha Team",
        vehicles: [
          {
            topSpeed: 200,
            vehicleType: "car",
            driveType: "awd",
          },
          {
            topSpeed: 150,
            vehicleType: "truck",
            driveType: "4wd",
          },
        ],
        terrainModifier: 0.8,
      };

      const result = manager.processConvoyInput(input);

      expect(result.type).toBe("convoy");
      expect(result.result.name).toBe("Alpha Team");
      expect(result.result.vehicles.length).toBe(2);
      expect(result.result.statistics.vehicleCount).toBe(2);
    });
  });

  describe("Input Processing", () => {
    test("should detect single vehicle input", () => {
      const input = {
        topSpeed: 200,
        vehicleType: "car",
        driveType: "awd",
      };

      expect(manager.isSingleVehicleInput(input)).toBe(true);
      expect(manager.isConvoyInput(input)).toBe(false);
    });

    test("should detect convoy input", () => {
      const input = {
        convoyName: "Test Convoy",
        vehicles: [],
      };

      expect(manager.isSingleVehicleInput(input)).toBe(false);
      expect(manager.isConvoyInput(input)).toBe(true);
    });

    test("should process mixed input correctly", () => {
      const singleVehicleInput = {
        topSpeed: 200,
        vehicleType: "car",
        driveType: "awd",
      };

      const convoyInput = {
        convoyName: "Test Convoy",
        vehicles: [singleVehicleInput],
      };

      const singleResult = manager.processInput(singleVehicleInput);
      const convoyResult = manager.processInput(convoyInput);

      expect(singleResult.type).toBe("vehicle");
      expect(convoyResult.type).toBe("convoy");
    });
  });

  describe("Convoy Comparison", () => {
    test("should compare multiple convoys", () => {
      const fastConvoy = manager.createConvoy("Fast Team", [
        { topSpeed: 250, vehicleType: "car", driveType: "awd" },
      ]);

      const heavyConvoy = manager.createConvoy("Heavy Team", [
        { topSpeed: 100, vehicleType: "truck", driveType: "4wd" },
        { topSpeed: 100, vehicleType: "truck", driveType: "4wd" },
      ]);

      const comparison = manager.compareConvoys([fastConvoy, heavyConvoy]);

      expect(comparison.convoys.length).toBe(2);
      expect(comparison.fastest).toBe("Fast Team");
      expect(comparison.mostCargo).toBe("Heavy Team");
    });
  });

  describe("Convoy Recommendations", () => {
    test("should generate convoy recommendations", () => {
      const requirements = {
        minSpeed: 80,
        minRange: 500,
        minCargo: 10,
        maxVehicles: 3,
      };

      const availableVehicles = [
        { topSpeed: 200, vehicleType: "car", driveType: "awd", horsepower: 174 },
        { topSpeed: 150, vehicleType: "truck", driveType: "4wd", horsepower: 285 },
        { topSpeed: 120, vehicleType: "suv", driveType: "awd", horsepower: 220 },
      ];

      const recommendations = manager.generateConvoyRecommendations(requirements, availableVehicles);

      expect(recommendations.requirements).toEqual(requirements);
      expect(recommendations.recommendations.length).toBeGreaterThan(0);
      expect(recommendations.recommendations[0]).toHaveProperty("name");
      expect(recommendations.recommendations[0]).toHaveProperty("meetsRequirements");
      expect(recommendations.recommendations[0]).toHaveProperty("statistics");
    });
  });

  describe("Error Handling", () => {
    test("should handle invalid convoy configuration", () => {
      const errors = manager.validateConvoyConfig({});

      expect(errors.length).toBeGreaterThan(0);
      expect(errors[0]).toContain("vehicles array");
    });

    test("should handle convoy with invalid vehicles", () => {
      const convoy = manager.createConvoy("Test Convoy", [
        { topSpeed: 200, vehicleType: "car", driveType: "awd" }, // Valid
        { vehicleType: "car" }, // Invalid - missing required fields
      ]);

      expect(convoy.vehicles.length).toBe(1); // Only valid vehicle added
      expect(convoy.errors.length).toBeGreaterThan(0); // Error recorded
    });

    test("should handle processing errors gracefully", () => {
      const invalidInput = {
        invalidField: "invalid",
      };

      const result = manager.processInput(invalidInput);

      expect(result.error).toBeDefined();
      expect(result.inputReceived).toEqual(invalidInput);
    });
  });

  describe("Operational Calculations", () => {
    test("should calculate monthly operational statistics", () => {
      const convoy = manager.createConvoy("Ops Test", [
        {
          topSpeed: 100, // SPD 6, 60 km/h sustainable
          vehicleType: "car",
          driveType: "fwd",
          cylinders: 4,
          displacement: 2.0, // FC 6
        },
      ]);

      const stats = convoy.statistics;

      // Daily travel: 60 km/h × 8 hours × 0.85 efficiency = 408 km
      expect(stats.dailyTravelDistance).toBe(408);

      // Monthly travel: 408 km × 20 days = 8160 km
      expect(stats.monthlyTravelDistance).toBe(8160);

      // Monthly fuel: 8160 km ÷ 100 × 6 FC = 489.6 ≈ 490L
      expect(stats.monthlyFuelConsumption).toBe(490);
    });
  });
});
