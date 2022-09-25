const additem = (()=> {

    function item(title,description,duedate,priority,doneyet=false){
        this.title = title;
        this.description = description;
        this.duedate = duedate;
        this.priority = priority;
        this.doneyet = doneyet;
    }

    function create(title,description="",duedate="None",priority,doneyet=false){
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
        for (let i = 0; i<itemlist.length; i++){
            console.log(itemlist[i].title);
        }
    }

    return {generate, append};

})();

const addproj =(()=> {

    function proj(title){
        this.title = title;
        this.contents = [];
    }

    function create(title){
        proj(title);
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
        if(document.getElementById("title1").value == ""){
            return;
        }


        let radio = document.getElementsByName("prio1");
        let radio1 = "Low priority";
        for (let i=0;i<radio.length;i++){
            if(radio[i].checked){
                radio1 = radio[i];
                break;
            }
        }
        console.log(document.getElementById("date1").value);

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
    }

    return {start};

})();







// run at start
initialise.start();










