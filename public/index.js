var list = document.querySelector('.list');
var newtodo = document.getElementById('newtodo');

window.onload = function(){
	axios.get('/api/todos')
	.then(function (response) {
		return response.data;
	})
	.then(listTodos)
	.catch(function (error) {
		console.log(error)
	})
}

function listTodos (todos) {
	list.innerHTML = "";
	todos.forEach(function (todo) {
		const li = document.createElement('li');
		li.innerHTML=`${todo.name}<span id='deletebtn'>X</span>`;
		li.todoid=todo._id;
		li.isDone=todo.completed;
		if (li.isDone) {li.classList.add('done');}
		list.append(li);
	})
}

function addTodo () {
	axios.post('/api/todos', {name:newtodo.value})
		.then((response)=>response.data)
		.then(listTodo)
		.catch(function (error) {
			console.log(error);
		})
		.then(function () {
			newtodo.value="";
		})
}

function listTodo (todo) {
	const li = document.createElement('li');
	li.innerHTML=`${todo.name}<span id='deletebtn'>X</span>`;
	li.todoid=todo._id;
	li.isDone=todo.completed;
	list.append(li);
}

function deleteTodo (todo) {
	console.log(todo);
	axios({
		method: 'DELETE',
		url: `/api/todos/${todo.todoid}`
	})
	.then(function (response) {
		todo.remove();
		console.log(response.data.message);
	})
	.catch(function (error) {
		console.log(error);
	})
}

function updateTodo (todo) {
	let isDone=!(todo.isDone)
	axios({
		method: 'PUT',
		url: `/api/todos/${todo.todoid}`,
		data: {completed: isDone}
	})
	.then((response)=>response.data)
	.then(function (updatedtodo) {
		todo.isDone=updatedtodo.completed;
		todo.classList.toggle('done');
	})
	.catch(function (error) {
		console.log(error);
	})
}


document.addEventListener('keydown', (event)=>{
	if (event.key==="Enter") {
		addTodo();
	}
});

list.addEventListener('click', (event)=>{
	if (event.target.id==="deletebtn") {
		event.stopPropagation();
		deleteTodo(event.target.parentElement);
	}
	else if (event.target.tagName==='LI') { //check if it is an li or not
		updateTodo(event.target)
	}
});
