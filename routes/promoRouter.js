const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var authenticate = require('../authenticate');

const Promotions = require('../models/promotions');
const promoRouter = express.Router();
const cors = require('./cors');

promoRouter.use(bodyParser.json());

promoRouter.route('/')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.get(cors.cors, (req,res,next) => {
    Promotions.find({})
    .then((promotions)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/JSON');
        res.json(promotions);
    },(err)=> next(err))
    .catch((err) => next(err));
})
.post(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    Promotions.create(req.body)
    .then((promotions)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/JSON');
        res.json(promotions);
    },(err)=> next(err))
    .catch((err) => next(err));
})
.put(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin,(req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /promo');
})
.delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin,(req, res, next) => {
    Promotions.remove({})
    .then((resp)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/JSON');
        res.json(resp);
    },(err)=> next(err))
    .catch((err) => next(err));
});

promoRouter.route('/:promoId')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.get(cors.cors, (req,res,next) => {
    Promotions.findById(req.params.promoId)
    .then((promotion)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/JSON');
        res.json(promotion);
    },(err)=> next(err))
    .catch((err) => next(err));
})
.post(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin,(req, res, next) => {
  res.statusCode = 403;
  res.end('POST operation not supported on /promotions/'+ req.params.promoId);})
.put(cors.corsWithOptions, cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin,(req, res, next) => {
    Promotions.findByIdAndUpdate(req.params.promoId,
        { $set: req.body}, {new: true})
    .then((promotion)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/JSON');
        res.json(promotion);
    },(err)=> next(err))
    .catch((err) => next(err));
})
.delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin,(req, res, next) => {
    Promotions.findByIdAndRemove(req.params.promoId)
    .then((resp)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/JSON');
        res.json(resp);
    },(err)=> next(err))
    .catch((err) => next(err));
});

module.exports = promoRouter;