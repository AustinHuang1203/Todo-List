const additem = (()=> {

    function item(title,description,duedate,priority,doneyet="No"){
        this.title = title;
        this.description = description;
        this.duedate = duedate;
        this.priority = priority;
        this.doneyet = doneyet;
    }

    let itemlocation = -1;

    function modify(x){
        itemlocation = x;
    }

    function create(title,description="",duedate="None",priority,doneyet="No"){
        let task = new item(title,description,duedate,priority,doneyet);
        if (itemlocation == -1){
            makeitems.append(task);
        }
        else{
            addproj.append(task,itemlocation);
        }
        makeitems.generate();
    }

    return {create, item,modify};
})();

const edititem = (()=>{

    let edititem = 0;
    let currentitem = -1;

    function modify(x){
        currentitem = x;
    }

    function edit(x){
        todoform.open();
        if (currentitem == -1){
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
        }
        else{
            document.getElementById("title1").value = addproj.projlist[currentitem].contents[x].title;
            document.getElementById("desc1").value = addproj.projlist[currentitem].contents[x].description;
            document.getElementById("date1").value = addproj.projlist[currentitem].contents[x].duedate;
            
    
            if (addproj.projlist[currentitem].contents[x].priority == "Low priority"){
                document.getElementById("prio1").checked = true;
            } else if(addproj.projlist[currentitem].contents[x].priority == "Medium priority"){
                document.getElementById("prio2").checked = true;
            } else{
                document.getElementById("prio3").checked = true;
            }
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

        let doneyet2 = "Done!"
        if(document.getElementById("doneyet1").checked){
            doneyet2 = "Done!";
        }
        else{
            doneyet2 ="Not Done :("
        }

        if (currentitem == -1){
            console.log("wrong")
            makeitems.modify(edititem,new additem.item(document.getElementById("title1").value,document.getElementById("desc1").value,document.getElementById("date1").value,radio1,doneyet2)); 
        }
        else{
            addproj.modify(edititem,new additem.item(document.getElementById("title1").value,document.getElementById("desc1").value,document.getElementById("date1").value,radio1,doneyet2)); 
        }
        


    }

    return {edit, submit1,modify};

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

    // for projects to reassign item list
    let itemlistgenerate = itemlist;
    function reassign1(x){
        itemlistgenerate = x;
    }

    function reassign2(){
        itemlistgenerate = itemlist;
        addproj.sethome();
        additem.modify(-1);
        edititem.modify(-1);
        generate();
    }

    function generate(){
        document.getElementById("container1").innerHTML = "";
        for (let i = 0; i<itemlistgenerate.length; i++){
            document.getElementById("container1").innerHTML += `<div class="container2">
            <div class="info2"> Title: ${itemlistgenerate[i].title}</div>
            <div class="info2">Due Date: ${itemlistgenerate[i].duedate}</div> 
            <div class="hidden1" id="hidden${i}">
            <div class="info2"> Description: ${itemlistgenerate[i].description}</div>
            <div class="info2">Priority: ${itemlistgenerate[i].priority}</div>
            <div class="info2">Done yet: ${itemlistgenerate[i].doneyet}</div>
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
        if (itemlist == itemlistgenerate){
            itemlist.splice(x,1);
        }
        else{
            addproj.deleteitem(x);
        }
        generate();
    }

    function dropdown1 (x){
        if ( document.getElementById(`hidden${x}`).className == "hidden1"){
        document.getElementById(`hidden${x}`).className = "visible1";}
        else {
            document.getElementById(`hidden${x}`).className = "hidden1";
        }
    }

    return {generate, append, modify, itemlist, reassign1, reassign2};

})();

const addproj =(()=> {

    let projlist=[]
    let currentitem = -1;

    function sethome (){
        currentitem = -1;
    }

    function proj1(title){
        this.title = title;
        this.contents = [];
    }

    function modify(x,y){
        projlist[currentitem].contents.splice(x,1,y);
        makeitems.generate();
    }

    function generate(){
        document.getElementById("sidecontents2").innerHTML = "";
        for(let i = 0;i<projlist.length;i++){
            document.getElementById("sidecontents2").innerHTML += `<div class="projbar" id="projbar${i}">
            ${projlist[i].title}
          </div>`
        }
        for (let i = 0; i<projlist.length;i++){
            document.getElementById(`projbar${i}`).addEventListener("click",()=>makeproj(i));
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

    function makeproj(x){
        makeitems.reassign1(projlist[x].contents);
        additem.modify(x);
        currentitem = x;
        edititem.modify(x);
        makeitems.generate();

    }

    function append(x,y){
        projlist[y].contents.push(x);
    }

    function deleteitem(x){
        projlist[currentitem].contents.splice(x,1);
    }

    return {create,append,currentitem,deleteitem,sethome,modify,projlist};

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

        let doneyet2 = "Done!"
        if(document.getElementById("doneyet1").checked){
            doneyet2 = "Done!";
        }
        else{
            doneyet2 ="Not Done :("
        }

        additem.create(document.getElementById("title1").value,document.getElementById("desc1").value,document.getElementById("date1").value,radio1,doneyet2);
        


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
        document.getElementById("homeprojbar").addEventListener("click",makeitems.reassign2);
    }

    return {start};

})();







// run at start
initialise.start();










