const additem = (()=> {

    function item(title,description,duedate,priority,doneyet=false){
        this.title = title;
        this.description = description;
        this.duedate = duedate;
        this.priority = priority;
        this.doneyet = doneyet;
    }

    function create(title,description,duedate,priority,donyet=false){
        makeitems.append(item(title,description,duedate,priority,donyet));
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

    return{open,close};

})();


const initialise = (()=> {

    function start(){
        document.getElementById("openbutton").addEventListener("click",todoform.open);
        document.getElementById("popup1").addEventListener("click",todoform.close);
    }

    return {start};

})();







// run at start
initialise.start();










