# Convoy Calculation Methods
## Detailed Formulas and Examples

### Introduction

This document provides the mathematical framework for combining individual vehicles into effective convoys. These calculations transform separate vehicle statistics into unified convoy capabilities while maintaining the system's pen-and-paper friendly approach.

## Convoy Statistics Quick Reference

Each convoy has six primary statistics derived from individual vehicle data:

- **Convoy Speed (C-SPD):** How fast the entire convoy can travel together
- **Convoy Fuel Consumption (C-FC):** Total fuel usage per 100 km of travel
- **Convoy Cargo Capacity (C-CC):** Combined transport capability of all vehicles
- **Convoy Maneuverability (C-MAN):** Overall handling capability in difficult situations
- **Convoy Durability (C-DUR):** Combined hit points and damage resistance
- **Convoy Power Rating (C-PWR):** Maximum available power for heavy work tasks
- **Convoy Maintenance Cost (C-MC):** Monthly upkeep requirements for the entire fleet

## Document Index

1. **[Core Calculation Formulas](#core-calculation-formulas)** - Mathematical framework for all convoy statistics
2. **[Convoy Size Modifiers](#convoy-size-modifiers)** - Adjustments based on fleet size
3. **[Vehicle Role Classifications](#vehicle-role-classifications)** - How different vehicle types affect calculations
4. **[Worked Examples](#worked-examples)** - Complete convoy calculation walkthroughs
5. **[Advanced Calculations](#advanced-calculations)** - Vehicle synergies and special interactions
6. **[Quick Calculation Method](#quick-calculation-method)** - Simplified process for fast gameplay

## Core Calculation Formulas

### 1. Convoy Speed (C-SPD)
**Formula:** `MIN(all vehicle SPD) × 10 × Convoy Size Modifier × Terrain Modifier`

**Principle:** The convoy moves at the speed of its slowest member (converted to km/h), with penalties for coordination overhead and terrain conditions.

**Convoy Size Modifiers:**
- 1 vehicle: ×1.0 (no penalty)
- 2-3 vehicles: ×0.95 (minor coordination)
- 4-6 vehicles: ×0.90 (moderate coordination)
- 7-10 vehicles: ×0.85 (significant coordination)
- 11+ vehicles: ×0.80 (major coordination overhead)

**Example:** Convoy with vehicles SPD 12, 8, 15, 6 (4 vehicles) on country roads
- Base Speed: MIN(12, 8, 15, 6) × 10 = 60 km/h
- Size Modifier: ×0.90 (4 vehicles) = 54 km/h
- Terrain Modifier: ×0.85 (country roads) = 45.9 km/h
- **Convoy Speed: 46 km/h**

### 2. Convoy Fuel Consumption (C-FC)
**Formula:** `SUM(all vehicle FC) × Efficiency Modifiers`

**Principle:** Total fuel consumption with potential efficiency bonuses from specialized vehicles.

**Base Calculation:** Simply add all individual vehicle fuel consumption values.

**Efficiency Modifiers:**
- No efficiency vehicles: ×1.0
- Scout vehicle present: ×0.95 (route optimization)
- Bio-diesel processor: ×0.85-0.70 (depends on capacity)
- Multiple efficiency vehicles: Stack multiplicatively

**Example:** Vehicles with FC 6, 24, 18, 2
- Base Consumption: 6 + 24 + 18 + 2 = 50
- Scout bonus: ×0.95
- **Convoy FC: 50 × 0.95 = 47.5 ≈ 48**

### 3. Convoy Cargo Capacity (C-CC)
**Formula:** `SUM(all vehicle CC)`

**Principle:** Simple addition of all individual cargo capacities.

**Special Considerations:**
- Vehicles carrying other vehicles reduce available cargo
- Fuel tankers extend range but may reserve capacity for fuel
- Specialized cargo (medical supplies, parts) may be tracked separately

**Example:** Vehicles with CC 4, 20, 8, 1
- **Convoy CC: 4 + 20 + 8 + 1 = 33**

### 4. Convoy Maneuverability (C-MAN)
**Formula:** `WEIGHTED_AVERAGE(all vehicle MAN, by role importance) × Size Penalty`

**Vehicle Role Weights:**
- **Lead Vehicle:** ×3 (most important for convoy navigation)
- **Combat Vehicles:** ×2 (important for tactical movement)
- **Support Vehicles:** ×1 (standard weight)
- **Cargo Vehicles:** ×0.5 (less important for maneuverability)

**Size Penalties:**
- 1 vehicle: ×1.0
- 2-3 vehicles: ×0.95
- 4-6 vehicles: ×0.90
- 7-10 vehicles: ×0.85
- 11+ vehicles: ×0.80

**Example:** Lead vehicle MAN 12, Combat vehicle MAN 10, Cargo truck MAN 3, Support van MAN 6
- Weighted Average: (12×3 + 10×2 + 3×0.5 + 6×1) ÷ (3+2+0.5+1) = (36+20+1.5+6) ÷ 6.5 = 63.5 ÷ 6.5 = 9.77
- Size Penalty: ×0.90 (4 vehicles)
- **Convoy MAN: 9.77 × 0.90 = 8.79 ≈ 9**

### 5. Convoy Durability (C-DUR)
**Formula:** `SUM(all vehicle DUR)`

**Principle:** Combined hit points representing total convoy survivability.

**Damage Distribution:** When convoy takes damage, distribute among vehicles based on:
- Exposed position (lead vehicles take more damage)
- Vehicle size (larger vehicles attract more fire)
- Armor levels (heavily armored vehicles may absorb hits for others)

**Example:** Vehicles with DUR 40, 70, 180, 20
- **Convoy DUR: 40 + 70 + 180 + 20 = 310**

### 6. Convoy Power Rating (C-PWR)
**Formula:** `MAX(all vehicle PWR) + (SUM(remaining PWR) × 0.5)`

**Principle:** Primary vehicle provides full power, additional vehicles provide supporting power at reduced efficiency.

**Application:** Used for obstacle removal, construction work, towing operations where multiple vehicles can assist.

**Example:** Vehicles with PWR 3, 8, 6, 1
- Primary Power: MAX(3, 8, 6, 1) = 8
- Supporting Power: (3 + 6 + 1) × 0.5 = 5
- **Convoy PWR: 8 + 5 = 13**

### 7. Convoy Maintenance Cost (C-MC)
**Formula:** `SUM(all vehicle MC) × Efficiency Modifier`

**Efficiency Modifiers:**
- No workshop vehicle: ×1.0
- Mobile workshop present: ×0.85
- Multiple mechanics/specialists: ×0.80
- Parts sharing between similar vehicles: ×0.95

**Example:** Vehicles with MC 2, 5, 7, 2, with mobile workshop
- Base Cost: 2 + 5 + 7 + 2 = 16
- Workshop bonus: ×0.85
- **Convoy MC: 16 × 0.85 = 13.6 ≈ 14**

## Convoy Size Modifiers

### Small Convoys (1-3 vehicles)
- **Advantages:** High maneuverability, simple coordination, fuel efficient
- **Disadvantages:** Limited cargo, vulnerable to single-point failures
- **Modifiers:** Minimal penalties, maximum flexibility

### Medium Convoys (4-6 vehicles)
- **Advantages:** Balanced capabilities, good specialization options
- **Disadvantages:** Moderate coordination overhead
- **Modifiers:** Small penalties across most statistics

### Large Convoys (7-10 vehicles)
- **Advantages:** High cargo capacity, redundancy, specialization
- **Disadvantages:** Coordination challenges, fuel consumption, visibility
- **Modifiers:** Significant penalties to speed and maneuverability

### Massive Convoys (11+ vehicles)
- **Advantages:** Maximum cargo and capability
- **Disadvantages:** Major coordination overhead, logistical complexity
- **Modifiers:** Heavy penalties, requires dedicated leadership

## Vehicle Role Classifications

### Lead Vehicle
**Requirements:** High MAN, good SPD, reliable
**Role Weight:** ×3 for maneuverability calculations
**Examples:** Scout cars, light military vehicles, reliable SUVs

### Combat Vehicles
**Requirements:** High DUR, weapons capability, tactical mobility
**Role Weight:** ×2 for maneuverability calculations
**Examples:** Military vehicles, armored cars, armed pickups

### Cargo Vehicles
**Requirements:** High CC, reasonable reliability
**Role Weight:** ×0.5 for maneuverability calculations
**Examples:** Semi-trucks, cargo vans, fuel tankers

### Support Vehicles
**Requirements:** Specialized capabilities (medical, workshop, communications)
**Role Weight:** ×1 for maneuverability calculations
**Examples:** Mobile workshops, medical vehicles, command posts

### Specialty Vehicles
**Requirements:** Unique capabilities (construction, agriculture, recovery)
**Role Weight:** Varies by function and mobility
**Examples:** Bulldozers, cranes, recovery vehicles

## Worked Examples

### Example 1: Small Recon Convoy

**Vehicles:**
- Lead: Honda Civic (SPD 12, FC 4, CC 4, MAN 12, DUR 40, PWR 3, MC 2)
- Support: Jeep Wrangler (SPD 10, FC 16, CC 8, MAN 11, DUR 60, PWR 6, MC 3)

**Calculations:**
- **C-SPD:** MIN(12, 10) × 10 × 0.95 = 10 × 10 × 0.95 = **95 km/h** (highway conditions)
- **C-FC:** (4 + 16) × 0.95 (scout bonus) = 20 × 0.95 = **19**
- **C-CC:** 4 + 8 = **12**
- **C-MAN:** ((12×3) + (11×2)) ÷ (3+2) × 0.95 = (36+22) ÷ 5 × 0.95 = 11.6 × 0.95 = **11**
- **C-DUR:** 40 + 60 = **100**
- **C-PWR:** 6 + (3 × 0.5) = 6 + 1.5 = **8** (rounded)
- **C-MC:** (2 + 3) × 1.0 = **5**

**Convoy Profile:** Fast, maneuverable reconnaissance unit with moderate capabilities.

**Operational Summary:** This nimble two-vehicle reconnaissance convoy excels at rapid movement, achieving 95 km/h on highways or 66 km/h on country roads (×0.85 terrain modifier). Operating 8 hours per day with 85% operational efficiency, it can cover 435 km daily on good roads. Over a sustainable schedule of 20 travel days per month, the convoy could theoretically travel 8,700 km, but fuel becomes the limiting factor. With monthly fuel consumption of 380 units providing approximately 2,000 km of range (100 km per 19 FC), practical monthly operations cover 1,800-2,000 km while requiring only 5 hours of maintenance work. The convoy's 12 cargo units provide space for essential supplies and equipment for extended scouting missions. With 100 combined durability points, it can absorb moderate damage while its power rating of 8 allows for basic obstacle clearing - perfect for opening blocked routes or minor construction tasks. The Honda Civic's fuel efficiency keeps operational costs low while the Jeep Wrangler provides off-road capability and backup power, making this an ideal combination for rapid reconnaissance and route-finding missions.

### Example 2: Balanced Mixed Convoy

**Vehicles:**
- Lead: HMMWV (SPD 7, FC 30, CC 6, MAN 12, DUR 135, PWR 3, MC 6)
- Combat: M113 APC (SPD 4, FC 20, CC 12, MAN 6, DUR 270, PWR 4, MC 6)
- Cargo: Semi-truck (SPD 9, FC 36, CC 60, MAN 1, DUR 120, PWR 10, MC 7)
- Support: Mobile Workshop (SPD 8, FC 12, CC 25, MAN 6, DUR 90, PWR 4, MC 2)

**Calculations:**
- **C-SPD:** MIN(7, 4, 9, 8) × 10 × 0.90 = 4 × 10 × 0.90 = **36 km/h** (highway, limited by APC)
- **C-FC:** (30 + 20 + 36 + 12) × 0.85 (workshop efficiency) = 98 × 0.85 = **83**
- **C-CC:** 6 + 12 + 60 + 25 = **103**
- **C-MAN:** ((12×3) + (6×2) + (1×0.5) + (6×1)) ÷ (3+2+0.5+1) × 0.90 = (36+12+0.5+6) ÷ 6.5 × 0.90 = 8.38 × 0.90 = **8**
- **C-DUR:** 135 + 270 + 120 + 90 = **615**
- **C-PWR:** 10 + ((3 + 4 + 4) × 0.5) = 10 + 5.5 = **16** (rounded)
- **C-MC:** (6 + 6 + 7 + 2) × 0.85 (workshop bonus) = 21 × 0.85 = **18**

**Convoy Profile:** Heavy-duty convoy with excellent cargo capacity and durability, but limited by APC speed.

**Operational Summary:** This robust four-vehicle convoy operates as a mobile fortress, traveling at 36 km/h on highways (25 km/h on country roads) dictated by the M113 APC's tactical limitations. Operating 8 hours per day with 85% efficiency, it covers 245 km daily on good roads. Following a disciplined military schedule of 20 operational days monthly, the convoy could theoretically travel 4,900 km, but fuel logistics become the primary constraint. With monthly fuel consumption of 1,660 units providing approximately 2,000 km of range (100 km per 83 FC), practical operations cover 1,800-2,000 km monthly while the mobile workshop reduces maintenance overhead. The convoy requires 18 hours of monthly maintenance but benefits from on-site repair capabilities. With an impressive 103 cargo units, it can transport substantial supplies, equipment, or personnel - equivalent to over 100 people with gear or 20,000 kg of materials. The convoy's 615 durability points make it nearly indestructible against small arms, while its power rating of 16 enables significant construction work, vehicle recovery, and obstacle removal operations. The HMMWV provides tactical reconnaissance, the APC offers armored transport, the semi-truck handles heavy cargo, and the workshop ensures field maintenance capability - creating a self-sufficient mobile base perfect for extended operations in hostile territory.

### Example 3: Large Logistics Convoy

**Vehicles:**
- Lead: Ford F-350 (SPD 9, FC 24, CC 20, MAN 9, DUR 70, PWR 8, MC 5)
- Scout: Motorcycle (SPD 13, FC 2, CC 1, MAN 14, DUR 20, PWR 1, MC 2)
- Cargo 1: Kenworth Semi (SPD 9, FC 36, CC 60, MAN 1, DUR 120, PWR 10, MC 7)
- Cargo 2: Fuel Tanker (SPD 8, FC 30, CC 80, MAN 2, DUR 110, PWR 9, MC 6)
- Support 1: Mercedes Sprinter (SPD 10, FC 12, CC 25, MAN 6, DUR 90, PWR 4, MC 2)
- Support 2: Mobile Workshop (SPD 6, FC 18, CC 15, MAN 5, DUR 100, PWR 5, MC 3)
- Security: Challenger Tank (SPD 16, FC 24, CC 2, MAN 8, DUR 50, PWR 14, MC 8)

**Calculations:**
- **C-SPD:** MIN(9,13,9,8,10,6,16) × 10 × 0.85 = 6 × 10 × 0.85 = **51 km/h** (highway, limited by workshop)
- **C-FC:** SUM(all FC) × 0.95 (scout) × 0.85 (workshop) = 146 × 0.95 × 0.85 = **118**
- **C-CC:** SUM(all CC) = 20+1+60+80+25+15+2 = **203**
- **C-MAN:** Weighted average × 0.85 = Complex calculation ≈ **6**
- **C-DUR:** SUM(all DUR) = 70+20+120+110+90+100+50 = **560**
- **C-PWR:** MAX(PWR) + SUM(others)×0.5 = 14 + (8+1+10+9+4+5)×0.5 = 14 + 18.5 = **33** (rounded)
- **C-MC:** SUM(all MC) × 0.85 (workshop) = 33 × 0.85 = **28**

**Convoy Profile:** Massive logistics operation with enormous cargo capacity but very slow movement.

**Operational Summary:** This seven-vehicle logistics juggernaut represents the ultimate in cargo transportation capability, traveling at 51 km/h on highways (35 km/h on country roads) limited by the mobile workshop's maximum speed. Operating 8 hours per day with 85% efficiency, it covers 347 km daily on good roads. Following a strict operational cycle of 20 operational days monthly, the convoy could theoretically travel 6,940 km, but fuel logistics create the primary constraint. With monthly fuel consumption of 2,360 units providing approximately 2,000 km of range (100 km per 118 FC), practical operations are limited to 1,800-2,000 km monthly. The rest days are essential for the complex logistics coordination required by such a massive operation. The convoy demands 28 hours of monthly maintenance work but benefits from workshop efficiency and parts sharing. Its colossal 203 cargo units can transport entire settlements' worth of supplies - equivalent to 200+ people with equipment, 40,000 kg of materials, or 38,000 liters of fuel reserves. The convoy's 560 durability points provide excellent survivability through redundancy, while its exceptional power rating of 33 enables major construction projects, clearing significant obstacles, or simultaneously operating multiple heavy machinery tasks. The motorcycle scout optimizes routes and provides advance warning, the F-350 leads with tactical flexibility, the semi-trucks handle bulk cargo, the fuel tanker extends operational range, the Sprinter provides mobile command capability, the workshop ensures field repairs, and the Challenger tank delivers overwhelming firepower - creating a mobile city capable of establishing or relocating entire communities across hostile wastelands.

## Advanced Calculations

### Vehicle Synergies

#### Bio-Diesel Production Chain
**Components:** Agricultural vehicle + Bio-diesel processor + Hydroponic unit
**Effect:** Fuel consumption reduction scales with feedstock production
- Base processor: -15% fuel consumption
- With agricultural vehicle: -25% fuel consumption  
- With hydroponic enhancement: -30% fuel consumption

#### Combat Formation Bonuses
**Components:** Multiple combat vehicles in coordinated formation
**Effect:** Defensive bonuses and tactical movement improvements
- 2 combat vehicles: +10% convoy durability in combat
- 3+ combat vehicles: +20% convoy durability, +1 convoy maneuverability

#### Maintenance Network
**Components:** Workshop vehicle + Spare parts storage + Skilled mechanics
**Effect:** Reduced maintenance costs and improved reliability
- Workshop alone: -15% maintenance cost
- With dedicated parts vehicle: -25% maintenance cost
- With trained mechanic NPCs: -30% maintenance cost

### Environmental Modifiers

#### Terrain Effects on Speed
- **Highway:** ×1.0 (base speed)
- **Country Roads:** ×0.85
- **Off-Road:** ×0.70
- **Difficult Terrain:** ×0.50
- **Extreme Conditions:** ×0.30

#### Weather Impact on Fuel Consumption
- **Clear Weather:** ×1.0 (base consumption)
- **Rain/Snow:** ×1.15
- **Severe Weather:** ×1.30
- **Extreme Conditions:** ×1.50

## Quick Calculation Method

For rapid gameplay, use this simplified process:

### Step 1: Determine Convoy Speed
- Find slowest vehicle SPD, multiply by 10 for km/h
- Apply size penalty: 1-3 vehicles (×1.0), 4-6 (×0.9), 7+ (×0.8)
- Apply terrain modifier as needed (highway ×1.0, country ×0.85, off-road ×0.7)

### Step 2: Calculate Fuel Consumption  
- Add all vehicle FC values
- Apply -5% if scout present, -15% if workshop present

### Step 3: Sum Cargo and Durability
- **Cargo:** Simple addition of all CC values
- **Durability:** Simple addition of all DUR values

### Step 4: Estimate Maneuverability
- Use lead vehicle MAN as base
- Subtract 1 for every 3 additional vehicles

### Step 5: Determine Power and Maintenance
- **Power:** Use highest PWR vehicle + 2 per additional vehicle
- **Maintenance:** Add all MC values, subtract 3 if workshop present


