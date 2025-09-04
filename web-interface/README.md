# Convoy Management System - Web Interface

A fully functional HTML interface for the D&D 5e Convoy Management System. This single-page application allows you to create, manage, and analyze vehicle fleets with real-time statistics calculations.

## Features

### 🚗 Vehicle Management (CRUD)
- **Create**: Add new vehicles with real-world specifications
- **Read**: View all vehicles with calculated statistics
- **Update**: Edit existing vehicle specifications
- **Delete**: Remove vehicles from your fleet

### 🚛 Convoy Operations
- **Build Convoys**: Select vehicles to form operational convoys
- **Real-time Stats**: Automatic calculation of convoy-level statistics
- **Operational Analysis**: Daily/monthly travel capabilities and resource requirements

### 📊 Statistics Dashboard
- **Individual Vehicle Stats**: SPD, FC, CC, MAN, DUR, PWR, MC
- **Convoy Statistics**: Aggregate performance metrics
- **Operational Summary**: Travel distances, fuel consumption, maintenance requirements

### 💾 Data Persistence
- **Local Storage**: Automatically saves your data in the browser
- **Export/Import**: Backup and share your vehicle fleets as JSON files

## How to Use

### 1. Start the Interface

#### Option A: Local Web Server
```bash
cd web-interface
python3 -m http.server 8000
# Open http://localhost:8000 in your browser
```

#### Option B: Direct File Access
Simply open `index.html` in any modern web browser.

### 2. Create Vehicles

1. Fill out the **Vehicle Creation** form on the left
2. **Required fields**: Vehicle Name, Top Speed, Vehicle Type, Drive Type
3. **Optional fields**: Make, Model, Year, Horsepower, Engine specs, Weight
4. Click **Add Vehicle** to create and calculate statistics

### 3. Build Convoys

1. Click **Add to Convoy** on any vehicle in your fleet
2. View real-time convoy statistics as you add vehicles
3. Remove vehicles by clicking the **×** on convoy tags
4. See operational summaries including travel capabilities and resource requirements

### 4. Manage Your Fleet

- **Edit**: Click the Edit button to modify vehicle specifications
- **Delete**: Remove vehicles you no longer need
- **Export**: Save your entire fleet as a JSON file
- **Import**: Load previously saved fleet data

## Vehicle Statistics Explained

### Individual Vehicle Stats
- **SPD (Speed Rating)**: Sustainable highway speed (SPD × 10 = km/h)
- **FC (Fuel Consumption)**: Fuel usage per 100km of travel
- **CC (Cargo Capacity)**: Transport capability in standardized units
- **MAN (Maneuverability)**: Handling in difficult terrain and situations
- **DUR (Durability)**: Vehicle hit points and damage resistance
- **PWR (Power Rating)**: Engine power for heavy work and towing
- **MC (Maintenance Cost)**: Monthly upkeep requirements

### Convoy Statistics
- **Convoy Speed**: Limited by slowest vehicle with coordination penalties
- **Total Fuel Consumption**: Sum of all vehicle fuel usage
- **Total Cargo**: Combined transport capacity
- **Average Maneuverability**: Weighted average handling capability
- **Total Durability**: Combined hit points
- **Total Power**: Maximum available power for heavy tasks

### Operational Metrics
- **Daily Travel**: Distance covered in 8 hours at 85% efficiency
- **Monthly Travel**: Total distance over 20 travel days per month
- **Fuel-Limited Range**: Maximum range before refueling
- **Monthly Consumption**: Fuel and maintenance requirements per month

## Calculation System

The interface implements the complete D&D 5e Convoy Management System rules:

### Speed Calculation
```
SPD = (Top Speed ÷ 16) rounded to nearest whole number
Convoy Speed = MIN(all vehicle SPD) × 10 × size modifier
```

### Fuel Consumption
```
FC = Cylinders × Displacement Modifier
Military vehicles: +25% penalty
```

### Maneuverability
```
MAN = 10 - (Size Category × 2) + Drive Type Bonus
Military vehicles: +2 bonus
```

### Power Rating
```
PWR = Horsepower ÷ 50 (minimum 1)
```

## Example Vehicles

Try creating these example vehicles to test the system:

### Honda Civic (Nimble Scout)
- Top Speed: 190 km/h
- Vehicle Type: Car
- Drive Type: AWD
- Horsepower: 152
- Cylinders: 4
- Displacement: 2.0L

### Ford F-350 (Heavy Hauler)
- Top Speed: 150 km/h
- Vehicle Type: Truck
- Drive Type: 4WD
- Horsepower: 385
- Cylinders: 8
- Displacement: 6.2L

### M1A1 Abrams (Iron Beast)
- Top Speed: 67 km/h
- Vehicle Type: Military
- Drive Type: Tracks
- Horsepower: 1500
- Military Class: Heavy

## Browser Compatibility

- **Chrome/Edge**: Full support
- **Firefox**: Full support
- **Safari**: Full support
- **Mobile browsers**: Responsive design works on tablets and phones

## Data Storage

- Vehicle data is automatically saved to browser localStorage
- Data persists between browser sessions
- Use Export/Import for backup and sharing
- No server required - everything runs locally

## Troubleshooting

### Statistics Not Calculating
- Ensure all required fields are filled
- Check that numeric values are valid
- Refresh the page if calculations seem stuck

### Data Not Saving
- Check if localStorage is enabled in your browser
- Private/incognito mode may not persist data
- Use Export to manually backup your data

### Interface Not Loading
- Ensure JavaScript is enabled
- Try opening in a different browser
- Check browser console for error messages

## Technical Details

### Files
- `index.html`: Main interface and styling
- `convoy-calculator.js`: Core calculation engine
- `app.js`: UI interactions and data management

### Technologies
- Pure HTML5, CSS3, and JavaScript
- No external dependencies
- Responsive CSS Grid and Flexbox layout
- LocalStorage API for data persistence

## Integration

This web interface uses the same calculation engine as the Node.js CLI tool, ensuring consistent results across all platforms. Vehicle data can be exported from the web interface and imported into other tools in the Convoy Management System ecosystem.

## Future Enhancements

Potential improvements for future versions:
- Vehicle synergy calculations
- Terrain and weather modifiers
- Damage and repair tracking
- Vehicle modification system
- Multi-convoy comparison tools
- Campaign integration features
