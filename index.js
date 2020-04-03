require('dotenv').config();
const 	express   =require('express'),
		app 	  =express(),
		todoRoutes=require('./routes/todos'),
		bodyParser=require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static(__dirname+'/views'));
app.use(express.static(__dirname+'/public'));


app.get("/",function (req,res) {
	res.sendFile("index.html")
});

app.post("/",function (req,res) {
	res.send(req.body);
})

app.use('/api/todos',todoRoutes);

app.listen(process.env.PORT,()=>console.log('server started'));