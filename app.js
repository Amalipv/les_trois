//localStorage.setItem("today",JSON.stringify({"todo":["task1"],"inprog":["pask2","pask3"],"comp":["comp1","comp2"]}))
const panels = ["todo","inprogress","completed"];
const app = () => {
  const plusTodo = document.querySelector(".todo .plus");
  const inProTodo = document.querySelector(".inprogress .plus");
  const compTodo = document.querySelector(".completed .plus");

  const firstPanel = document.querySelector(".todo");
const secondPanel = document.querySelector(".inprogress");
const thirdPanel = document.querySelector(".completed");

  plusTodo.addEventListener("click", () => {
    //open dialog to get the value
    const task = prompt("Enter the task");
    addElements(task, panels[0]);
  });

  inProTodo.addEventListener("click", () => {
    const task = prompt("Enter the task");
    addElements(task, panels[1]);
  });

  compTodo.addEventListener("click", () => {
    const task = prompt("Enter the task");
    addElements(task, panels[2]);
  });
  
  const addElements = (task, panelName) => {
    console.log("Inside addElements");
     const panel = document.querySelector(`.${panelName}`);
    var divEle = document.createElement("div");
    divEle.setAttribute("class", "task");
    divEle.setAttribute("draggable","true");
    divEle.setAttribute("ondragstart","drag(event)");
    divEle.setAttribute("id",Date.now() / 1000 | 0);

    var checkbox = document.createElement("input");
    checkbox.type = "checkbox";

    var todo = document.createElement("input");
    todo.type = "text";
    todo.value = task;

    divEle.appendChild(checkbox);
    divEle.appendChild(todo);
    panel.appendChild(divEle);

    
  }

 
/*saves the list to LocalStorage*/
  const saveinLS = () => {
    for(var panel of panels){
       const texts=[];
      //get all the children of todo panel
       console.log(`saving in localstorage of ${panel}`);
      const toDoPanel = document.querySelector(`.${panel}`);
      console.log(toDoPanel);
      if(toDoPanel.hasChildNodes()){
        var childList = document.querySelectorAll(`.${panel} input[type='text'`);
        for(let ele of childList){
          texts.push(ele.value);
        }
          let todoList=[];
          todoList.push(texts);
          console.log(typeof(todoList));
          localStorage.setItem(panel, JSON.stringify(texts));
        console.log(localStorage.getItem(localStorage));
      }
    }
      
  }

   

  /* */
  const loadFromLS = () => {
    console.log("loading from localStorage");
    if(typeof(Storage) != undefined){
      
      for(var panel of panels){
        console.log(`getting item of ${panel}`);
        if(localStorage.getItem(panel) != ''){
        let items= JSON.parse(localStorage.getItem(panel));
        console.log(`Items present : ${items}`);
        for(var item of items){
          addElements(item, panel);
        }
      }
      }
      
    }
  }
  /*Check for existing Todos and load them from LS */
loadFromLS();

/*Calls the save method for every 5 seconds */
 const todoTimeout = setInterval(saveinLS,5000);

  
}
app();


const drag = (event) =>{
  console.log("drag called");
    event.dataTransfer.setData("ele", event.target.id);
  }

  const drop =(event) => {
    console.log("drop called");
    event.preventDefault();
    var data = event.dataTransfer.getData("ele");
    event.target.appendChild(document.getElementById(data));
  }

  const allowDrop = (event) => {
    console.log("allowdrop called");
    event.preventDefault();
  }

  //todo: save the list under the date. get localstorage and save the list. and rerender it.?
  //todo1: save the list to localstorage for every 10 seconds
  //todo2: render back the list to DOM
  //todo3: include date picker and store date as key
