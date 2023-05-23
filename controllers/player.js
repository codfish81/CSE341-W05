const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAllPlayers = async (req, res, next) => {
  mongodb
    .getDb()
    .db()
    .collection('players')
    .find()
    .toArray((err, lists) => {
      if (err) {
        res.status(400).json({message: err});
      }
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
};

const getSinglePlayer = async (req, res, next) => {
    const userId = new ObjectId(req.params.id);
    mongodb
      .getDb()
      .db()
      .collection('players')
      .find({_id: userId})
      .toArray((err, lists) => {
        if (err) {
          res.status(400).json({message: err});
        }
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists[0]);
    });
  };

  const createPlayer = async (req, res) => {
    const player = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      position: req.body.position,
      team: req.body.team,
      birthday: req.body.birthday,
      height: req.body.height,
      weight: req.body.weight
    };
    const response = await mongodb.getDb().db().collection('players').insertOne(player);
    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res.status(500).json(response.error || 'Some error occurred while creating the contact.');
    }
  };

  const updatePlayer = async (req, res) => {
    const userId = new ObjectId(req.params.id);
    // be aware of updateOne if you only want to update specific fields
    const player = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      position: req.body.position,
      team: req.body.team,
      birthday: req.body.birthday,
      height: req.body.height,
      weight: req.body.weight
    };
    const response = await mongodb
      .getDb()
      .db()
      .collection('players')
      .replaceOne({ _id: userId }, player);
    console.log(response);
    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'Some error occurred while updating the contact.');
    }
  };

  const deletePlayer = async (req, res) => {
    const userId = new ObjectId(req.params.id);
    const response = await mongodb.getDb().db().collection('players').deleteOne({ _id: userId }, true);
    console.log(response);
    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'Some error occurred while deleting the contact.');
    }
  };

  module.exports = { getAllPlayers, getSinglePlayer, createPlayer, updatePlayer, deletePlayer};