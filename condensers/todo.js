const db = require('../models');

var exportObject = {};



exportObject.getAllTodos = function (req,res) {
	db.Todo.find()
		.then(function (todo) {
			res.send(todo);
		})
		.catch(function(error){
			res.send(error);
		})
}

exportObject.postAllTodos = function (req,res) {
	db.Todo.create(req.body)
		.then(function (newtodo) {
			res.json(newtodo);
		})
		.catch(function (error) {
			res.send(error);
			console.log('there was an error in post /')
		});	
}



exportObject.getOneTodo = function (req,res) {
	db.Todo.findOne({_id:req.params.todoid})
		.then(function (todo) {
			res.json(todo);
		})
		.catch(function (error){
			res.send(error);
			console.log("there was an error in get /:todoid");
		})
}

exportObject.putOneTodo = function (req,res) {
	console.log({_id:req.params.todoid}, req.body)
	db.Todo.findOneAndUpdate({_id:req.params.todoid}, req.body, {new:true}) //new true gives us the updated todo
		.then(function (todo) {
			res.json(todo);
		})
		.catch(function (error) {
			res.send(error);
		})
}

exportObject.deleteOneTodo = function (req,res) {
	db.Todo.findOneAndRemove({_id:req.params.todoid},req.body)
		.then(function (todo) {
			res.json({"message": `${todo.name} was deleted`})
		})
		.catch(function (error) {
			res.send(error.message);
		})
}

module.exports = exportObject;