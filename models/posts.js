const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  title: {
		type: String,
		required: [true, 'The title field is required']
	},
	description: {
		type: String,
		required: [true, 'The description field is required']
	},
	createdAt: {
		type: Date,
		default: Date.now
	},
	updatedAt: {
		type: Date,
		default: Date.now
	}
});

module.exports = mongoose.model('Posts', PostSchema)