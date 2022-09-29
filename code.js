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

    return {create, item};
})();

const edititem = (()=>{

    let edititem = 0;

    function edit(x){
        todoform.open();
        document.getElementById("title1").value = makeitems.itemlist[x].title;
        document.getElementById("desc1").value = makeitems.itemlist[x].description;
        document.getElementById("date1").value = makeitems.itemlist[x].duedate;

        if (makeitems.itemlist[x].priority == "Low priority"){
            document.getElementById("prio1").checked = true;
        } else if(makeitems.itemlist[x].priority == "Medium priority"){
            document.getElementById("prio2").checked = true;
        } else{
            document.getElementById("prio3").checked = true;
        }

        todoform.addsubmittype();
        edititem = x;
    }

    function submit1(){
        if(document.getElementById("title1").value == ""){
            return;
        }
        todoform.close();


        let radio = document.getElementsByName("prio1");
        let radio1 = "Low priority";
        for (let i=0;i<radio.length;i++){
            if(radio[i].checked){
                radio1 = radio[i].value;
                break;
            }
        }
        makeitems.modify(edititem,new additem.item(document.getElementById("title1").value,document.getElementById("desc1").value,document.getElementById("date1").value,radio1)); 
        


    }

    return {edit, submit1};

})();

const makeitems = (()=>{
    let itemlist = [];

    function modify(x,y){
        itemlist.splice(x,1,y);
        generate();
    }

    function append(item){
        itemlist.push(item);
    }

    function generate(){
        document.getElementById("container1").innerHTML = "";
        for (let i = 0; i<itemlist.length; i++){
            document.getElementById("container1").innerHTML += `<div class="container2">
            <div class="info2"> Title: ${itemlist[i].title}</div>
            <div class="info2">Due Date: ${itemlist[i].duedate}</div> 
            <div class="hidden1" id="hidden${i}">
            <div class="info2"> Description: ${itemlist[i].description}</div>
            <div class="info2">Priority: ${itemlist[i].priority}</div>
            <div class="info2">Done yet: ${itemlist[i].doneyet}</div>
            <button class="deltask" id="deltask${i}">Delete Task</button>
            <button class="edittask" id="edittask${i}">Edit Task</button>
            </div>
            <button class="dropdown" id="dropdown${i}">Expand</button>
          </div>`;
        }
        let deltasklist = document.getElementsByClassName("deltask");
        for (let i = 0; i<deltasklist.length;i++){
            deltasklist[i].addEventListener("click",()=>delete1(i));
        }
        let edittasklist = document.getElementsByClassName("edittask");
        for (let i = 0; i<edittasklist.length;i++){
            edittasklist[i].addEventListener("click",()=>edititem.edit(i));
        }
        let dropdown = document.getElementsByClassName("dropdown");
        for (let i = 0; i<dropdown.length;i++){
            dropdown[i].addEventListener("click",()=>dropdown1(i));
        }
    }

    function delete1(x){
        itemlist.splice(x,1);
        generate();
    }

    function dropdown1 (x){
        if ( document.getElementById(`hidden${x}`).className == "hidden1"){
        document.getElementById(`hidden${x}`).className = "visible1";}
        else {
            document.getElementById(`hidden${x}`).className = "hidden1";
        }
    }

    return {generate, append, modify, itemlist};

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
        document.getElementById("title1").value = "";
        document.getElementById("desc1").value = "";
        document.getElementById("date1").value = "";
        document.getElementById("prio1").checked = true;
        document.getElementById("form1").style.visibility = "visible";
        document.getElementById("popup1").style.visibility = "visible";
    }

    function close(){
        document.getElementById("form1").style.visibility = "hidden";
        document.getElementById("popup1").style.visibility = "hidden";
    }

    let submittype = 0;

    function addsubmittype(){
        submittype =1;
    }

    function submit(){
        if (submittype ==1){
            edititem.submit1();
            submittype = 0;
            return;
        } 

        if(document.getElementById("title1").value == ""){
            return;
        }

        todoform.close();


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

    return{open,close,submit,addsubmittype};

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










