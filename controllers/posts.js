const Posts = require('../models/posts');

// @description Get all posts
// @route GET /api/v1/posts
// 
exports.getPosts = async (req, res, next) => {
  try {
		const posts = await Posts.find();
		return res.status(200).json({
			success: true,
			count: posts.length,
			data: posts
		})
	} catch (error) {
		return res.status(500).json({
			success: false,
			errorMessage: 'Server Error'
		})
	}
}
// @description Add a single post
// @route POST /api/v1/posts
// 
exports.addPost = async (req, res, next) => {
	try {
		const { title, description } = req.body;
		const post = await Posts.create(req.body);
		return res.status(201).json({
			success: true,
			data: post
		})
	} catch (error) {
		if(error.name === 'ValidationError') {
			const messages = Object.values(error.errors).map(element => element.message);
			return res.status(400).json({
				success: false,
				errorMessage: messages
			})
		} else {
			return res.status(500).json({
				success: false,
				errorMessage: 'Server Error'
			})
		}
	}
	
}

// @description Delete a post
// @route DELETE /api/v1/posts/:id
// 
exports.deletePost= async (req, res, next) => {
	try {
		const post = await Posts.findById(req.params.id);
		if(!post) {
			return res.status(404).json({
				success: false,
				errorMessage: 'The post you\'re looking for is not on our server'
			})
		}
		await post.remove();
		return res.status(200).json({
			success: true,
			data: {}
		})
	} catch (error) {
		return res.status(500).json({
			success: false,
			errorMessage: 'Server Error'
		})
	}
}