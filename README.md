# Convoy Management System

A D&D 5e homebrew system for managing vehicle convoys in post-apocalyptic or modern campaigns. This system provides realistic vehicle statistics and convoy-level calculations while remaining simple enough for pen-and-paper gameplay.

## Features

- **Individual Vehicle Calculations**: Calculate 7 key statistics for any vehicle based on real-world specifications
- **Convoy Management**: Combine multiple vehicles into convoys with aggregate statistics and operational capabilities
- **Convoy Comparison**: Compare different convoy configurations to find the best fit for your mission
- **Recommendations**: Get convoy recommendations based on mission requirements
- **Backward Compatibility**: Maintains compatibility with the original single-vehicle calculator

## Installation

```bash
npm install
```

## Usage

### Command Line Interface

The system provides a comprehensive CLI with multiple commands:

```bash
# Show help
node src/cli.js help

# Calculate single vehicle statistics
node src/cli.js vehicle '{"topSpeed": 200, "vehicleType": "car", "driveType": "awd", "horsepower": 174}'

# Calculate convoy statistics
node src/cli.js convoy '{
  "convoyName": "Alpha Team",
  "vehicles": [
    {"topSpeed": 200, "vehicleType": "car", "driveType": "awd", "horsepower": 174},
    {"topSpeed": 150, "vehicleType": "truck", "driveType": "4wd", "horsepower": 285}
  ],
  "terrainModifier": 0.8
}'

# Compare multiple convoys
node src/cli.js compare '{
  "convoys": [
    {"convoyName": "Fast Team", "vehicles": [...]},
    {"convoyName": "Heavy Team", "vehicles": [...]}
  ]
}'

# Get convoy recommendations
node src/cli.js recommend '{
  "requirements": {"minSpeed": 80, "minRange": 500, "minCargo": 20},
  "availableVehicles": [...]
}'
```

### Programmatic Usage

```javascript
const ConvoyManager = require('./src/services/ConvoyManager');

const manager = new ConvoyManager();

// Create a single vehicle
const vehicle = manager.createVehicle({
  topSpeed: 200,
  vehicleType: "car",
  driveType: "awd",
  horsepower: 174
});

// Create a convoy
const convoy = manager.createConvoy("Alpha Team", [
  {topSpeed: 200, vehicleType: "car", driveType: "awd"},
  {topSpeed: 150, vehicleType: "truck", driveType: "4wd"}
]);

console.log(convoy.getOperationalSummary());
```

## Architecture

The system is built with a clean, modular architecture:

### Core Models

- **`Vehicle`** (`src/models/Vehicle.js`): Represents individual vehicles with specifications and calculated statistics
- **`Convoy`** (`src/models/Convoy.js`): Manages collections of vehicles with convoy-level calculations

### Services

- **`CalculatorService`** (`src/services/CalculatorService.js`): Contains all vehicle calculation logic
- **`ConvoyManager`** (`src/services/ConvoyManager.js`): High-level service for managing vehicles and convoys

### CLI

- **`ConvoyCLI`** (`src/cli.js`): Command-line interface with multiple commands and backward compatibility

## Vehicle Statistics

Each vehicle has 7 primary statistics:

1. **Speed Rating (SPD)**: Sustainable highway travel speed (SPD × 10 = km/h)
2. **Fuel Consumption (FC)**: Fuel usage per 100km
3. **Cargo Capacity (CC)**: Storage capacity in abstract units
4. **Maneuverability (MAN)**: Handling and agility rating
5. **Durability (DUR)**: Structural integrity and hit points
6. **Power Rating (PWR)**: Engine power for special tasks
7. **Maintenance Cost (MC)**: Monthly upkeep requirements

## Convoy Statistics

Convoys provide aggregate statistics and operational capabilities:

- **Speed**: Limited by slowest vehicle, modified by convoy size and terrain
- **Range**: Fuel-limited operational range
- **Logistics**: Total cargo, fuel consumption, maintenance requirements
- **Operational**: Daily/monthly travel distances, efficiency calculations

## Testing

Run the comprehensive test suite:

```bash
npm test
npm run test:watch  # Watch mode for development
```

The test suite includes:
- Individual calculation validation
- Complete vehicle examples from CSV validation data
- Convoy operations and statistics
- Error handling and edge cases
- Formula verification against documented rules

## Examples

### Operational Summary

```
Alpha Team Operational Summary:
- 2 vehicles (Small convoy, Simple complexity)
- Sustainable Speed: 90 km/h
- Daily Travel: 612 km (8h @ 85% efficiency)
- Monthly Travel: 12240 km (20 travel days)
- Fuel-Limited Range: 587 km
- Monthly Consumption: 2815L fuel, 4h maintenance, 1 parts units
- Total Cargo: 7 units, Power: 9 PWR, Durability: 80 DUR
```

### Convoy Comparison

```json
{
  "fastest": "Fast Team",
  "longestRange": "Heavy Team", 
  "mostCargo": "Heavy Team",
  "mostPowerful": "Heavy Team",
  "mostEfficient": "Fast Team"
}
```

## Documentation

The complete system documentation is available in the `docs/` directory:

1. `01-convoy-management-system-overview.md` - System overview and design philosophy
2. `02-vehicle-character-sheets.md` - Individual vehicle statistics and creation rules
3. `03-convoy-calculation-methods.md` - Convoy-level calculations and examples
4. `04-vehicle-damage-and-repair.md` - Damage system and repair mechanics
5. `05-vehicle-synergy-rules.md` - Inter-vehicle synergies and bonuses
6. `06-terrain-and-environmental-factors.md` - Environmental effects on convoys
7. `07-vehicle-modifications-and-customization.md` - Upgrade and modification rules
8. `08-quick-reference-tables.md` - Consolidated lookup tables

## License

ISC License - see package.json for details.

## Contributing

1. Run tests: `npm test`
2. Follow the existing code style
3. Add tests for new features
4. Update documentation as needed

## Changelog

### v1.0.0 - Well-Architected Refactor

- **Breaking Changes**: Refactored from single script to modular architecture
- **New Features**: 
  - Convoy management and calculations
  - Convoy comparison and recommendations
  - Enhanced CLI with multiple commands
  - Comprehensive operational statistics
- **Improvements**:
  - Clean separation of concerns
  - Comprehensive test coverage
  - Better error handling
  - Maintained backward compatibility
