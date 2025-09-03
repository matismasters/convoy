# Vehicle Character Sheets
## Individual Vehicle Statistics and Creation Rules

### Introduction

Every vehicle in the Convoy Management System requires a character sheet that translates real-world specifications into game mechanics. This document provides the framework for creating these sheets using easily accessible vehicle data.

## Vehicle Statistics Quick Reference

Each vehicle has seven core statistics that define its capabilities:

- **Speed Rating (SPD):** How fast the vehicle can travel under optimal conditions
- **Fuel Consumption (FC):** How much fuel the vehicle uses per 100 km of travel
- **Cargo Capacity (CC):** How much equipment, supplies, or people the vehicle can transport
- **Maneuverability (MAN):** How well the vehicle handles difficult terrain and tight situations
- **Durability (DUR):** The vehicle's hit points and resistance to damage
- **Power Rating (PWR):** The vehicle's ability to perform heavy work like clearing obstacles or towing
- **Maintenance Cost (MC):** Monthly upkeep requirements in time and spare parts

## Document Index

1. **[Core Vehicle Statistics](#core-vehicle-statistics)** - Detailed explanation of all seven statistics
2. **[Vehicle Creation Process](#vehicle-creation-process)** - Step-by-step guide to creating vehicle sheets
3. **[Vehicle Character Sheet Template](#vehicle-character-sheet-template)** - Printable template for recording vehicle data
4. **[Example Vehicle Sheets](#example-vehicle-sheets)** - Seven complete vehicle examples from cars to tanks
5. **[Special Vehicle Categories](#special-vehicle-categories)** - Specialized equipment and military vehicles
6. **[Vehicle Modification Rules](#vehicle-modification-rules)** - Performance and utility upgrades

## Core Vehicle Statistics

### Primary Statistics

#### 1. Speed Rating (SPD)
**Definition:** Sustainable highway travel speed for individual vehicles under optimal conditions
**Calculation:** `(Top Speed ÷ 16) rounded to nearest 5`
- Compact Car (190 km/h): SPD 12 = 120 km/h sustainable speed
- Semi-Truck (120 km/h): SPD 8 = 80 km/h sustainable speed  
- Sports Car (290 km/h): SPD 18 = 180 km/h sustainable speed
- Farm Tractor (40 km/h): SPD 3 = 30 km/h sustainable speed

**Conversion to Travel Speed:** `SPD × 10 = km/h on highways`
**Note:** Convoy coordination, terrain, and operational factors are applied separately in convoy calculations.

#### 2. Fuel Consumption (FC)
**Definition:** Resource drain per 100 km of travel
**Base Formula:** `Cylinder Count × Displacement Modifier`

**Displacement Modifiers:**
- Small (< 2.0L): ×1.0
- Medium (2.0L - 4.0L): ×1.5
- Large (4.0L - 6.0L): ×2.0
- Very Large (> 6.0L): ×3.0

**Examples:**
- 4-cylinder 1.8L Honda Civic: FC 4
- 6-cylinder 3.5L Toyota Camry: FC 9
- 8-cylinder 5.7L Dodge Ram: FC 16

**Alternative Calculation (when engine data unavailable):**
Use Vehicle Type Base Consumption:
- Motorcycle: FC 2
- Compact Car: FC 4
- Mid-size Car: FC 6
- Full-size Car/SUV: FC 8
- Pickup Truck: FC 10
- Semi-Truck: FC 20
- Heavy Equipment: FC 25
- Military Vehicles: FC +25% (due to armor weight and specialized systems)

#### 3. Cargo Capacity (CC)
**Definition:** Transport capability measured in standardized units
**Categories:**
- **Personal (P):** 1-2 units (motorcycles, sports cars)
- **Light (L):** 3-8 units (sedans, small SUVs)
- **Medium (M):** 9-20 units (pickup trucks, vans)
- **Heavy (H):** 21-50 units (box trucks, RVs)
- **Industrial (I):** 51+ units (semi-trailers, specialized haulers)

**Cargo Unit Examples:**
- 1 unit = 1 person + personal gear
- 1 unit = 90 kg of supplies
- 1 unit = 190 liters of fuel
- 1 unit = 1 week of food for 4 people
- 1 unit = 5 maintenance points of parts for repairs

#### 4. Maneuverability (MAN)
**Definition:** Handling capability in difficult terrain and situations
**Base Calculation:** `10 - (Size Category × 2) + Drive Type Bonus`

**Size Categories:**
- Compact: 0
- Mid-size: 1
- Full-size: 2
- Large: 3
- Oversized: 4

**Drive Type Bonuses:**
- Front-wheel Drive: +0
- Rear-wheel Drive: +1
- All-wheel Drive: +2
- 4-wheel Drive: +3
- Military Tracks: +0 (specialized terrain handling)

**Special Bonuses:**
- Military Vehicles: +2 MAN in combat/rough terrain situations

**Examples:**
- Compact AWD Car: MAN 12
- Full-size 4WD Truck: MAN 9
- Semi-truck: MAN 3
- Military Humvee: MAN 10 (base) +2 in combat = MAN 12

#### 5. Durability (DUR)
**Definition:** Vehicle hit points and damage resistance
**Calculation:** `Vehicle Type Base + Size Modifier`

**Vehicle Type Base:**
- Motorcycle: 20
- Car: 40
- Truck/SUV: 60
- Commercial Vehicle: 80
- Military Vehicle: 120

**Size Modifiers:**
- Compact: -10
- Mid-size: +0
- Full-size: +10
- Large: +20
- Oversized: +40

**Special Modifiers:**
- Military Vehicles: +50% to final durability (armor protection and reinforced construction)
- Armored Civilian Vehicles: +25% to final durability

#### 6. Power Rating (PWR)
**Definition:** Engine power for heavy work, obstacle removal, and assistance tasks
**Calculation:** `(Horsepower ÷ 50) rounded to nearest whole number, minimum 1`

**Power Applications:**
- **Obstacle Removal:** Clear debris, fallen trees, abandoned vehicles
- **Towing/Recovery:** Pull stuck vehicles, drag heavy objects
- **Construction Work:** Push down walls, dig trenches, lift heavy materials
- **Convoy Assistance:** Help other vehicles up steep grades or through difficult terrain

**Examples:**
- Honda Civic (158 HP): PWR 3
- Ford F-150 (375 HP): PWR 8
- John Deere Tractor (540 HP): PWR 11
- Caterpillar Bulldozer (850 HP): PWR 17

**Alternative Calculation (when HP unavailable):**
Use Engine Size and Type:
- Small engines (< 2.0L): PWR 2-4
- Medium engines (2.0L - 4.0L): PWR 5-7
- Large engines (4.0L - 6.0L): PWR 8-10
- Very Large engines (> 6.0L): PWR 11-15
- Industrial/Heavy Equipment: PWR 15-20

#### 7. Maintenance Cost (MC)
**Definition:** Monthly upkeep requirements in resource units
**Base Formula:** `(FC + SPD) ÷ 10, minimum 1`

**Maintenance Requirements:**
- **Time Required:** MC × 1 hour of work per month
- **Parts Required:** MC × 0.2 cargo units of spare parts per month
- **Skill Level:** Complexity determines required expertise

**Parts-to-Cargo Relationship:**
- **1 Cargo Unit of Parts = 5 Maintenance Points worth of supplies**
- **Bulk Storage:** Parts can be stockpiled (1 cargo unit = 5 months of MC 1 vehicle maintenance)
- **Sharing:** Parts are interchangeable between similar vehicle types
- **Scavenging:** Can recover 0.1-0.3 cargo units of parts from abandoned vehicles

**Complexity Modifiers:**
- Simple (basic vehicles): ×1.0 - Basic tools, common parts
- Standard (modern vehicles): ×1.5 - Specialized tools, moderate skill required
- Complex (luxury/performance): ×2.0 - Advanced diagnostics, rare parts
- Specialized (military/industrial): ×3.0 - Expert knowledge, military-grade components

**Military Vehicle Modifiers:**
- Light Military (Humvee, LAV): ×2.0 (specialized parts and training required)
- Heavy Military (Tanks, Artillery): ×3.0 (complex systems and rare components)
- Specialized Military (Command, Medical): ×2.5 (advanced electronics and specialized equipment)

**Maintenance Failure Consequences:**
- **Skip 1 Month:** -10% to all performance stats
- **Skip 2 Months:** -25% to all performance stats, random breakdown chance
- **Skip 3+ Months:** Vehicle becomes unreliable, major component failure risk

**Maintenance Example:**
*Small convoy with Honda Civic (MC 2) and Semi-Truck (MC 5):*
- **Monthly Time:** 2 + 5 = 7 hours total maintenance work
- **Monthly Parts:** (2 × 0.2) + (5 × 0.2) = 1.4 cargo units of parts
- **Parts Storage:** 1 cargo unit of parts = 5 maintenance points, covers 2.5 months for Civic or 1 month for Semi-Truck
- **Convoy Planning:** Dedicate 2 cargo units for maintenance supplies = 3+ months of operation

## Vehicle Creation Process

### Step 1: Gather Real-World Data
Research the following information:
- Vehicle make, model, year
- Engine specifications (cylinders, displacement)
- Top speed
- Curb weight and payload capacity
- Drive type (FWD, RWD, AWD, 4WD)
- Vehicle dimensions

### Step 2: Determine Vehicle Category
Classify the vehicle by:
- **Size Category:** Compact, Mid-size, Full-size, Large, Oversized
- **Type Category:** Car, Truck, SUV, Commercial, Military, Specialty
- **Complexity Level:** Simple, Standard, Complex, Specialized
- **Military Classification (if applicable):** Light, Medium, Heavy, Specialized

### Step 3: Calculate Base Statistics
Use the formulas provided above to determine:
- Speed Rating (SPD)
- Fuel Consumption (FC)
- Cargo Capacity (CC)
- Maneuverability (MAN)
- Durability (DUR)
- Power Rating (PWR)
- Maintenance Cost (MC)

### Step 4: Apply Special Characteristics
Add any unique features:
- **Specializations:** Medical bay, workshop, communications, weapon systems, armor protection
- **Modifications:** Armor plating, performance upgrades, efficiency improvements, military conversions
- **Limitations:** Terrain restrictions, fuel type requirements, military regulations, specialized maintenance
- **Military Features:** Combat bonuses, armor ratings, specialized equipment, tactical capabilities

## Vehicle Character Sheet Template

```
VEHICLE NAME: _________________________________
MAKE/MODEL/YEAR: _____________________________

=== CORE STATISTICS ===
Speed Rating (SPD):        [ __ ]
Fuel Consumption (FC):     [ __ ]
Cargo Capacity (CC):       [ __ ] Category: ___
Maneuverability (MAN):     [ __ ]
Durability (DUR):          [ __ ] / [ __ ] (Current/Max)
Power Rating (PWR):        [ __ ]
Maintenance Cost (MC):     [ __ ]

=== VEHICLE DETAILS ===
Size Category:             [ Compact / Mid / Full / Large / Oversized ]
Type Category:             [ Car / Truck / SUV / Commercial / Military / Specialty ]
Drive Type:                [ FWD / RWD / AWD / 4WD / Tracks ]
Fuel Type:                 [ Gasoline / Diesel / Multi-fuel ]
Military Class:            [ Light / Medium / Heavy / Specialized / N/A ]

=== ENGINE SPECIFICATIONS ===
Cylinders:                 [ __ ]
Displacement:              [ __._ L ]
Horsepower:                [ ___ HP ]
Real-world Top Speed:      [ ___ km/h ]

=== SPECIAL FEATURES ===
Specializations:           ________________________________
Modifications:             ________________________________
Limitations:               ________________________________

=== CONVOY EFFECTS ===
Provides to Convoy:        ________________________________
Requires from Convoy:      ________________________________
Synergies:                 ________________________________
```

## Example Vehicle Sheets

### Example 1: 2019 Honda Civic (Fuel Efficient Scout Vehicle)
```
VEHICLE NAME: Road Runner
MAKE/MODEL/YEAR: 2019 Honda Civic

=== CORE STATISTICS ===
Speed Rating (SPD):        12 (200 km/h ÷ 16, = 120 km/h sustainable)
Fuel Consumption (FC):     4 (4-cyl × 1.0 for 1.5L engine)
Cargo Capacity (CC):       4 (Light category)
Maneuverability (MAN):     12 (10 - 0 + 2 for AWD)
Durability (DUR):          40 / 40
Power Rating (PWR):        4 (174 HP ÷ 50, rounded)
Maintenance Cost (MC):     2 ((4 + 12) ÷ 10, ×1.5 complexity)

=== SPECIAL FEATURES ===
Specializations:           Fuel Efficiency, Reliable Mechanics, Compact Size
Convoy Effects:            Low fuel consumption, good for scouting missions
```

### Example 2: Peterbilt 379 Semi-Truck
```
VEHICLE NAME: Big Rig
MAKE/MODEL/YEAR: 2005 Peterbilt 379

=== CORE STATISTICS ===
Speed Rating (SPD):        10 (169 km/h ÷ 16, = 100 km/h sustainable)
Fuel Consumption (FC):     24 (6-cyl × 4.0 for 15.0L engine)
Cargo Capacity (CC):       60 (Industrial category with trailer)
Maneuverability (MAN):     3 (10 - 8 + 1 for RWD)
Durability (DUR):          140 / 140
Power Rating (PWR):        10 (500 HP ÷ 50)
Maintenance Cost (MC):     5 ((24 + 10) ÷ 10, ×1.5 complexity)

=== SPECIAL FEATURES ===
Specializations:           Heavy Hauling, Sleeper Cab
Limitations:               Cannot traverse narrow paths, high fuel consumption
```

### Example 3: John Deere 9600 Combine Harvester
```
VEHICLE NAME: Grain Reaper
MAKE/MODEL/YEAR: 1995 John Deere 9600

=== CORE STATISTICS ===
Speed Rating (SPD):        2 (40 km/h ÷ 16, = 20 km/h sustainable)
Fuel Consumption (FC):     18 (6-cyl × 3.0 for 8.1L engine)
Cargo Capacity (CC):       25 (Heavy category - grain tank)
Maneuverability (MAN):     1 (10 - 8 - 1 for tracks)
Durability (DUR):          160 / 160
Power Rating (PWR):        11 (540 HP ÷ 50, rounded)
Maintenance Cost (MC):     9 ((18 + 2) ÷ 10, ×3.0 specialized)

=== SPECIAL FEATURES ===
Specializations:           Crop Harvesting, Bio-fuel Feedstock Production, Heavy Work
Convoy Effects:            Provides raw materials for bio-diesel production, can clear road obstacles
Power Applications:        Clear fallen trees, push abandoned vehicles, demolish structures
Limitations:               Extremely slow, cannot travel on roads without permits
```

### Example 4: M1151 Humvee (Up-Armored)
```
VEHICLE NAME: Armored Scout
MAKE/MODEL/YEAR: 2010 M1151 HMMWV

=== CORE STATISTICS ===
Speed Rating (SPD):        10 (121 km/h ÷ 16, = 100 km/h sustainable)
Fuel Consumption (FC):     18 (8-cyl × 2.0 for 6.5L diesel, +25% military penalty)
Cargo Capacity (CC):       8 (Light category - 4 personnel + gear)
Maneuverability (MAN):     10 (10 - 2 + 3 for 4WD + 2 combat bonus)
Durability (DUR):          180 / 180 (120 base × 1.5 military bonus)
Power Rating (PWR):        6 (300 HP ÷ 50)
Maintenance Cost (MC):     7 ((18 + 10) ÷ 10, ×2.0 military penalty)

=== SPECIAL FEATURES ===
Specializations:           Armor Protection, Communications, Night Vision
Convoy Effects:            Provides security escort, +1 convoy defense rating
Limitations:               High fuel consumption, requires military maintenance
```

### Example 5: M1A2 Abrams Main Battle Tank
```
VEHICLE NAME: Steel Beast
MAKE/MODEL/YEAR: 2017 M1A2 Abrams

=== CORE STATISTICS ===
Speed Rating (SPD):        4 (67 km/h ÷ 16, = 40 km/h sustainable)
Fuel Consumption (FC):     45 (Turbine engine equivalent, +25% military penalty)
Cargo Capacity (CC):       2 (Personal - crew only)
Maneuverability (MAN):     4 (10 - 4 + 0 for tracks + 2 combat bonus)
Durability (DUR):          360 / 360 (240 base × 1.5 military bonus)
Power Rating (PWR):        30 (1500 HP ÷ 50)
Maintenance Cost (MC):     18 ((45 + 4) ÷ 10, ×3.0 specialized military)

=== SPECIAL FEATURES ===
Specializations:           Heavy Armor, Main Gun, Advanced Fire Control
Convoy Effects:            Maximum protection, intimidation factor
Limitations:               Extreme fuel consumption, bridge weight limits, requires HET for long moves
```

### Example 6: M35A2 "Deuce and a Half" Military Truck
```
VEHICLE NAME: Supply Runner
MAKE/MODEL/YEAR: 1971 M35A2 Cargo Truck

=== CORE STATISTICS ===
Speed Rating (SPD):        6 (90 km/h ÷ 16, = 60 km/h sustainable)
Fuel Consumption (FC):     22 (6-cyl × 2.5 for multi-fuel engine, +25% military penalty)
Cargo Capacity (CC):       30 (Heavy category - 2.5 ton capacity)
Maneuverability (MAN):     8 (10 - 3 + 3 for 6WD + 2 combat bonus)
Durability (DUR):          180 / 180 (120 base × 1.5 military bonus)
Power Rating (PWR):        5 (240 HP ÷ 50)
Maintenance Cost (MC):     6 ((22 + 6) ÷ 10, ×2.0 military penalty)

=== SPECIAL FEATURES ===
Specializations:           Multi-fuel Engine, 6-wheel Drive, Cargo Hauling
Convoy Effects:            Can run on multiple fuel types, reliable logistics
Limitations:               Loud operation, military appearance draws attention
```

### Example 7: LAV-25 Light Armored Vehicle
```
VEHICLE NAME: Recon Hunter
MAKE/MODEL/YEAR: 1999 LAV-25

=== CORE STATISTICS ===
Speed Rating (SPD):        6 (100 km/h ÷ 16, = 60 km/h sustainable)
Fuel Consumption (FC):     20 (8-cyl × 2.0 for 6.2L diesel, +25% military penalty)
Cargo Capacity (CC):       6 (Light category - 3 crew + 3 passengers)
Maneuverability (MAN):     9 (10 - 2 + 2 for 8-wheel drive + 2 combat bonus)
Durability (DUR):          225 / 225 (150 base × 1.5 military bonus)
Power Rating (PWR):        7 (350 HP ÷ 50)
Maintenance Cost (MC):     7 ((20 + 6) ÷ 10, ×2.5 specialized military)

=== SPECIAL FEATURES ===
Specializations:           Amphibious, 25mm Cannon, Advanced Optics
Convoy Effects:            All-terrain capability, heavy firepower support
Limitations:               Complex maintenance, requires trained operators
```

## Special Vehicle Categories

### Specialized Equipment
- **Mobile Workshops:** Reduce convoy maintenance costs
- **Fuel Tankers:** Extend convoy range
- **Medical Vehicles:** Provide healing capabilities (including military field ambulances)
- **Communication Vehicles:** Improve convoy coordination (including military command posts)
- **Military Combat Vehicles:** Provide protection and firepower (Humvees, APCs, tanks)
- **Military Support Vehicles:** Logistics and specialized functions (supply trucks, engineering vehicles)
- **Multi-fuel Military Vehicles:** Can operate on various fuel types for operational flexibility

## Vehicle Modification Rules

### Performance Modifications
- **Engine Tuning:** +20% SPD, +30% FC, +50% MC
- **Efficiency Upgrades:** -20% FC, +25% MC
- **Suspension Upgrades:** +2 MAN, +20% MC

### Utility Modifications
- **Armor Plating:** +50% DUR, -20% SPD, -2 MAN (civilian armor upgrade)
- **Military-Grade Armor:** +75% DUR, -30% SPD, -3 MAN, ×2.5 MC (professional armor systems)
- **Cargo Expansion:** +25% CC, -1 MAN
- **Auxiliary Fuel Tanks:** +50% range, -10% CC
- **Weapon Mounts:** Add combat capability, +1 crew requirement, +25% MC
- **Communications Suite:** Improve convoy coordination, +15% MC

### Calculation Example
Base Vehicle: 2016 Ford F-150
- SPD 15, FC 12, CC 15, MAN 8, DUR 70, MC 3

With Engine Tuning + Armor Plating:
- SPD: 15 × 1.2 × 0.8 = 14 (rounded)
- FC: 12 × 1.3 = 16 (rounded)
- CC: 15 (unchanged)
- MAN: 8 - 2 = 6
- DUR: 70 × 1.5 = 105
- MC: 3 × 1.5 × 1.2 = 5 (rounded)
