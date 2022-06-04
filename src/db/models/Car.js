import sequelize from "../index.js";
import { DataTypes } from "sequelize";

// const car = {
//   image: "corolla_estate_lrg",
//   title: "Toyota",
//   model: "Corolla Estate",
//   typeCar: "Hatchback",
//   discount: "15% off",
//   features: [
//     { passengers: 5, icon: Users },
//     { consumption: "8 LITERS/100 KM", icon: Gauge },
//     { gearbox: "Automatic", icon: ManualGearbox },
//     { fuelType: "Petrol", icon: GasStation },
//   ],
//   price: "123.00$",
// };

//typeCar, number of passengers, gearbox, fuelType, price

const Car = sequelize.define("car", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  image: {
    type: DataTypes.STRING,
  },
  title: {
    type: DataTypes.STRING,
  },
  model: {
    type: DataTypes.STRING,
  },
  discount: {
    type: DataTypes.INTEGER,
  },
  passengers: {
    type: DataTypes.INTEGER,
  },
  consumption: {
    type: DataTypes.INTEGER,
  },
  gearbox: {
    type: DataTypes.STRING,
  },
  fuelType: {
    type: DataTypes.STRING,
  },
  price: {
    type: DataTypes.FLOAT,
  },
});

export default Car;
