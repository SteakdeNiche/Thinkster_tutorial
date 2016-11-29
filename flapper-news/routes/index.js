var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

require("../models/Posts");
require("../models/Comments");

var Post = mongoose.model('Post');
var Comment = mongoose.model('Comment');

//Get all the posts
router.get('/posts', function(req, res, next){
  Post.find(function(err,posts){
    if(err){
      return next(err);
    }
    res.json(posts);
  });
});

//Get a single post
router.get('/posts/:post', function(req, res){
  res.json(req.post);
});

//Post to post a post
router.post('/posts', function(req, res, next){
  var post=new Post(req.body);

  post.save(function(err, post){
    if(err){
      return next(err);
    }
    res.json(post);
  });
});
 //here to preload post obejcts by id
router.param('post', function(req, res, next, id){
  var query = Post.findById(id);
  query.exec(function(err, post){
    if(err){
      return next(err);
    }
    if(!post){
      return next(new Error('Can\'t find post'));
    }
    req.post = post;
    return next();
  });
});

//make a upvote
router.put('/posts/:post/upvote', function(req, res, next){
  req.post.upvote(function(err, post){
    if(err){
      return next(err);
    }
    res.json(post);
  });
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
