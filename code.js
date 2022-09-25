const additem = (()=> {

    function item(title,description,duedate,priority,doneyet=false){
        this.title = title;
        this.description = description;
        this.duedate = duedate;
        this.priority = priority;
        this.doneyet = doneyet;
    }

    function create(title,description,duedate,priority,donyet=false){
        return item(title,description,duedate,priority,donyet);
    }

    return {create};
})();

const addproj =(()=> {

    function proj(title){
        this.title = title;
        this.contents = [];
    }

})();