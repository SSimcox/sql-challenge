/**
 * Created by Steven on 11/21/2016.
 */
var express = require('express');
var route = express.Router();
var db = require('../database/queries');

route.get('/',function(req,res, next){
    res.render('partials/add');
});

route.post('/', db.addPost,addPostFail,addPostSuccess);

function addPostSuccess(req,res,next){
    res.redirect('/');
}
function addPostFail(err,req,res,next){
    res.redirect('/?err=add');
}

module.exports = route;