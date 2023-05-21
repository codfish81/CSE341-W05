const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAllTeams = async (req, res, next) => {
    const result = await mongodb.getDb().db().collection('teams').find();
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
    });
  };
  
  const getSingleTeam = async (req, res, next) => {
    const userId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDb()
      .db()
      .collection('teams')
      .find({ _id: userId });
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists[0]);
    });
  };

  const createTeam = async (req, res) => {
    const team = {
      name: req.body.name,
      location: req.body.location,
      sport: req.body.sport,
      record: req.body.record,
      conference: req.body.conference,
      seed: req.body.seed,
      mascot: reg.body.mascot
    };
    const response = await mongodb.getDb().db().collection('teams').insertOne(team);
    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res.status(500).json(response.error || 'Some error occurred while creating the contact.');
    }
  };

  const updateTeam = async (req, res) => {
    const userId = new ObjectId(req.params.id);
    // be aware of updateOne if you only want to update specific fields
    const team = {
      name: req.body.name,
      location: req.body.location,
      sport: req.body.sport,
      record: req.body.record,
      conference: req.body.conference,
      seed: req.body.seed,
      mascot: reg.body.mascot
    };
    const response = await mongodb
      .getDb()
      .db()
      .collection('teams')
      .replaceOne({ _id: userId }, team);
    console.log(response);
    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'Some error occurred while updating the contact.');
    }
  };

  const deleteTeam = async (req, res) => {
    const userId = new ObjectId(req.params.id);
    const response = await mongodb.getDb().db().collection('teams').deleteOne({ _id: userId }, true);
    console.log(response);
    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'Some error occurred while deleting the contact.');
    }
  };

  module.exports = { getAllTeams, getSingleTeam, createTeam, updateTeam, deleteTeam};