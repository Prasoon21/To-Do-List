var myForm = document.getElementById('my-form');

myForm.addEventListener('submit', addTodo);

function addTodo(e){
    e.preventDefault();

    var todoName = document.getElementById('todoName').value;
    var description = document.getElementById('description').value;

    const myTodo = {
        todoName : todoName,
        description : description,
        isDone: false
    };

    axios.post('https://crudcrud.com/api/b7b951d528544e0283b4d41f568aaaf0/todoList', myTodo)
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
   // loadCompletedTasksFromServer();

    axios.get("https://crudcrud.com/api/b7b951d528544e0283b4d41f568aaaf0/todoList")
        .then((response) => {
            console.log(response);

            for(var i=0;i<response.data.length;i++){
                if(response.data[i].isDone){
                    showCompletedTaskOnScreen(response.data[i]);
                } else{
                    showListOnScreen(response.data[i]);
                }
                
            }
        })
        .catch((error) => {
            console.log(error)
        })
})


function showListOnScreen(myTodo){
    var todoDone = document.getElementById('todoDone');
    var dataItems = document.getElementById('data-item');
    var taskDone = document.getElementById('task-done');

    var h1Done = document.createElement('h1');

    var liDone = document.createElement('li');
    var li = document.createElement('li');

    dataItems.appendChild(li);

    li.appendChild(document.createTextNode(myTodo.todoName));
    li.appendChild(document.createTextNode(" - " + myTodo.description));

    todoDone.appendChild(h1Done)
        

    const isDone = document.createElement('input');
    isDone.type = "button";
    isDone.value = "✔";
    isDone.className = 'ml-2 mr-2';
    isDone.style.backgroundColor = 'chocolate';
    
    isDone.onclick = () => {
       //saveCompletedTaskToServer(myTodo._id);
        taskDone.appendChild(liDone)
        liDone.appendChild(document.createTextNode(myTodo.todoName));
        liDone.appendChild(document.createTextNode(" - " + myTodo.description));
        const del = document.createElement('input');
        del.type = "button";
        del.value = "X";
        del.className = 'ml-2 mr-2';
        del.style.backgroundColor = 'chocolate';

        liDone.appendChild(del);

        del.onclick = () => {
            axios.delete(`https://crudcrud.com/api/b7b951d528544e0283b4d41f568aaaf0/todoList/${myTodo._id}`)
                .then((response) => {
                    taskDone.removeChild(liDone);
                })
                .catch((err) => {
                    console.log(err);
                })
            
        }

        dataItems.removeChild(li);
        taskDone.appendChild(liDone);
        
        axios.put(`https://crudcrud.com/api/b7b951d528544e0283b4d41f568aaaf0/todoList/${myTodo._id}`, 
        {   todoName: myTodo.todoName,
            description: myTodo.description,
            isDone: true
        
        })
        .then((response) => {

            console.log('Task updated successfully:', response);
        })
        .catch((err) => {
            console.log(err);
        })
        // const h1 = document.createElement('h1');
        // h1.innerText = myTodo.todoName + " - " + myTodo.description;
        // document.getElementById('todoDone').appendChild(h1);
    }
    li.appendChild(isDone);
    dataItems.appendChild(li);

    const deleteBtnWrapper = document.createElement('span');
    const deletebtn = document.createElement('input');
    deletebtn.type = "button";
    deletebtn.value = "X";
    deletebtn.className = 'ml-2 mr-2';
    deletebtn.style.backgroundColor = 'chocolate'; 

    deletebtn.addEventListener('click', (e) => deleteButton(myTodo._id, li, dataItems, e));
    
    deleteBtnWrapper.appendChild(deletebtn);
    li.appendChild(deleteBtnWrapper);
}

function deleteButton(todoId, litems, parent, e){
    e.preventDefault();
    axios.delete(`https://crudcrud.com/api/b7b951d528544e0283b4d41f568aaaf0/todoList/${todoId}`)
        .then((response) => {
            parent.removeChild(litems);
        })
        .catch((err) => {
            console.log(err);
        })
    
}


function showCompletedTaskOnScreen(myTodo){
    var taskDone = document.getElementById('task-done');

    var liDone = document.createElement('li');

    taskDone.appendChild(liDone)
    liDone.appendChild(document.createTextNode(myTodo.todoName));
    liDone.appendChild(document.createTextNode(" - " + myTodo.description));

    const del = document.createElement('input');
    del.type = "button";
    del.value = "X";
    del.className = 'ml-2 mr-2';
    del.style.backgroundColor = 'chocolate';

    liDone.appendChild(del);

    del.onclick = () => {
        axios.delete(`https://crudcrud.com/api/b7b951d528544e0283b4d41f568aaaf0/todoList/${myTodo._id}`)
            .then((response) => {
                taskDone.removeChild(liDone);
                console.log(response);
            })
            .catch((err) => {
                console.log(err);
            })
        
    }

    taskDone.appendChild(liDone);
}


// // Function to save the completed tasks to the server
// function saveCompletedTaskToServer(todoId) {
//     axios.post('https://crudcrud.com/api/5927b9764f3e42d5882692da39ce1ff3/todoList', { todoId })
//         .then((response) => {
//             console.log('Task marked as completed:', response.data);
//         })
//         .catch((err) => {
//             console.log(err);
//         });
// }

// // Function to load completed tasks from the server
// function loadCompletedTasksFromServer() {
//     return axios.get('https://crudcrud.com/api/5927b9764f3e42d5882692da39ce1ff3/todoList')
//         .then((response) => {
//             console.log('Completed tasks:', response.data);
//             const taskDone = document.getElementById('task-done');
//             response.data.forEach((task) => {
//                 showListOnScreen(task);
//             });
            
//         })
//         .catch((error) => {
//             console.log(error);
//            // return [];
//         });
// }