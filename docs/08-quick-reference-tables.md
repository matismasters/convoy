# Quick Reference Tables and Calculators
## Game-Ready Lookup Charts and Simplified Calculation Methods

### Introduction

This document consolidates all Convoy Management System rules into quick-reference tables, lookup charts, and simplified calculators for easy use during gameplay. These references eliminate the need to flip through multiple documents during play while maintaining system accuracy.

## Document Index

1. **[Vehicle Creation Quick Tables](#vehicle-creation-quick-tables)** - Fast vehicle stat generation
2. **[Convoy Calculation Worksheets](#convoy-calculation-worksheets)** - Step-by-step convoy building
3. **[Combat and Damage References](#combat-and-damage-references)** - Damage types, conditions, and repairs
4. **[Environmental Modifiers Chart](#environmental-modifiers-chart)** - Terrain and weather effects
5. **[Modification Quick Guide](#modification-quick-guide)** - Upgrade options and costs
6. **[Synergy Combinations Chart](#synergy-combinations-chart)** - Vehicle interaction bonuses

## Vehicle Creation Quick Tables

### Speed Rating Quick Reference
| Top Speed (km/h) | SPD | Sustainable Speed |
|------------------|-----|-------------------|
| 40-55 | 3 | 30 km/h |
| 56-71 | 4 | 40 km/h |
| 72-87 | 5 | 50 km/h |
| 88-103 | 6 | 60 km/h |
| 104-119 | 7 | 70 km/h |
| 120-135 | 8 | 80 km/h |
| 136-151 | 9 | 90 km/h |
| 152-167 | 10 | 100 km/h |
| 168-183 | 11 | 110 km/h |
| 184-199 | 12 | 120 km/h |
| 200+ | 13+ | 130+ km/h |

### Fuel Consumption by Engine Type
| Engine Size | Displacement Modifier | 4-cyl | 6-cyl | 8-cyl |
|-------------|----------------------|-------|-------|-------|
| Small (< 2.0L) | ×1.0 | 4 | 6 | 8 |
| Medium (2.0-4.0L) | ×1.5 | 6 | 9 | 12 |
| Large (4.0-6.0L) | ×2.0 | 8 | 12 | 16 |
| Very Large (> 6.0L) | ×3.0 | 12 | 18 | 24 |

**Military Vehicle Penalty:** +25% to final FC

### Vehicle Type Base Statistics
| Vehicle Type | DUR Base | Complexity | Reliability Mod |
|--------------|----------|------------|-----------------|
| Motorcycle | 20 | ×1.0 | -1 |
| Car | 40 | ×1.5 | +0 |
| Truck/SUV | 60 | ×1.5 | +0 |
| Commercial | 80 | ×1.5 | +0 |
| Military | 120 | ×2.0-3.0 | +3 |
| Specialty | 80 | ×3.0 | +2 |

### Cargo Capacity by Category
| Category | Cargo Units | Examples |
|----------|-------------|----------|
| Personal | 1-2 | Motorcycles, sports cars |
| Light | 3-8 | Sedans, small SUVs |
| Medium | 9-20 | Pickup trucks, vans |
| Heavy | 21-50 | Box trucks, RVs |
| Industrial | 51+ | Semi-trailers, specialized haulers |

### Power Rating Quick Reference
| Horsepower | PWR | Capability |
|------------|-----|------------|
| 50-99 | 1-2 | Basic utility work |
| 100-199 | 2-4 | Light towing, obstacle pushing |
| 200-299 | 4-6 | Heavy towing, construction work |
| 300-499 | 6-10 | Major construction, vehicle recovery |
| 500-799 | 10-16 | Industrial work, major obstacles |
| 800+ | 16+ | Extreme heavy work, demolition |

## Convoy Calculation Worksheets

### Basic Convoy Calculator

#### Step 1: Convoy Speed
```
Slowest Vehicle SPD: ___
× 10 = ___ km/h base speed
× Size Modifier: ___ (1-3 vehicles: ×1.0, 4-6: ×0.9, 7+: ×0.8)
× Terrain Modifier: ___ (Highway: ×1.0, Country: ×0.85, Damaged: ×0.70)
× Weather Modifier: ___ (Clear: ×1.0, Light rain: ×0.95, Heavy: ×0.85)
= ___ km/h Convoy Speed
```

#### Step 2: Fuel Consumption
```
Vehicle 1 FC: ___    Vehicle 6 FC: ___
Vehicle 2 FC: ___    Vehicle 7 FC: ___
Vehicle 3 FC: ___    Vehicle 8 FC: ___
Vehicle 4 FC: ___    Vehicle 9 FC: ___
Vehicle 5 FC: ___    Vehicle 10 FC: ___

Total FC: ___
× Scout Bonus: ___ (×0.95 if scout present)
× Bio-fuel Bonus: ___ (×0.85-0.70 depending on setup)
× Workshop Bonus: ___ (×0.85 if workshop present)
= ___ Convoy FC per 100 km
```

#### Step 3: Cargo and Durability
```
Cargo Capacity: Sum all vehicle CC = ___
Durability: Sum all vehicle DUR = ___
```

#### Step 4: Maneuverability (Simplified)
```
Lead Vehicle MAN: ___
- Size Penalty: ___ (1 per 3 additional vehicles)
+ Terrain Bonus: ___ (+2 if 4WD/tracked majority)
= ___ Convoy Maneuverability
```

#### Step 5: Power and Maintenance
```
Highest Vehicle PWR: ___
+ Support Power: ___ (sum other PWR ÷ 2)
= ___ Convoy Power Rating

Total Vehicle MC: ___
× Workshop Bonus: ___ (×0.85 if present)
× Mending Bonus: ___ (×0.5 if mechanic has Mending)
= ___ Monthly Maintenance Cost
```

## Combat and Damage References

### Vehicle Condition Effects
| Condition | DUR % | Speed | Maneuverability | Power | Other Effects |
|-----------|-------|-------|-----------------|-------|---------------|
| Pristine | 100% | Normal | Normal | Normal | No penalties |
| Damaged | 99-50% | Normal | Disadvantage on PWR checks | Normal | +1 FC |
| Heavy | 49-25% | Halved | Disadvantage on MAN & PWR | Normal | +2 FC, 2× MC |
| Critical | 24-1% | 0 (must tow) | Disadvantage all checks | 0 | +3 FC, 3× MC |

### Damage Resistances by Vehicle Type
| Vehicle Type | Resistant To | Vulnerable To | Special |
|--------------|-------------|---------------|---------|
| Civilian | Bludgeoning, Thunder | None | Standard construction |
| Military | Bludg, Pierce, Slash, Fire, Thunder, Cold, Lightning | None | Combat protection |
| Industrial | Bludgeoning, Slashing, Thunder | None | Heavy construction |

### Critical Failure Table (1d12)
| Roll | System Failure | Effect | Parts Cost | Time |
|------|----------------|--------|------------|------|
| 1-2 | Engine Damage | -50% SPD until repaired | 2× MC | 8 hours |
| 3-4 | Transmission Failure | Cannot move | 3× MC | 12 hours |
| 5-6 | Fuel System Breach | -10% fuel/hour, fire risk | 1× MC | 4 hours |
| 7-8 | Electrical Failure | No electronics | 1× MC | 6 hours |
| 9-10 | Suspension Damage | -75% MAN, -25% SPD | 2× MC | 10 hours |
| 11-12 | Catastrophic | Vehicle immobilized | 5× MC | 24+ hours |

### Repair Cost Calculator
```
Damage to Repair: ___ DUR
× (Vehicle MC ÷ 10) = ___ Cargo Units Parts Needed
× (Vehicle MC ÷ 20) = ___ Hours Work Required

Modifiers:
× Workshop Bonus: ___ (×0.75 if present)
× Mending Bonus: ___ (×0.5 if mechanic has Mending)
× Condition Penalty: ___ (×1.5 if Critical, ×1.25 if Heavy)
```

## Environmental Modifiers Chart

### Terrain Speed Modifiers
| Terrain Type | Speed Modifier | Visibility | 4WD Bonus | Tracked Bonus |
|--------------|----------------|------------|-----------|---------------|
| Highway | ×1.0 | Clear | No bonus | No bonus |
| Country Roads | ×0.85 | Good | No bonus | No bonus |
| Damaged Roads | ×0.70 | Poor | +5% speed | +5% speed |
| Dirt/Gravel | ×0.60 | Dust/Limited | +10% speed | +10% speed |
| Off-Road | ×0.50 | Navigation challenges | +15% speed | +25% speed |
| Extreme | ×0.30 | Severe navigation | +20% speed | +40% speed |

### Weather Speed Modifiers
| Weather | Speed Modifier | Visibility | Special Effects |
|---------|----------------|------------|-----------------|
| Clear | ×1.0 | Unlimited | No penalties |
| Light Rain/Snow | ×0.95 | 500m | Higher following distance |
| Heavy Rain/Snow | ×0.85 | 200m | Risk of getting stuck |
| Severe Weather | ×0.70 | 50m | Hail: 1d4 dmg/hour |
| Extreme Weather | ×0.50 | 0m | Shelter required |

### Combined Modifier Examples
| Terrain + Weather | Final Speed | Navigation Difficulty |
|-------------------|-------------|----------------------|
| Highway + Clear | ×1.0 | Easy |
| Country + Light Rain | ×0.81 | Moderate |
| Damaged + Heavy Rain | ×0.60 | Difficult |
| Off-Road + Severe | ×0.35 | Very Difficult |
| Extreme + Extreme | ×0.15 | Nearly Impossible |

## Modification Quick Guide

### Combat Modifications Cost Table
| Modification | Slots | Effect | Parts Cost | Time | Trade-offs |
|--------------|-------|--------|------------|------|------------|
| Light MG Mount | 1 | 2d8+2 damage | 3 units | 12 hours | -1 CC, +1 MC |
| Heavy MG Mount | 2 | 2d12+4 damage | 6 units | 24 hours | -3 CC, +2 MC, -1 MAN |
| Basic Armor | 2 | +50% DUR, resistances | 5 units | 20 hours | ×0.85 SPD, -2 MAN |
| Military Armor | 3 | +75% DUR, resistances | 12 units | 48 hours | ×0.75 SPD, -3 MAN |
| Spiked Wheels | 1 | 1d6 melee damage | 2 units | 8 hours | -1 MAN, +1 MC |

### Performance Modifications Cost Table
| Modification | Slots | Effect | Parts Cost | Time | Trade-offs |
|--------------|-------|--------|------------|------|------------|
| Engine Tuning | 1 | +20% SPD, +1 PWR | 3 units | 16 hours | +30% FC, +25% MC |
| Turbocharger | 2 | +40% SPD, +3 PWR | 8 units | 32 hours | +50% FC, +50% MC |
| Racing Suspension | 1 | +3 MAN (roads), +10% SPD | 4 units | 12 hours | -1 MAN (off-road), +20% MC |
| AWD Conversion | 2 | +2 MAN, terrain bonuses | 10 units | 40 hours | ×0.95 SPD, +20% MC |

### Utility Modifications Cost Table
| Modification | Slots | Effect | Parts Cost | Time | Trade-offs |
|--------------|-------|--------|------------|------|------------|
| Cargo Expansion | 1 | +25% CC | 2 units | 8 hours | -1 MAN, ×0.95 SPD |
| Communication Suite | 1 | 50km range, +1 coordination | 4 units | 16 hours | +15% MC |
| Mobile Workshop | 3 | -25% convoy repair costs | 15 units | 60 hours | -6 CC, +2 MC |
| Medical Bay | 2 | Complete medical care | 8 units | 24 hours | -4 CC, +1 MC |

## Synergy Combinations Chart

### Production Chain Synergies
| Combination | Vehicles Required | Effect | Trade-offs |
|-------------|-------------------|--------|------------|
| Basic Bio-fuel | Processor vehicle | -15% convoy FC | 1 specialized vehicle |
| Enhanced Bio-fuel | Processor + Agricultural | -25% convoy FC | 2 specialized vehicles |
| Complete Bio-fuel | Processor + Agri + Hydroponic | -30% FC, +2 food/month | 3 specialized vehicles |
| Fuel Network | 2+ Fuel tankers | +100% operational range | 2+ cargo vehicles |

### Support Network Synergies
| Combination | Vehicles Required | Effect | Trade-offs |
|-------------|-------------------|--------|------------|
| Scout Network | Scout + Communication | -10% FC, +1 SPD | 2 vehicles, coordination overhead |
| Command Network | Command + 2+ Comm vehicles | +3 MAN, 100km coordination | 3+ vehicles, high complexity |
| Medical Network | Medical + Surgical vehicle | Complete healthcare | 2 vehicles, high specialization |
| Workshop Network | Workshop + Tools + Materials | Parts production capability | 3 vehicles, massive specialization |

### Combat Formation Synergies
| Combination | Vehicles Required | Effect | Trade-offs |
|-------------|-------------------|--------|------------|
| Escort Formation | 1 Combat vehicle | +1 defense rating | Combat vehicle priority target |
| Combat Group | 2+ Combat vehicles | +2 defense, +10% combat DUR | Multiple expensive vehicles |
| Armored Spearhead | 3+ Combat (1 heavy) | +3 defense, intimidation | Massive fuel and maintenance costs |

## Daily Operations Calculator

### Travel Distance Calculator
```
Convoy Speed: ___ km/h
× Hours per Day: ___ (typically 8)
× Operational Efficiency: ___ (typically 0.85)
× Days per Month: ___ (typically 20 with rest days)
= ___ km maximum monthly travel

Fuel-Limited Range:
Monthly Fuel Available: ___ units
÷ Convoy FC: ___ (per 100 km)
× 100 = ___ km fuel-limited range

Practical Monthly Range: ___ km (minimum of speed-limited vs. fuel-limited)
```

### Resource Consumption Calculator
```
Monthly Fuel Consumption:
Convoy FC: ___ per 100 km
× (Monthly Distance ÷ 100): ___
= ___ fuel units per month

Monthly Maintenance Requirements:
Convoy MC: ___ 
Time Required: ___ hours
Parts Required: ___ × 0.2 = ___ cargo units
```

### Cargo Planning Worksheet
```
Total Convoy Cargo: ___ units

Allocated Cargo:
- Personnel: ___ units (1 per person + gear)
- Food: ___ units (1 per 4 people per week)
- Fuel: ___ units (1 per 190 liters)
- Parts: ___ units (1 per 5 maintenance points)
- Trade Goods: ___ units
- Equipment: ___ units
- Emergency Reserve: ___ units

Remaining Cargo: ___ units
```

## Combat Quick Reference

### Damage Type Effects
| Damage Type | Civilian | Military | Industrial | Notes |
|-------------|----------|----------|------------|-------|
| Bludgeoning | Half | Half | Half | Impacts, crashes |
| Piercing | Full | Half | Full | Bullets, spears |
| Slashing | Full | Half | Half | Blades, shrapnel |
| Fire | Full | Half | Full | Explosions, fire spells |
| Thunder | Half | Half | Half | Sonic attacks |
| Cold | Full | Half | Full | Ice spells |
| Acid | Full | Full | Full | Chemical attacks |
| Lightning | Full | Half | Full | Electric spells |

### Common Spell Damage vs. Vehicles
| Spell | Damage | Civilian Car (40 DUR) | Military Vehicle (135 DUR) | Tank (360 DUR) |
|-------|--------|----------------------|---------------------------|----------------|
| Fireball | 28 fire | 28 damage (70% health) | 14 damage (90% health) | 14 damage (96% health) |
| Lightning Bolt | 28 lightning | 28 damage (70% health) | 14 damage (90% health) | 14 damage (96% health) |
| Cone of Cold | 36 cold | 36 damage (10% health) | 18 damage (87% health) | 18 damage (95% health) |
| Meteor | 40 bludg + 40 fire | 60 damage (DESTROYED) | 30 damage (78% health) | 30 damage (92% health) |

### Vehicle Condition Quick Check
```
Current DUR: ___ / ___ Maximum

Condition:
□ Pristine (100%) - No penalties
□ Damaged (99-50%) - Disadvantage on PWR checks, +1 FC
□ Heavy (49-25%) - Speed halved, disadvantage on MAN & PWR, +2 FC, 2× MC
□ Critical (24-1%) - Speed 0, disadvantage all checks, +3 FC, 3× MC

Critical Check Required: □ Yes □ No
(If took ≥25% max DUR in single hit, or any damage while Critical)
```

## Environmental Quick Reference

### Terrain Modifier Stack
```
Base Terrain: ___ (Highway ×1.0, Country ×0.85, Damaged ×0.70, etc.)
+ Weather: ___ (Clear ×1.0, Light rain ×0.95, Heavy ×0.85, etc.)
+ Vehicle Bonuses: ___ (4WD, tracked, high-clearance bonuses)
= ___ Final Speed Modifier
```

### Visibility Effects
| Visibility | Range | Navigation | Ambush Risk | Convoy Coordination |
|------------|-------|------------|-------------|-------------------|
| Clear | Unlimited | Easy | Low | Normal |
| Good | 1+ km | Normal | Low | Normal |
| Poor | 200m | Difficult | Moderate | Disadvantage |
| Limited | 100m | Very Difficult | High | Disadvantage |
| Very Poor | 50m | Extremely Difficult | Very High | Major Disadvantage |
| Zero | 0m | Impossible | Extreme | Convoy Separation Risk |

## Modification Installation Reference

### Installation Time and Cost
| Modification Type | Time Range | Parts Range | Skill Required |
|-------------------|------------|-------------|----------------|
| Minor (1 slot) | 8-16 hours | 1-3 units | Competent Mechanic |
| Major (2 slots) | 24-48 hours | 4-8 units | Expert Mechanic |
| Extreme (3 slots) | 72-120 hours | 10-20 units | Master Craftsman |

### Workshop and Mending Bonuses
| Available Resources | Time Modifier | Parts Modifier |
|--------------------|---------------|----------------|
| Field Conditions | ×2.0 | ×1.0 |
| Basic Tools | ×1.0 | ×1.0 |
| Mobile Workshop | ×0.75 | ×0.75 |
| Full Garage | ×0.60 | ×0.60 |
| + Mending Mechanic | ×0.5 | ×0.5 |

**Maximum Efficiency:** Full Garage + Mending = 30% of base time and parts cost

## Campaign Integration Tools

### Monthly Operations Planner
```
Month: _______ Planned Distance: _____ km

Convoy Capabilities:
Speed: ___ km/h  |  Range: ___ km  |  Cargo: ___ units

Resource Requirements:
Fuel: ___ units  |  Parts: ___ units  |  Maintenance: ___ hours

Environmental Factors:
Terrain: ________  |  Weather: ________  |  Hazards: ________

Mission Objectives:
□ Transportation  □ Exploration  □ Combat  □ Trade  □ Construction
```

### Vehicle Role Assignment
```
□ Lead Vehicle: _____________ (High MAN, reliable)
□ Scout: _____________ (Fast, efficient, communication)
□ Combat: _____________ (High DUR, weapons, tactical)
□ Cargo: _____________ (High CC, reliable)
□ Support: _____________ (Workshop, medical, specialized)
□ Backup: _____________ (Redundant capabilities)
```

### Emergency Procedures Checklist
```
Vehicle Breakdown:
□ Assess damage and condition
□ Check if critical failure occurred
□ Determine repair requirements
□ Evaluate towing options
□ Consider abandonment vs. repair

Combat Damage:
□ Apply damage resistances
□ Check for massive damage (≥25% max DUR)
□ Roll reliability check if required
□ Assess vehicle condition level
□ Plan emergency repairs or evacuation
```
