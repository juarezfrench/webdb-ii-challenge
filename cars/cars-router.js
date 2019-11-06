const express = require('express');

const db = require('../data/dbConfig');

const router = express.Router();

// **********************************************************************

// CRUD Endpoints

// GET /api/cars endpoint to READ/RETRIEVE cars - FUNCTIONING
router.get('/', (req, res) => {
  db('cars')
    .then(cars => {
      res.status(200).json(cars);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: 'Error retrieving the cars' });
    });
});

// GET /api/cars/:id endpoint to READ/RETRIEVE car by ID - FUNCTIONING
router.get('/:id', (req, res) => {
  db('cars')
    .where({ id: req.params.id })
    .first()
    .then(car => {
      if (car) {
        res.status(200).json(car);
      } else {
        res.status(404).json({ message: 'Invalid car ID' });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: 'Error retrieving the car' });
    });
});

// POST /api/cars endpoint to CREATE a car - FUNCTIONING
router.post('/', validateCar, (req, res) => {
  db('cars')
    .insert(req.body, 'id')
    .then(ids => {
      console.log(ids);
      res.status(201).json({ newCar: ids[0] });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: 'Error creating car' });
    });
});

// PUT /api/cars/:id endpoint to UPDATE a car - FUNCTIONING
router.put('/:id', validateCar, (req, res) => {
  db('cars')
    .where({ id: req.params.id })
    .update(req.body)
    .then(count => {
      if (count) {
        res.status(200).json({ message: 'The car has been updated' });
      } else {
        res.status(404).json({ message: 'Invalid car ID' });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: 'Error updating the car' });
    });
});

// DELETE /api/cars/:id endpoint to DELETE a car - FUNCTIONING
router.delete('/:id', (req, res) => {
  db('cars')
    .where({ id: req.params.id })
    .del()
    .then(count => {
      if (count) {
        res.status(200).json({ message: 'The car has been deleted' });
      } else {
        res.status(404).json({ message: 'Invalid car ID' });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: 'Error deleting the car' });
    });
});

// **********************************************************************

// Custom Middleware

// Validate body on create/update car request - FUNCTIONING
function validateCar(req, res, next) {
  if (!Object.keys(req.body).length) {
    res.status(400).json({ message: 'Missing car data!' });
  } else if (!req.body.VIN) {
    res.status(400).json({ message: 'Missing required "VIN" field!' });
  } else if (!req.body.make) {
    res.status(400).json({ message: 'Missing required "make" field!' });
  } else if (!req.body.model) {
    res.status(400).json({ message: 'Missing required "model" field!' });
  } else {
    next();
  }
}

// **********************************************************************

module.exports = router;