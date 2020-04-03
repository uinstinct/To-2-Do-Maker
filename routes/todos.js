const express=require('express'),
	  router =express.Router(),
	  db 	 =require('../models/index.js'),
	  condensers=require('../condensers/todo.js');

router.route('/')
	.get(condensers.getAllTodos)
	.post(condensers.postAllTodos);

router.route('/:todoid')
	.get(condensers.getOneTodo)
	.put(condensers.putOneTodo)
	.delete(condensers.deleteOneTodo)


module.exports=router;