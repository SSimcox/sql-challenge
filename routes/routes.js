var express = require('express');
var route = express.Router();
var moment = require('moment');
var db = require('../database/queries');

route.get('/',db.getAllPosts,getAllPostsFail,getAllPostsSuccess);

function getAllPostsSuccess(req,res,next){
    req.my_data.sort(function(a,b){return(a.created.valueOf() - b.created.valueOf())});
    for(var i = 0; i < req.my_data.length; ++i){
        req.my_data[i].created = moment(req.my_data[i].created).format('MMM Do YYYY');
    }
    var myerr = "none";
    res.render('partials/index-fill',{posts:req.my_data, err: myerr});
}

function getAllPostsFail(err,req,res,next){
    var myerr = "none";
    if(req.query.err) myerr = req.query.err;
    res.render('partials/index-fill', {posts:[], err:myerr});
}

route.get('/add',function(req,res){
    res.render('partials/add');
});

route.post('/add', db.addPost,addPostFail,addPostSuccess);

function addPostSuccess(req,res,next){
    res.redirect('/');
}
function addPostFail(err,req,res,next){
    res.redirect('/?err=add');
}

route.get('/posts/:id', db.getPost,getPostFail,getViewPostSuccess);

function getViewPostSuccess(req,res,next){
    req.my_data.created = moment(req.my_data.created).format('MMM Do YYYY');

    res.render('partials/show', {post:req.my_data});
}
function getPostFail(err,req,res,next){
    res.redirect('/?err=get');
}

route.get('/:id', db.getPost, getPostFail, getPostSuccess);

function getPostSuccess(req,res,next){
    res.render('partials/edit', {post:req.my_data});
}
function getPostFail(err,req,res,next){
    res.redirect('/?err=get');
}

route.post('/:id', db.updatePost, updatePostFail, updatePostSuccess);

function updatePostSuccess(req,res,next){
    res.redirect('/');
}
function updatePostFail(err,req,res,next){
    res.redirect('/?err=edit');
}

route.post('/delete/:id', db.deletePost, deletePostFail, deletePostSuccess);

function deletePostSuccess(req,res,next){
    res.redirect('/');
}
function deletePostFail(err,req,res,next) {
    res.redirect('/?err=delete');
}

module.exports = route;