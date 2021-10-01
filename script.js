const input = document.querySelector('#addTask input');
const submit = document.querySelector('#addTask button'); 
const doneBtn = document.querySelector('.fa-check-circle');
const cancelBtn = document.querySelector('.fa-times-circle');
const ulList = document.querySelector('ul');
const filter = document.querySelector('.filter');
const popUp = document.querySelector('#popUp');
const yesPopUp = document.querySelector('.yesBtn');
const noPopUp = document.querySelector('.noBtn');

loadEventListeners();

function loadEventListeners(){
    document.addEventListener('DOMContentLoaded', getTasks);
    submit.addEventListener('click', addTask);
    ulList.addEventListener('click', deleteTask);
    ulList.addEventListener('click', doneTask);
    filter.addEventListener('keyup', FilterTasks);
};

function getTasks(){
    let tasks; 
    if (localStorage.getItem('tasks') === null){
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'))
    } 
    tasks.forEach(function(task){
        const toDo = document.createElement('div');
        toDo.className = 'todo__marks';
        const p = document.createElement('p');
        p.appendChild(document.createTextNode(task));
        const tick = document.createElement('i');
        const bump = document.createElement('i');
        tick.className = 'fas fa-check-circle';
        bump.className = 'fas fa-times-circle';
        const li = document.createElement('li');
        li.appendChild(p);
        toDo.appendChild(tick);
        toDo.appendChild(bump);
        li.appendChild(toDo);
        ulList.appendChild(li);
    }
    )
};

function storeTaskInLocalStorage (task){
    let tasks; 
    if (localStorage.getItem('tasks') === null){
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'))
    };
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
};

function addTask (e) {
    if (input.value === ""){
        alert('Add something...')
    }
    else {
        const toDo = document.createElement('div');
        toDo.className = 'todo__marks';
        const p = document.createElement('p');
        p.appendChild(document.createTextNode(input.value));
        const tick = document.createElement('i');
        const bump = document.createElement('i');
        tick.className = 'fas fa-check-circle';
        bump.className = 'fas fa-times-circle';
        const li = document.createElement('li');
        li.appendChild(p);
        toDo.appendChild(tick);
        toDo.appendChild(bump);
        li.appendChild(toDo);
        ulList.appendChild(li);
        storeTaskInLocalStorage(input.value);
        input.value = '';
    };
    e.preventDefault();
};
function deleteTask (e) {
    if(e.target.className == 'fas fa-times-circle'){
        popUp.style.display = 'block';
        yesPopUp.addEventListener('click',function(){
            e.target.parentElement.parentElement.remove();
            popUp.style.display = 'none';
        });
        noPopUp.addEventListener('click',function(){
            popUp.style.display = 'none';
        });
        removeFromLocalStorage(e.target.parentElement.parentElement)
    };
};
function removeFromLocalStorage (taskItem){
    let tasks; 
    if (localStorage.getItem('tasks') === null){
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'))
    };
    tasks.forEach(
        function(task, index){
            if (taskItem.textContent === task) {
                tasks.splice(index, 1);
            }
        }
    )
    localStorage.setItem('tasks', JSON.stringify(tasks));
};
function doneTask (e) {
    if(e.target.className == 'fas fa-check-circle'){
        e.target.parentElement.parentElement.remove();
        removeFromLocalStorage(e.target.parentElement.parentElement)
    };
};
function FilterTasks (e){
    const text = e.target.value.toLowerCase();

    document.querySelectorAll('li').forEach(
        function(task){
            const item = task.firstChild.textContent;
            if(item.toLowerCase().indexOf(text) != -1){
                task.style.display = 'flex'
            } 
            else { 
                task.style.display = 'none'
            };
        }
    )
};