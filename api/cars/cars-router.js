// DO YOUR MAGIC
const router = require('express').Router();
const Cars = require('./cars-model');
const { checkCarId, checkCarPayload, checkVinNumberValid, checkVinNumberUnique } = require('./cars-middleware');

router.get('/', (req, res, next) => {
    Cars.getAll()
        .then(cars => {
            res.status(200).json(cars)
        })
        .catch(next)
})

router.get('/:id', checkCarId, (req, res, next) => {
    Cars.getById(req.params.id)
        .then(car => {
            res.status(200).json(car)
        })
        .catch(next)
})

router.post('/', checkCarPayload, checkVinNumberValid, checkVinNumberUnique, (req, res, next) => {
    Cars.create(req.body)
        .then(newCar => {
            res.status(201).json(newCar);
        })
        .catch(next)
})

router.use((err, req, res, next) => {  // eslint-disable-line
    res.status(500).json({
        message: err.message,
        stack: err.stack,
        custom: "error in cars-router.js"
    })
})

module.exports = router;