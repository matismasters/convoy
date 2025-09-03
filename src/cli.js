#!/usr/bin/env node

const ConvoyManager = require('./services/ConvoyManager');

/**
 * Command Line Interface for Convoy Management System
 */
class ConvoyCLI {
  constructor() {
    this.convoyManager = new ConvoyManager();
  }

  /**
   * Main entry point for CLI
   */
  run() {
    const args = process.argv.slice(2);
    
    if (args.length === 0) {
      this.showHelp();
      return;
    }

    const command = args[0];
    
    switch (command) {
      case 'vehicle':
      case 'v':
        this.handleVehicleCommand(args.slice(1));
        break;
      case 'convoy':
      case 'c':
        this.handleConvoyCommand(args.slice(1));
        break;
      case 'compare':
        this.handleCompareCommand(args.slice(1));
        break;
      case 'recommend':
        this.handleRecommendCommand(args.slice(1));
        break;
      case 'help':
      case '-h':
      case '--help':
        this.showHelp();
        break;
      default:
        // Backward compatibility: if first arg is JSON, treat as vehicle
        if (this.isJSON(command)) {
          this.handleLegacyVehicleCommand(command);
        } else {
          console.error(`Unknown command: ${command}`);
          this.showHelp();
          process.exit(1);
        }
    }
  }

  /**
   * Handle vehicle calculation command
   * @param {Array} args - Command arguments
   */
  handleVehicleCommand(args) {
    if (args.length === 0) {
      console.error('Vehicle command requires JSON input');
      console.error('Usage: convoy vehicle \'{"topSpeed": 200, "vehicleType": "car", "driveType": "awd"}\'');
      process.exit(1);
    }

    const jsonInput = args[0];
    this.processVehicleInput(jsonInput);
  }

  /**
   * Handle convoy calculation command
   * @param {Array} args - Command arguments
   */
  handleConvoyCommand(args) {
    if (args.length === 0) {
      console.error('Convoy command requires JSON input');
      console.error('Usage: convoy convoy \'{"convoyName": "Alpha Team", "vehicles": [...]}\'');
      process.exit(1);
    }

    const jsonInput = args[0];
    this.processConvoyInput(jsonInput);
  }

  /**
   * Handle convoy comparison command
   * @param {Array} args - Command arguments
   */
  handleCompareCommand(args) {
    if (args.length === 0) {
      console.error('Compare command requires JSON input with multiple convoy configurations');
      process.exit(1);
    }

    const jsonInput = args[0];
    this.processCompareInput(jsonInput);
  }

  /**
   * Handle convoy recommendation command
   * @param {Array} args - Command arguments
   */
  handleRecommendCommand(args) {
    if (args.length === 0) {
      console.error('Recommend command requires JSON input with requirements and available vehicles');
      process.exit(1);
    }

    const jsonInput = args[0];
    this.processRecommendInput(jsonInput);
  }

  /**
   * Handle legacy vehicle command (backward compatibility)
   * @param {string} jsonInput - JSON input string
   */
  handleLegacyVehicleCommand(jsonInput) {
    this.processVehicleInput(jsonInput);
  }

  /**
   * Process vehicle input
   * @param {string} jsonInput - JSON input string
   */
  processVehicleInput(jsonInput) {
    try {
      const input = JSON.parse(jsonInput);
      const result = this.convoyManager.processSingleVehicle(input);
      
      if (result.error) {
        console.error('Error:', result.error);
        process.exit(1);
      }

      console.log(JSON.stringify(result.result, null, 2));
    } catch (error) {
      console.error('Error processing vehicle input:', error.message);
      process.exit(1);
    }
  }

  /**
   * Process convoy input
   * @param {string} jsonInput - JSON input string
   */
  processConvoyInput(jsonInput) {
    try {
      const input = JSON.parse(jsonInput);
      const result = this.convoyManager.processConvoyInput(input);
      
      if (result.error) {
        console.error('Error:', result.error);
        process.exit(1);
      }

      console.log(JSON.stringify(result.result, null, 2));
    } catch (error) {
      console.error('Error processing convoy input:', error.message);
      process.exit(1);
    }
  }

  /**
   * Process convoy comparison input
   * @param {string} jsonInput - JSON input string
   */
  processCompareInput(jsonInput) {
    try {
      const input = JSON.parse(jsonInput);
      
      if (!input.convoys || !Array.isArray(input.convoys)) {
        throw new Error('Compare input must include a "convoys" array');
      }

      // Create convoy instances
      const convoys = input.convoys.map(convoyConfig => {
        return this.convoyManager.createConvoy(
          convoyConfig.convoyName || 'Unnamed Convoy',
          convoyConfig.vehicles || [],
          convoyConfig.options || {}
        );
      });

      const comparison = this.convoyManager.compareConvoys(convoys);
      console.log(JSON.stringify(comparison, null, 2));
    } catch (error) {
      console.error('Error processing comparison input:', error.message);
      process.exit(1);
    }
  }

  /**
   * Process convoy recommendation input
   * @param {string} jsonInput - JSON input string
   */
  processRecommendInput(jsonInput) {
    try {
      const input = JSON.parse(jsonInput);
      
      if (!input.requirements || !input.availableVehicles) {
        throw new Error('Recommend input must include "requirements" and "availableVehicles"');
      }

      const recommendations = this.convoyManager.generateConvoyRecommendations(
        input.requirements,
        input.availableVehicles
      );

      console.log(JSON.stringify(recommendations, null, 2));
    } catch (error) {
      console.error('Error processing recommendation input:', error.message);
      process.exit(1);
    }
  }

  /**
   * Check if string is valid JSON
   * @param {string} str - String to check
   * @returns {boolean} True if valid JSON
   */
  isJSON(str) {
    try {
      JSON.parse(str);
      return true;
    } catch (e) {
      return false;
    }
  }

  /**
   * Show help information
   */
  showHelp() {
    console.log(`
Convoy Management System CLI

Usage:
  convoy <command> [options]

Commands:
  vehicle, v <json>     Calculate statistics for a single vehicle
  convoy, c <json>      Calculate statistics for a convoy
  compare <json>        Compare multiple convoy configurations
  recommend <json>      Get convoy recommendations based on requirements
  help, -h, --help      Show this help message

Examples:

  Single Vehicle:
    convoy vehicle '{"topSpeed": 200, "vehicleType": "car", "driveType": "awd", "horsepower": 174}'

  Convoy:
    convoy convoy '{
      "convoyName": "Alpha Team",
      "vehicles": [
        {"topSpeed": 200, "vehicleType": "car", "driveType": "awd"},
        {"topSpeed": 150, "vehicleType": "truck", "driveType": "4wd"}
      ],
      "terrainModifier": 0.8
    }'

  Compare Convoys:
    convoy compare '{
      "convoys": [
        {"convoyName": "Fast Team", "vehicles": [...]},
        {"convoyName": "Heavy Team", "vehicles": [...]}
      ]
    }'

  Recommendations:
    convoy recommend '{
      "requirements": {"minSpeed": 80, "minRange": 500, "minCargo": 20},
      "availableVehicles": [...]
    }'

Backward Compatibility:
  convoy '{"topSpeed": 200, "vehicleType": "car", "driveType": "awd"}'
    `);
  }
}

// Run CLI if this file is executed directly
if (require.main === module) {
  const cli = new ConvoyCLI();
  cli.run();
}

module.exports = ConvoyCLI;
