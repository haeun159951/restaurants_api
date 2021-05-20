/*********************************************************************************
 *  WEB422 – Assignment 1
 *  I declare that this assignment is my own work in accordance with Seneca  Academic Policy.
 *  No part of this assignment has been copied manually or electronically from any other source
 *  (including web sites) or distributed to other students.
 *
 *  Name: Ha Eun Kim Student ID: 158007187 Date: May 23, 2021
 *  Heroku Link: https://gentle-coast-22304.herokuapp.com
 *
 ********************************************************************************/

const express = require('express');
const cors = require('cors');

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

//POST : 201
app.post('/api/restaurants', (req, res) => {
  db.addNewRestaurant(req.body)
    .then(() => {
      res.status(201).json({ message: `added restaurants` });
    })
    .catch((err) => {
      console.log(err);
      res.status(404).json({ message: `${err}` });
    });
});

//GET
app.get('/api/restaurants', (req, res) => {
  db.getAllRestaurants(req.query.page, req.query.perPage, req.query.borough)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(404).json({ message: `${err}` });
    });
});

//GET with ID
app.get('/api/restaurants/:id', (req, res) => {
  db.getRestaurantById(req.params.id)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(404).json({ message: `${err}` });
    });
});

// PUT: update
app.put('/api/restaurants/:id', (req, res) => {
  db.updateRestaurantById(req.body, req.params.id)
    .then((result) => {
      res.status(200).json({
        message: result,
      });
    })
    .catch((err) => {
      res.status(400).json({
        message: `${err}`,
      });
    });
});

//Delete
app.delete('/api/restaurants/:id', (req, res) => {
  db.deleteRestaurantById(req.params.id)
    .then((result) => {
      res.status(204).json({
        message: result,
      });
    })
    .catch((err) => {
      res.status(400).json({
        message: `${err}`,
      });
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
