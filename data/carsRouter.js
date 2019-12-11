const express = require('express');
const knex = require("../data/dbConfig"); 
const db = require('./dbConfig');

const router = express.Router();



// GET /api/cars endpoint to READ/RETRIEVE cars 

router.get("/", (req, res) => {
  knex
    .select("*")
    .from("cars")
    .then(cars => {
      res.status(200).json(cars);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ errorMessage: "Error getting the cars" });
    });
});

// GET /api/cars/:id endpoint to READ/RETRIEVE car 
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
router.post("/", (req, res) => {
  // insert into () values ()
  const postData = req.body;

  knex("cars")
    .insert(postData, "id")
    .then(ids => {
      // returns and array of one element, the id of the last record inserted
      const id = ids[0];

      return knex("cars")
        .select("id", "title", "contents")
        .where({ id:req.params.id})
        .first()
        .then(post => {
          res.status(201).json(cars);
        });
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        errorMessage: "Error adding the car"
      });
    });
});

// PUT /api/cars/:id endpoint to UPDATE a car 
router.put("/:id", (req, res) => {
  const { id } = req.params.id;
  const changes = req.body;

  // validate the data
  knex("cars")
    .where({ id: req.params.id }) // ALWAYS FILTER ON UPDATE (AND DELETE)
    .update(changes)
    .then(count => {
      if (count > 0) {
        res.status(200).json({ message: `${count} record(s) updated` });
      } else {
        res.status(404).json({ message: "Car not found" });
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        errorMessage: "Error updating the car"
      });
    });
});

// DELETE /api/cars/:id endpoint to DELETE a car 
router.delete("/:id", (req, res) => {
  const { id } = req.params.id;
  knex("cars")
    .where({ id: req.params.id }) // ALWAYS FILTER ON UPDATE (AND DELETE)
    .del()
    .then(count => {
      res.status(200).json({ message: `${count} record(s) removed` });
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        errorMessage: "Error removing the car"
      });
    });
});




module.exports = router;