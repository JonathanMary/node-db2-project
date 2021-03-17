const cars = require('./cars-model');
const vinValidator = require('vin-validator');

const checkCarId = async (req, res, next) => {
  const id = req.params.id;
  try {
    const validId = await cars.getById(id)
    if(!validId){
      res.status(404).json({ message: `car with id ${id} is not found` });
    } else {
      next();
    }
  } catch (error) { next(error) }
}

const checkCarPayload = (req, res, next) => {
  const body = req.body;
  ["vin", "make", "model", "mileage"].forEach(key => {
    if (body[key] === undefined) {
      return res.status(400).json({ message: `${key} is missing` });
    }
  })
  next();
}

const checkVinNumberValid = (req, res, next) => {
  const vin = req.body.vin;
  if (!vinValidator.validate(vin)) {
    res.status(400).json({ message: `vin ${vin} is invalid` });
  } else {
    next();
  }
}

const checkVinNumberUnique = async (req, res, next) => {
  const vinNumber = req.body.vin;
  const carsList = await cars.getAll();
  carsList.forEach(car => {
    if (car.vin === vinNumber){
      return res.status(400).json({ message: `vin ${vinNumber} already exists` })
    }
  })
  next();
}


module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique,
}