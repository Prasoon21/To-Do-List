var myForm = document.getElementById('my-form');

myForm.addEventListener('submit', addTodo);

function addTodo(e){
    e.preventDefault();

    var todoName = document.getElementById('todoName').value;
    var description = document.getElementById('description').value;

    const myTodo = {
        todoName : todoName,
        description : description
    };

    axios.post('https://crudcrud.com/api/1ff345c582dd43869e9e22fb4ae686a6/todoList', myTodo)
        .then((response) => {
            showListOnScreen(response.data);
            console.log(response);
        })
        .catch((err) => {
            console.log(err);
        });

    myForm.reset();
}


window.addEventListener("DOMContentLoaded", () => {
    axios.get("https://crudcrud.com/api/1ff345c582dd43869e9e22fb4ae686a6/todoList")
        .then((response) => {
            console.log(response)

            for(var i=0;i<response.data.length;i++){
                showListOnScreen(response.data[i]);
            }
        })
        .catch((error) => {
            console.log(error)
        })
})


function showListOnScreen(myTodo){
    //var todoList = document.getElementById('todoList');
    var todoDone = document.getElementById('todoDone');
    var dataItems = document.getElementById('data-item');
    var taskDone = document.getElementById('task-done');

    var h1Done = document.createElement('h1');
    
    // var h1List = document.createElement('h1');
    // todoList.appendChild(h1List);
    // h1List.appendChild(document.createTextNode("Task To Do"));

    var liDone = document.createElement('li');
    var li = document.createElement('li');

    //todoList.insertBefore(h1List, todoList.firstChild);
    dataItems.appendChild(li);

    li.appendChild(document.createTextNode(myTodo.todoName));
    li.appendChild(document.createTextNode(" - " + myTodo.description));

    todoDone.appendChild(h1Done)
        

    const isDone = document.createElement('input');
    isDone.type = "button";
    isDone.value = "✔";
    //const isClicked = false;
    isDone.onclick = () => {
        // isClicked = true;
        // if(isClicked){
        //     h1Done.appendChild(document.createTextNode("Task Done"));
        //     todoDone.insertBefore(h1Done, todoDone.firstChild);
            
        // }
        // isClicked = false;

        
        taskDone.appendChild(liDone)
        liDone.appendChild(document.createTextNode(myTodo.todoName));
        liDone.appendChild(document.createTextNode(myTodo.description));

        dataItems.removeChild(li);
    }
    li.appendChild(isDone);
    dataItems.appendChild(li);


    const deletebtn = document.createElement('input');
    deletebtn.type = "button";
    deletebtn.value = "X";

    deletebtn.addEventListener('click', deleteButton);
    
    li.appendChild(deletebtn);
    dataItems.appendChild(li);
}

function deleteButton(){
    axios.delete(`https://crudcrud.com/api/1ff345c582dd43869e9e22fb4ae686a6/todoList/${myTodo._id}`)
        .then((response) => {
            dataItems.removeChild(li);
        })
        .catch((err) => {
            console.log(err);
        })
    
}