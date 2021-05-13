/*********************************************************************************
 *  WEB422 – Assignment 1
 *  I declare that this assignment is my own work in accordance with Seneca  Academic Policy.
 *  No part of this assignment has been copied manually or electronically from any other source
 *  (including web sites) or distributed to other students.
 *
 *  Name: Ha Eun Kim Student ID: 158007187 Date: ________________
 *  Heroku Link: _______________________________________________________________
 *
 ********************************************************************************/

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const HTTP_PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(cors());

const RestaurantDB = require('./modules/restaurantDB.js');

const db = new RestaurantDB(
  'mongodb+srv://haeun1303:0704@cluster0.m2rfz.mongodb.net/sample_restaurants?retryWrites=true&w=majority'
);

app.get('/', (req, res) => {
  res.json({ message: 'API Listening' });
});

//POST
app.post('/api/restaurants', (req, res) => {
  db.addNewRestaurant(req.body)
    .then((result) => {
      res.status(201).json({
        message: result,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(404).json(err);
    });
});

//GET
app.get('/api/restaurants', (req, res) => {
  db.getAllRestaurants(req.query.page, req.query.perPage, req.query.borough)
    .then((rest) => {
      res.status(201).json(rest);
    })
    .catch((err) => {
      console.log(err);
      res.status(404).json(err);
    });
});

//GET WITH ID
app.get('/api/restaurants/:id', (req, res) => {
  db.getRestaurantById(req.params.id)
    .then((rest) => {
      res.status(201).json(rest);
    })
    .catch((err) => {
      console.log(err);
      res.status(404).json(err);
    });
});

//put
app.put('/api/restaurants/:id', (req, res) => {
  db.updateRestaurantById(req.params.id)
    .then((rest) => {
      res.status(201).json(rest);
    })
    .catch((err) => {
      console.log(err);
      res.status(404).json(err);
    });
});

//delete
app.delete('/api/restaurants/:id', (req, res) => {
  db.deleteRestaurantById(req.params.id)
    .then((rest) => {
      res.status(201).json(rest);
    })
    .catch((err) => {
      console.log(err);
      res.status(404).json(err);
    });
});

//initilalize the service & start the server
db.initialize()
  .then(() => {
    app.listen(HTTP_PORT, () => {
      console.log(`server listening on: ${HTTP_PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
