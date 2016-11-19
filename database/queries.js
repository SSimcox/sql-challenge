/**
 * Created by Steven on 11/18/2016.
 */
var pgp = require('pg-promise')();
var connectionString = 'postgres://postgres:@localhost:5432/blog';
var db = pgp(connectionString);

function getAllPosts(req,res,next){
    db.any('select * from posts')
        .then(function(data){
            req.my_data = data;
            next();
        }).catch(function(err){
        next(err);
    });
}

function addPost(req,res,next){
    db.none('insert into posts(title,author,content) values(${title},${author},${content})', req.body)
        .then(function(){
            next();
        }).catch(function(err){
        next(err);
    })
}

function getPost(req,res,next){
    db.one('select * from posts where id=$1', req.params.id)
        .then(function(data){
            req.my_data = data;
            next();
        }).catch(function(err){
        next(err);
    })
}

function updatePost(req,res,next){
    var id = parseInt(req.params.id);
    console.log(id);
    db.none('update posts set title=$1, content=$2 where id=$3', [req.body.title, req.body.content, id])
        .then(function(){
            console.log("Updated Database");
            next();
        }).catch(function(err){
        console.log(err);
        next(err);
    })
}

function deletePost(req,res,next){
    db.result('delete from posts where id=$1', req.params.id)
        .then(function(result){
            console.log(result);
            next();
        }).catch(function(err){
        next(err);
    })
}

module.exports = {
    getAllPosts: getAllPosts,
    addPost: addPost,
    getPost: getPost,
    updatePost: updatePost,
    deletePost: deletePost
};