# Vehicle Damage and Repair System
## Combat, Maintenance, and Field Repairs

### Introduction

This document expands the Convoy Management System to handle vehicle combat damage, degradation, and repair mechanics. The system maintains simplicity while providing tactical depth for vehicle-based encounters and long-term maintenance challenges.

## Damage System Quick Reference

Vehicle condition directly affects performance and reliability:

- **Pristine (100% DUR):** Full performance, no penalties
- **Damaged (99-50% DUR):** Minor performance penalties  
- **Heavily Damaged (49-25% DUR):** Significant performance penalties
- **Critical (24-1% DUR):** Severe penalties, critical failure checks required
- **Destroyed (0% DUR):** Vehicle inoperable, requires major reconstruction

## Document Index

1. **[Vehicle Condition States](#vehicle-condition-states)** - Performance effects of damage levels
2. **[Damage Types and Resistances](#damage-types-and-resistances)** - How different attacks affect vehicles
3. **[Critical Damage System](#critical-damage-system)** - Failure checks and consequences
4. **[Repair Mechanics](#repair-mechanics)** - Parts costs and time requirements
5. **[Combat Examples](#combat-examples)** - Spell damage and survival calculations
6. **[Field Repair Rules](#field-repair-rules)** - Emergency maintenance and jury-rigging

## Vehicle Condition States

### Pristine Condition (100% DUR)
**Performance:** No penalties to any statistics
**Special:** Vehicle operates at peak efficiency
**Maintenance:** Standard monthly MC requirements

### Damaged Condition (99-50% DUR) - Vehicle Exhaustion Level 1
**Performance Effects:**
- **Disadvantage on Power Rating checks** (towing, obstacle removal, heavy work)
- **Fuel Consumption:** +1 to FC (engine inefficiency)

**Special Rules:**
- No critical failure checks required
- Standard repair procedures apply
- Vehicle remains fully operational for travel

### Heavily Damaged Condition (49-25% DUR) - Vehicle Exhaustion Level 2-3
**Performance Effects:**
- **Speed halved** (convoy coordination suffers)
- **Disadvantage on Power Rating checks**
- **Disadvantage on Maneuverability checks** (difficult terrain, evasion)
- **Fuel Consumption:** +2 to FC (major inefficiency)
- **Maintenance:** Double monthly MC requirements

**Special Rules:**
- Risk of minor breakdowns during extended travel
- Repair costs increased by 50%
- May require specialized parts for some repairs

### Critical Condition (24-1% DUR) - Vehicle Exhaustion Level 4-5
**Performance Effects:**
- **Speed reduced to 0** (vehicle cannot move under its own power)
- **All ability checks made with disadvantage**
- **Fuel Consumption:** +3 to FC (when operational)
- **Maintenance:** Triple monthly MC requirements

**Critical Failure Checks:**
- **Required when vehicle takes any damage**
- **System Reliability Check** (1d20 + Reliability Modifier vs. DC 10 + damage taken)
- **Failure:** Roll on Critical Failure Table
- **Success:** Vehicle continues operating despite damage

**Special Rules:**
- Vehicle requires towing or magical assistance to move
- Cannot perform any Power Rating tasks
- Repair costs tripled
- Critical system failures likely

**Towing Rules:**
- **Towing Vehicle Requirements:** PWR rating ≥ 2× the disabled vehicle's weight category
- **Convoy Speed:** Reduced to half of towing vehicle's speed
- **Fuel Consumption:** Towing vehicle FC increases by +50%

## Damage Types and Resistances

### Base Vehicle Resistances
All vehicles have inherent resistance or immunity to different damage types based on construction, following D&D 5e mechanics:

#### Standard Civilian Vehicles
- **Bludgeoning:** Resistance (half damage from impacts, crashes)
- **Piercing:** No resistance (bullets, spears penetrate sheet metal)
- **Slashing:** No resistance (blades can cut through panels)
- **Fire:** No resistance (standard materials)
- **Thunder:** Resistance (enclosed cabin dampens sonic attacks)
- **Cold:** No resistance (standard insulation)
- **Acid:** No resistance (metal construction)
- **Lightning:** No resistance (electrical systems vulnerable)

#### Military Vehicles  
- **Bludgeoning:** Resistance (armor plating absorbs impacts)
- **Piercing:** Resistance (ballistic protection)
- **Slashing:** Resistance (hardened steel construction)
- **Fire:** Resistance (fire suppression systems)
- **Thunder:** Resistance (reinforced structure)
- **Cold:** Resistance (environmental control systems)
- **Acid:** No resistance (protective coatings limited)
- **Lightning:** Resistance (shielded electrical systems)

#### Heavy Industrial Vehicles
- **Bludgeoning:** Resistance (heavy construction)
- **Piercing:** No resistance (thick but not hardened steel)
- **Slashing:** Resistance (reinforced components)
- **Fire:** No resistance (industrial materials)
- **Thunder:** Resistance (solid construction)
- **Cold:** No resistance (basic protection)
- **Acid:** No resistance (exposed metal components)
- **Lightning:** No resistance (large electrical systems)

### Damage Calculation
**D&D 5e Standard Rules:**
- **Resistance:** Take half damage (rounded down)
- **Vulnerability:** Take double damage
- **Immunity:** Take no damage
- **No Resistance:** Take full damage

**Examples:**
- **Fireball (28 fire damage) vs. Honda Civic (No Fire Resistance):** 28 damage
- **Fireball (28 fire damage) vs. M1A1 Abrams (Fire Resistance):** 28 ÷ 2 = 14 damage
- **Sword attack (8 slashing) vs. Military Vehicle (Slashing Resistance):** 8 ÷ 2 = 4 damage

## Critical Damage System

### When Critical Checks Are Required
- Vehicle takes damage ≥25% of maximum DUR in single attack (massive damage)
- Vehicle in Critical Condition (≤24% DUR) takes any damage
- Vehicle suffers catastrophic system failure (GM discretion)

### Critical Failure Check
**System Reliability Check:** 1d20 + Vehicle Reliability Modifier
**DC:** 10 + damage taken (or 15 for system failures)
**Success:** Vehicle continues operating despite damage
**Failure:** Roll on Critical Failure Table

**Vehicle Reliability Modifier:** Based on vehicle type and construction
- **Civilian Vehicles:** +0 (standard construction)
- **Military Vehicles:** +3 (reinforced systems, redundant components)
- **Industrial Vehicles:** +2 (heavy-duty construction)
- **Motorcycles:** -1 (simpler, more fragile systems)

**Driver Intervention:** If a skilled driver/operator is present, they may add their proficiency bonus to the reliability check (represents proper emergency procedures, system knowledge, etc.)

### Critical Failure Table (1d12)

| Roll | Result | Effect | Repair Requirements |
|------|--------|---------|-------------------|
| 1-2 | **Engine Damage** | -50% SPD, +100% FC until repaired | 2× MC in parts, 8 hours work |
| 3-4 | **Transmission Failure** | Cannot move until repaired | 3× MC in parts, 12 hours work |
| 5-6 | **Fuel System Breach** | Lose 10% fuel per hour, fire risk | 1× MC in parts, 4 hours work |
| 7-8 | **Electrical Failure** | No lights, communications, or electronics | 1× MC in parts, 6 hours work |
| 9-10 | **Suspension Damage** | -75% MAN, -25% SPD until repaired | 2× MC in parts, 10 hours work |
| 11-12 | **Catastrophic Failure** | Vehicle immobilized, choose 2 other results | 5× MC in parts, 24+ hours work |

### Specialized Part Requirements
Some critical failures require specific components:

- **Engine Parts:** Available at major settlements, cost 3× normal parts
- **Transmission Components:** Rare, may require salvaging from similar vehicles
- **Electronic Systems:** Very rare in post-apocalyptic settings, cost 5× normal parts
- **Specialized Military Parts:** Extremely rare, may require specific military sources

## Repair Mechanics

### Basic Repair Costs
**Formula:** `Damage Repaired × (MC ÷ 10) = Parts Required`

**Examples:**
- Honda Civic (MC 2): 10 damage = 10 × (2 ÷ 10) = 2 cargo units of parts
- M1A1 Abrams (MC 15): 50 damage = 50 × (15 ÷ 10) = 75 cargo units of parts

### Repair Time Requirements
**Formula:** `Damage Repaired × (MC ÷ 20) = Hours Required`

**Examples:**
- Honda Civic: 10 damage = 10 × (2 ÷ 20) = 1 hour
- M1A1 Abrams: 50 damage = 50 × (15 ÷ 20) = 37.5 ≈ 38 hours

### Repair Efficiency Modifiers

#### Workshop Bonuses
- **Mobile Workshop:** -25% parts cost, -25% time
- **Full Garage:** -40% parts cost, -40% time  
- **Specialized Military Shop:** -50% parts cost for military vehicles

#### Skill Modifiers
- **Trained Mechanic:** -20% time
- **Master Mechanic:** -30% time, -10% parts cost
- **Untrained Repair:** +50% time, +25% parts cost

#### Condition Penalties
- **Heavily Damaged Vehicle:** +25% parts cost, +25% time
- **Critical Condition Vehicle:** +50% parts cost, +50% time
- **Field Conditions:** +100% time (no proper tools)

### Emergency Field Repairs
**Temporary Fix:** Restore 25% of maximum DUR
- **Parts Cost:** 1× MC in parts
- **Time Required:** 2 hours
- **Duration:** 24 hours before degrading back
- **Limitation:** Can only be applied once per vehicle

**Jury-Rigging:** Bypass critical system failure
- **Parts Cost:** 0.5× MC in parts  
- **Time Required:** 1 hour
- **Effect:** Removes critical failure penalty but adds -25% to all performance
- **Duration:** Until proper repair completed

## Combat Examples

### Spell Damage Survivability

#### Fireball (8d6 damage, average 28)
**Honda Civic (40 DUR, No Fire Resistance, +0 Reliability):**
- Damage per hit: 28 damage (full damage)
- Hits to Damaged: 1 hit (30% remaining)
- Hits to Critical: 1 hit (30% remaining) 
- Hits to destroy: 2 hits (0% remaining)
- **Massive Damage Check:** DC 38 Reliability check (10 + 28) - very difficult to pass
- **Analysis:** Civilian vehicles take full fire damage but are still sturdy

**M1A1 Abrams (360 DUR, Fire Resistance, +3 Reliability):**
- Damage per hit: 28 ÷ 2 = 14 damage
- Hits to Damaged: 13 hits (180 DUR, 50% threshold)
- Hits to Critical: 19 hits (86 DUR, 24% threshold)
- Hits to destroy: 26 hits (0 DUR)
- **No massive damage checks** (14 < 90 damage threshold)

#### Lightning Bolt (8d6 damage, average 28)
**Semi-Truck (120 DUR, No Lightning Resistance, +0 Con):**
- Damage per hit: 28 damage (full)
- Hits to Damaged: 3 hits (60 DUR, 50% threshold)
- Hits to Critical: 4 hits (28 DUR, 24% threshold)  
- Hits to destroy: 5 hits (0 DUR)
- **No massive damage checks** (28 < 30 damage threshold)

#### Ballista Bolt (3d10 damage, average 16)  
**HMMWV (135 DUR, Piercing Resistance, +3 Reliability):**
- Damage per hit: 16 ÷ 2 = 8 damage
- Hits to Damaged: 9 hits (67 DUR, 50% threshold)
- Hits to Critical: 14 hits (32 DUR, 24% threshold)
- Hits to destroy: 17 hits (0 DUR)
- **No massive damage checks** (8 < 34 damage threshold)
- **Analysis:** Military armor very effective against physical attacks

### Environmental Hazards

#### Acid Rain (1d4 per hour exposure)
- Most vehicles have 0 acid resistance
- Gradual degradation over extended travel
- Mobile workshop can provide temporary protection

#### Extreme Cold (-20°C for 8+ hours)
- Vehicles with 0-1 cold resistance take 1d6 damage per day
- Military vehicles largely immune
- Affects fuel efficiency (+25% FC in extreme cold)

#### Sandstorm (1d3 damage per hour, ignores resistance)
- Affects all vehicles equally
- Damages electronics and moving parts
- Reduces visibility and maneuverability during storm

## Field Repair Rules

### Scavenging Parts
**Abandoned Vehicles:** Roll 1d6
- 1-2: No usable parts (too damaged)
- 3-4: 0.1 cargo units of parts
- 5: 0.2 cargo units of parts  
- 6: 0.3 cargo units of parts

**Similar Vehicle Types:** +2 to scavenging roll
**Military Vehicles:** Require specialized knowledge (Mechanics skill)

### Improvised Repairs
**Duct Tape Fix:** Temporary +5 DUR, lasts 4 hours
**Welding Patch:** Permanent repair, requires welding equipment and 2 hours
**Cannibalization:** Transfer parts between similar vehicles

### Workshop Vehicle Benefits
- **Repair Efficiency:** -25% time and parts cost
- **Critical Repair Capability:** Can attempt repairs normally impossible in field
- **Parts Storage:** Dedicated cargo space for repair supplies
- **Tool Access:** Proper equipment for complex repairs

## Magical Repair Options

### Construct Healing Spells
Vehicles are treated as constructs for magical healing purposes, making certain spells highly valuable for convoy operations.

#### Cure Wounds (and variants)
- **Cure Wounds (1st level):** Restores 1d8+modifier DUR
- **Cure Wounds (2nd level):** Restores 2d8+modifier DUR  
- **Cure Wounds (3rd level):** Restores 3d8+modifier DUR
- **Cure Wounds (4th level):** Restores 4d8+modifier DUR
- **Mass Cure Wounds (5th level):** Restores 3d8+modifier DUR to up to 6 vehicles

**Advantages:**
- No parts cost required
- Instant effect (1 action)
- Can be used during combat
- Scales with spell level and caster ability

**Limitations:**
- Cannot restore vehicles from 0 DUR (destroyed state)
- Does not repair critical system failures
- Requires spell slots (limited daily use)
- May not be available in all campaigns

#### Heal (6th level)
- **Effect:** Restores 70 DUR instantly
- **Special:** Can bring vehicle from Critical to near-full condition in one casting
- **Cost:** High-level spell slot

#### Regenerate (7th level)
- **Effect:** Restores 4d8+15 DUR initially, then 1 DUR per minute for 1 hour
- **Total:** Average 73 DUR over 1 hour
- **Special:** Continues healing even during travel

### Mending Cantrip Applications

The **Mending** cantrip provides significant efficiency bonuses for convoy maintenance operations.

#### Mending-Enhanced Repairs
**Requirements:** Mechanic with Mending cantrip knowledge
**Effect:** All repair operations (damage repair, maintenance, critical failures) have:
- **Time Required:** Halved
- **Parts Required:** Halved

**Examples:**
- Honda Civic needing 2 cargo units and 4 hours for repair
  - **With Mending:** 1 cargo unit and 2 hours
- M1A1 Abrams needing 7.5 cargo units and 15 hours for repair  
  - **With Mending:** 3.75 cargo units and 7.5 hours

#### Applications
- **Damage Repair:** Any DUR restoration work
- **Monthly Maintenance:** Routine upkeep operations
- **Critical System Repair:** Emergency system failures
- **Preventive Maintenance:** Deep maintenance and overhauls

#### Limitations
- **Requires skilled mechanic** who knows the Mending cantrip
- **Cannot repair destroyed vehicles** (0 DUR)
- **No effect on magical healing** (spells work independently)
- **One mechanic per repair job** (benefits don't stack)

### Magical Repair Examples

#### Example 1: Emergency Combat Healing
**Situation:** Honda Civic at 8 DUR (20%, Critical condition) after combat
**Options:**
- **Cure Wounds (2nd level):** 2d8+3 healing = 12 average → 20 DUR (50%, Damaged condition)
- **Conventional Repair:** 32 DUR × (2÷10) = 6.4 cargo units of parts, 3.2 hours

**Analysis:** Magic provides instant battlefield repair without consuming precious parts.

#### Example 2: Efficient Workshop Repair
**Situation:** Semi-truck needs 40 DUR repair (4 cargo units of parts, 8 hours normally)
**Repair Options:**
- **Workshop Only:** 4 × 0.75 = 3 cargo units, 8 × 0.75 = 6 hours
- **Mending Only:** 4 × 0.5 = 2 cargo units, 8 × 0.5 = 4 hours
- **Workshop + Mending:** 4 × 0.75 × 0.5 = 1.5 cargo units, 8 × 0.75 × 0.5 = 3 hours

**Analysis:** Mending + workshop creates maximum efficiency for major repairs.

#### Example 3: Critical System Repair
**Situation:** HMMWV suffers Engine Damage (requires 12 cargo units, 8 hours)
**Repair Options:**
- **Conventional:** 12 cargo units, 8 hours
- **With Mending:** 6 cargo units, 4 hours
- **Magical Healing:** Cannot repair critical system failures directly

**Analysis:** Mending provides massive savings for critical repairs when parts are scarce.

### Spell Slot Economics

#### Daily Repair Capacity (Example 5th level Cleric)
**Spell Slots Available:**
- 1st level: 4 slots = 4d8+12 DUR potential (average 30 DUR)
- 2nd level: 3 slots = 6d8+9 DUR potential (average 36 DUR)  
- 3rd level: 2 slots = 6d8+6 DUR potential (average 33 DUR)
- **Total:** ~99 DUR restoration per day without parts

**Strategic Considerations:**
- **Combat Healing:** Reserve 1-2 spell slots for emergency repairs
- **Daily Maintenance:** Use remaining slots to reduce parts consumption
- **Spell Slot Recovery:** Long rest required to refresh magical repair capacity

#### Cost-Benefit Analysis
**Magical Repair Advantages:**
- No parts consumption
- Instant effect
- Can exceed normal repair limits
- Works in any environment

**Magical Repair Limitations:**
- Limited daily uses (spell slots)
- Cannot resurrect destroyed vehicles (0 DUR)
- Doesn't address critical system failures completely
- Requires magical caster in convoy

### Integration with Convoy Operations

#### Caster Vehicle Roles
**Combat Medic:** Dedicated healing caster for vehicle repairs
- **Primary Role:** Emergency combat healing
- **Secondary Role:** Daily maintenance spell support
- **Equipment:** Mobile shrine/workshop for magical focus

**Utility Caster:** Multi-role spellcaster with repair capabilities  
- **Mending Specialist:** Focuses on parts conservation
- **Ritual Casting:** Extended magical maintenance sessions
- **Scroll Usage:** Emergency magical repairs when spell slots exhausted

#### Magical Repair Priority System
1. **Emergency Combat:** Restore Critical vehicles to operational status
2. **System Failures:** Use enhanced Mending for critical component repairs  
3. **Daily Maintenance:** Apply remaining spell slots to reduce parts consumption
4. **Preventive Care:** Use Mending during routine maintenance to extend vehicle life

## Maintenance and Degradation

### Natural Wear
Vehicles lose 1 DUR per month of normal operation (already factored into monthly maintenance costs). Skipping maintenance accelerates degradation:

- **Skip 1 month:** Lose 3 DUR
- **Skip 2 months:** Lose 6 DUR  
- **Skip 3+ months:** Lose 10 DUR per month

### Harsh Conditions
- **Desert/Sandstorm:** +1 DUR loss per week
- **Swamp/High Humidity:** +1 DUR loss per week
- **Arctic Conditions:** +2 DUR loss per week
- **Combat Operations:** +1 DUR loss per engagement

### Preventive Maintenance
**Deep Maintenance (Quarterly):**
- **Cost:** 2× monthly MC in parts
- **Time:** 16 hours work
- **Benefit:** Restore 5 DUR, reset wear accumulation

## Integration with Convoy Operations

### Damaged Vehicle Effects on Convoy
- **Speed:** Convoy limited by most damaged vehicle
- **Fuel Efficiency:** Damaged vehicles increase total convoy FC
- **Reliability:** Critical condition vehicles may break down during travel
- **Maintenance Load:** Heavily damaged vehicles require more frequent stops

### Triage Decisions
- **Abandon Vehicle:** Salvage parts, redistribute cargo
- **Emergency Repair:** Minimum fix to reach safe location
- **Full Restoration:** Invest time and resources for complete repair
- **Cannibalization:** Sacrifice one vehicle to repair another

### Combat Formations
- **Armored Vehicles Forward:** Absorb damage for vulnerable cargo vehicles
- **Redundant Systems:** Multiple vehicles with similar capabilities
- **Repair Priorities:** Focus resources on mission-critical vehicles


