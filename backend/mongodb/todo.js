const { Schema, model } = require('mongoose');

const todoSchema = new Schema({
	title: { type: String, required:true },
	completed: { type:Boolean, required:true }
}, { timestamps:true })

module.exports = model("Todo", todoSchema);