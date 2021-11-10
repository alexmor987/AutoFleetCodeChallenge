const jsonfile = require("jsonfile");

/**
 *Get All Vehicles permissions  from VehiclesLocation.json file
 * @returns Promise with data of All Vehicles Location
 */
exports.getVehicles = () => {
  return new Promise((resolve, reject) => {
    jsonfile.readFile(__dirname + "/vehiclesLocation.json", (err, obj) => {
      if (err) reject(err);
      else resolve(obj);
    });
  });
};