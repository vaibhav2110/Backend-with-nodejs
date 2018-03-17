const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Favorite = require('../models/favorites');
const authenticate = require('../authenticate');

const FavoriteRouter = express.Router();
FavoriteRouter.use(bodyParser.json());

FavoriteRouter.route('/')
.get(authenticate.verifyUser, (req,res,next)=>{
    Favorite.find({user: req.user._id})
    .populate('user')
    .populate('dishes')
    .then((favorites)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(favorites);
    },(err)=> next(err))
    .catch((err)=> next(err));
})
.post(authenticate.verifyUser, (req,res,next)=>{
    Favorite.find({user: req.user._id})
    .then((favorite)=>{
        console.log(favorite);
        if(!(favorite== null || favorite==undefined || (favorite[0]==null))){
            console.log("yaha ghusa");
            for(let ids of req.body){
                if((favorite[0].dishes).indexOf(ids._id) == -1)
                    favorite[0].dishes = favorite[0].dishes.concat(ids._id);
                }
            favorite[0].save()
            .then((favorite)=>{
               res.statusCode = 200;
               res.setHeader('Content-Type', 'application/json');
               res.json(favorite);
            },(err)=> next(err))
        }
        else{
            console.log("waha ghusa");

            Favorite.create({
                user : req.user._id
            })
            .then((favorite)=>{
                favorite.user = req.user._id;
                for(let ids of req.body){
                    favorite.dishes = favorite.dishes.concat(ids._id);
                }
                favorite.save()
                .then((favorite)=>{
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(favorite);
                 },(err)=> next(err))
            },(err)=> next(err))
        }
    },(err)=> next(err))
    .catch((err)=> next(err));
})
.put(authenticate.verifyUser, (req,res,next)=>{
    res.statusCode = 403;
    res.end('Put operation not allowed on favorites');
})
.delete(authenticate.verifyUser,(req,res,next)=>{
    Favorite.remove({user: req.user._id})
    .then((resp)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    },(err)=> next(err))
    .catch((err)=>next(err));
});

FavoriteRouter.route('/:favoriteId')
.get(authenticate.verifyUser, (req,res,next)=>{
    res.statusCode = 403;
    res.end('Doesnt make sense');
})
.post(authenticate.verifyUser, (req,res,next)=>{
    /*Favorite.create()
    .then((favorite)=>{
        favorite.user = req.user._id;
        favorite.dishes = req.params.favoriteId;
        favorite.save()
        .then((favorite)=>{
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(favorite);
        },(err)=> next(err))
    },(err)=> next(err))
    .catch((err)=>next(err));
    */
    Favorite.find({user: req.user._id})
    .then((favorite)=>{
        console.log(favorite);
        if(!(favorite== null || favorite==undefined || (favorite[0]==null))){
            console.log("yaha ghusa");
            if((favorite[0].dishes).indexOf(req.params.favoriteId) == -1){
                    favorite[0].dishes = favorite[0].dishes.concat(req.params.favoriteId);
                }
            favorite[0].save()
            .then((favorite)=>{
               res.statusCode = 200;
               res.setHeader('Content-Type', 'application/json');
               res.json(favorite);
            },(err)=> next(err))
        }
        else{
            console.log("waha ghusa");
            Favorite.create({
                user : req.user._id
            })
            .then((favorite)=>{
                favorite.user = req.user._id;
                favorite.dishes = favorite.dishes.concat(req.params.favoriteId);
                favorite.save()
                .then((favorite)=>{
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(favorite);
                 },(err)=> next(err))
            },(err)=> next(err))
        }
    },(err)=> next(err))
    .catch((err)=> next(err));
})
.put(authenticate.verifyUser, (req,res,next)=>{
    res.statusCode = 403;
    res.end('Put operation not allowed on favorites');
})
.delete(authenticate.verifyUser,(req,res,next)=>{
    Favorite.find({user: req.user._id})
    .then((favorite)=>{
        if(!(favorite== null || favorite==undefined || (favorite[0]==null))){
            let id1 = req.user._id;
            let id2 = favorite[0].user;
            if(id1.equals(id2)){
                for(let ids of favorite[0].dishes){
                    console.log(ids);
                    console.log(favorite[0].dishes);
                    if(ids.equals(req.params.favoriteId)){
                        console.log("ghusa")
                        favorite[0].dishes.splice(ids,1);
                    }
                }
            }
            favorite[0].save()
            .then((favorite)=>{
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(favorite);
            },(err)=> next(err));
        }
        else{
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.body('Empty');
        }
    },(err)=> next(err))
    .catch((err)=>next(err));
    });

module.exports = FavoriteRouter;
