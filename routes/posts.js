const routes = require('express').Router();
const PostsModel = require('../models/posts');
const UsersModel = require('../models/users');

//create a post
routes.post('/', async (req, res) => {
  const newPost = new PostsModel(req.body);
  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

//update a post
routes.put('/:id', async (req, res) => {
  try {
    const post = await PostsModel.findById(req.params.id);
    if (post.userId === req.body.userId) {
      await post.updateOne({ $set: req.body });
      res.status(200).json('the post has been updated');
    } else {
      res.status(403).json('You can only update your posts');
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//delete a post
routes.delete('/:id', async (req, res) => {
  try {
    const post = await PostsModel.findById(req.params.id);
    if (post.userId === req.body.userId) {
      await post.deleteOne();
      res.status(200).json('the post has been deleted');
    } else {
      res.status(403).json('You can only delete your posts');
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//like a post/ dislike a post
routes.put('/:id/like', async (req, res) => {
  try {
    const post = await PostsModel.findById(req.params.id);
    if (!post.likes.includes(req.body.userId)) {
      await post.updateOne({ $push: { likes: req.body.userId } });
      res.status(200).json('Your post has been liked!');
    } else {
      await post.updateOne({ $pull: { likes: req.body.userId } });
      res.status(200).json('Your post has been disliked');
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// get a post
routes.get('/:id', async (req, res) => {
  try {
    const post = await PostsModel.findById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get timeline posts
routes.get('/timeline/all', async (req, res) => {
  try {
    const currentUser = await UsersModel.findById(req.body.userId);
    const userPosts = await PostsModel.find({ userId: currentUser._id });
    const friendPosts = await Promise.all(
      currentUser.following.map((friendId) => {
        return PostsModel.find({ userId: friendId });
      })
    );
    res.json(userPosts.concat(...friendPosts));
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = routes;
