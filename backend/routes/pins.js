const router = require("express").Router();
const pinsModel = require("../models/vehicles");

//get all pins
router.get("/", async (req, res) => {
  try {
    const pins = await pinsModel.getVehicles();
    res.status(200).json(pins);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;