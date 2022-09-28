const additem = (()=> {

    function item(title,description,duedate,priority,doneyet="No"){
        this.title = title;
        this.description = description;
        this.duedate = duedate;
        this.priority = priority;
        this.doneyet = doneyet;
    }

    function create(title,description="",duedate="None",priority,doneyet="No"){
        let task = new item(title,description,duedate,priority,doneyet);
        makeitems.append(task);
        makeitems.generate();
    }

    return {create};
})();

const makeitems = (()=>{
    let itemlist = [];

    function append(item){
        itemlist.push(item);
    }

    function generate(){
        document.getElementById("container1").innerHTML = "";
        for (let i = 0; i<itemlist.length; i++){
            document.getElementById("container1").innerHTML += `<div class="container2">
            <div class="info2"> Title: ${itemlist[i].title}</div>
            <div class="info2">Due Date: ${itemlist[i].duedate}</div> 
            <div class="info2 hidden1"> Description: ${itemlist[i].description}</div>
            <div class="info2 hidden1">Priority: ${itemlist[i].priority}</div>
            <div class="info2 hidden1">Done yet: ${itemlist[i].doneyet}</div>
            <button class="deltask" id="deltask${i}">Delete Task</button>
          </div>`;
        }
        let deltasklist = document.getElementsByClassName("deltask");
        for (let i = 0; i<deltasklist.length;i++){
            deltasklist[i].addEventListener("click",()=>delete1(i));
        }
    }

    function delete1(x){
        itemlist.splice(x,1);
        generate();
    }

    return {generate, append};

})();

const addproj =(()=> {

    let projlist=[]

    function proj1(title){
        this.title = title;
        this.contents = [];
    }

    function generate(){
        document.getElementById("sidecontents2").innerHTML = "";
        for(let i = 0;i<projlist.length;i++){
            document.getElementById("sidecontents2").innerHTML += `<div class="projbar">
            ${projlist[i].title}
          </div>`
        }
    }

    function create(){
        if(document.getElementById("projname1").value == ""){
            return;
        }

        let proj = new proj1(document.getElementById("projname1").value);
        projlist.push(proj);
        generate();
    }

    return {create};

})();

const todoform = (()=> {

    function open(){
        document.getElementById("form1").style.visibility = "visible";
        document.getElementById("popup1").style.visibility = "visible";
    }

    function close(){
        document.getElementById("form1").style.visibility = "hidden";
        document.getElementById("popup1").style.visibility = "hidden";
    }

    function submit(){
        todoform.close();

        if(document.getElementById("title1").value == ""){
            return;
        }


        let radio = document.getElementsByName("prio1");
        let radio1 = "Low priority";
        for (let i=0;i<radio.length;i++){
            if(radio[i].checked){
                radio1 = radio[i].value;
                break;
            }
        }

        additem.create(document.getElementById("title1").value,document.getElementById("desc1").value,document.getElementById("date1").value,radio1);


    }

    return{open,close,submit};

})();


const initialise = (()=> {

    function start(){
        document.getElementById("openbutton").addEventListener("click",todoform.open);
        document.getElementById("popup1").addEventListener("click",todoform.close);
        document.getElementById("cbutton").addEventListener("click",todoform.close);
        document.getElementById("addtodo1").addEventListener("click",todoform.submit);
        document.getElementById("projbut").addEventListener("click",addproj.create);
    }

    return {start};

})();







// run at start
initialise.start();










