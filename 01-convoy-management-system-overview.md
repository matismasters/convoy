# Convoy Management System for D&D 5e
## General Overview and Design Philosophy

### Introduction

The Convoy Management System is designed to bring realistic vehicle management to post-apocalyptic or modern D&D 5e campaigns. This system provides an abstraction layer that allows players to easily manage fleets of vehicles while maintaining tactical depth and creative flexibility.

## Core Design Principles

### 1. Reality-Based Abstraction

The system serves as a bridge between real-world vehicle specifications and game mechanics, allowing players to:

- Research actual vehicles online and translate their specifications into game statistics
- Use familiar real-world concepts (fuel consumption, cargo capacity, maintenance) in simplified formats
- Maintain immersion through realistic constraints and capabilities

**Implementation Approach:**
- Vehicle statistics are derived from easily accessible real-world data
- Fuel consumption scales with engine specifications (cylinder count, displacement)
- Weight and cargo capacity use simplified vehicle type categories  
- Performance characteristics reflect real-world vehicle capabilities
- Power rating derived from horsepower for heavy work applications

### 2. Simplicity Through Multipliers

Rather than complex stacking bonuses and fixed modifiers, the system uses:

- **Multiplier-based calculations** for easy mental math
- **Percentage modifiers** instead of flat bonuses
- **Category-based scaling** rather than granular point systems
- **Unified formulas** that work consistently across all vehicle types

**Example:** Instead of "+2 speed, +1 fuel efficiency, -3 maneuverability," a vehicle modification might provide "×1.2 speed, ×0.8 fuel consumption, ×0.9 maneuverability."

### 3. Modular Convoy Composition

The system supports any convoy size from a single vehicle to large fleets:

#### Individual Vehicle Level
- Each vehicle has its own "character sheet" with core statistics
- Vehicles can be used independently or as part of a convoy
- Clear guidelines for solo vehicle operations

#### Convoy Level Calculations
- **Speed:** Limited by the slowest vehicle (minimum rule)
- **Fuel Consumption:** Averaged across all vehicles
- **Cargo Capacity:** Sum of all individual capacities
- **Maneuverability:** Weighted average based on vehicle roles
- **Maintenance:** Combined monthly costs with potential efficiency bonuses
- **Power Rating:** Maximum available for heavy work and obstacle removal

### 4. Creative Vehicle Integration

The system encourages player creativity through:

#### Unconventional Vehicle Support
- Agricultural vehicles (harvesters, tractors)
- Industrial equipment (cranes, bulldozers) 
- Specialized transport (car carriers, fuel tankers)
- Military vehicles (Humvees, APCs, tanks, supply trucks)

#### Transport Solutions
- Trailer systems for moving immobile vehicles
- Trade-offs between transport capacity and convoy performance
- Dynamic reconfiguration options during gameplay

### 5. Inter-Vehicle Synergies

Vehicles can enhance or modify convoy-wide statistics through specialized roles:

#### Support Vehicle Examples

**Mobile Bio-Diesel Distiller**
- Reduces convoy fuel consumption by processing waste materials
- Effect scales with distiller capacity and available feedstock
- Synergizes with agricultural vehicles that provide raw materials

**Hydroponic Mobile Unit**
- Enhances bio-diesel production efficiency
- Provides sustainable food production
- Creates cascading efficiency bonuses

**Scout Vehicle**
- Increases convoy travel speed through route optimization
- Must maintain communication range with main convoy
- Provides early warning for hazards and opportunities

**Mobile Barracks/Sleeper Vehicle**
- Eliminates setup time for rest periods
- Enables "rolling rest" for long-distance travel
- Reduces overall travel time through efficient rest management

#### Synergy Calculation Framework
- **Primary Effects:** Direct statistical modifications
- **Secondary Effects:** Conditional bonuses based on other vehicles
- **Scaling Effects:** Benefits that increase with convoy size or specific vehicle combinations

## Core Statistics Framework

### Primary Vehicle Statistics
1. **Speed Rating (SPD)** - Base travel velocity under optimal conditions
2. **Fuel Consumption (FC)** - Resource drain per 100 km of travel
3. **Cargo Capacity (CC)** - Transport capability measured in standardized units
4. **Maneuverability (MAN)** - Handling capability in difficult terrain and situations
5. **Durability (DUR)** - Vehicle hit points and damage resistance
6. **Power Rating (PWR)** - Engine power for heavy work, obstacle removal, and assistance tasks
7. **Maintenance Cost (MC)** - Monthly upkeep requirements in time and spare parts

### Convoy-Level Calculations
- **Effective Speed:** `MIN(all vehicle SPD) × 10 × convoy_size_modifier × terrain_modifier`
- **Total Fuel Consumption:** `SUM(individual_consumption) × efficiency_modifiers`
- **Combined Cargo:** `SUM(all_cargo_capacities)`
- **Convoy Maneuverability:** `WEIGHTED_AVERAGE(maneuverability) × size_penalty`
- **Fuel-Limited Range:** Practical operations constrained by fuel logistics rather than speed capability

## Implementation Philosophy

### Pen-and-Paper Friendly
- All calculations use simple arithmetic
- Reference tables fit on single pages
- Quick-reference cards for common operations
- Minimal bookkeeping requirements

### Scalable Complexity
- Basic rules for simple convoys
- Advanced rules for complex fleet management
- Optional subsystems for detailed simulation
- Modular rule adoption

### Player Agency
- Multiple viable convoy compositions
- Trade-offs create meaningful choices
- Creative solutions rewarded mechanically
- Flexibility in vehicle selection and modification
