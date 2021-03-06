const express = require('express');
const bodyParser = require('body-parser');

const Promotions = require('../models/Promotions')
var authenticate = require('../authenticate');

const promoRouter = express.Router();

promoRouter.use(bodyParser.json());

promoRouter.route('/')
.get((req, res, next) =>{
    Promotions.find({})
    .then((promotion) => {
        res.status = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(promotion);
    },(err) => next(err))
    .catch((err) => next(err));
})
.post(authenticate.verifyUser,(req,res, next) =>{
    Promotions.create(req.body)
    .then((promotion) => {
        res.status = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(promotion);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.put(authenticate.verifyUser,(req,res, next) => {
    res.status = 403;
    res.setHeader('put operation not supported on /promotions');
})
.delete(authenticate.verifyUser,(req, res, next) => {
    Promotions.remove({})
    .then((promotion) => {
        res.status = 200;
        res.setHeader('Content-Type','application/json');
        res.json(promotion);
    },(err) => next(err))
    .catch((err) => next(err));
});

promoRouter.route('/:promoId')
.get((req,res,next) => {
    Promotions.findById(req.params.promoId)
    .then((promotion) => {
        res.status = 200 ;
        res.setHeader('Content-Type', 'application/json');
        res.json(promotion);
    },(err) => next(err))
    .catch((err) => next(err));
})
.post(authenticate.verifyUser,(req, res, next) => {
    res.status = 403;
    res.setHeader('Post operation not supported on /promotion/'+req.params.promoId);
})
.put(authenticate.verifyUser,(req,res,next) => {
    Promotions.findByIdAndUpdate(req.params.promoId,{$set: req.body},{new: true})
    .then((promotion) => {
        res.status = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(promotion);
    },(err)=>next(err))
    .catch((err) => next(err));
})
.delete(authenticate.verifyUser,(req,res,next) => {
    Promotions.findByIdAndRemove(req.params.promoId)
    .then((promotion) => {
        res.status = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(promotion);
    },(err)=>next(err))
    .catch((err)=>next(err));
});

module.exports = promoRouter;