// DO YOUR MAGIC
const router = require('express').Router();
const Cars = require('./cars-model');

router.get('/', (req, res, next) => {
    Cars.getAll()
        .then(cars => {
            res.status(200).json(cars)
        })
        .catch(next)
})

router.get('/:id', (req, res, next) => {
    Cars.getById(req.params.id)
        .then(car => {
            res.status(200).json(car)
        })
        .catch(next)
})

router.post('/', (req, res, next) => {
    Cars.create(req.body)
        .then(newCar => {
            res.status(201).json(newCar);
        })
        .catch(next)
})

router.use((err, req, res, next) => {
    res.status(500).json({
        message: err.message,
        stack: err.stack,
        custom: "error in cars-router.js"
    })
})

module.exports = router;