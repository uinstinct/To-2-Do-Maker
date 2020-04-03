const mongoose = require('mongoose');

mongoose.set('debug',true);
mongoose.connect(process.env.DB_URL,{
	useNewUrlParser:true, 
	useUnifiedTopology:true,
	useFindAndModify:false
});

mongoose.Promise = Promise;

module.exports.Todo = require('./todo');