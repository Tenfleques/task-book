function taskRow(index,r){
    /**
     * create a task row. Addition of relative clases for toggling visibility via pagination and sort
     */
    var row = JSON.parse(JSON.stringify(r));
    var view = "table-" + index % 3; //view regulates the pagination the row is in 
    var html = ""
    var bg = (index%2)? "bg-faint" : "bg-transparent";
    var _id = row["_id"];
    delete row._id;

    var trclass = bg+' '+view;
    if(index %3)
       trclass += ' hidden '; 
    
    html += '<tr class="'+trclass+'" data-target ="'+_id+'" >';
    
    for(var f in row){
        html += '<td class="task-'+f+'">';
        if(f == "finished"){
            if(_id){ // there is editing rights
                html += '<input type="checkbox" class="form-check-input finish-task"';
                html += (row[f])? ' checked>' : '>';

                html += '<i class="activate-edit-task pull-right fa fa-pencil"></i>'
            }else{
                html += '<i class="fa ';
                html += (row[f])? " fa-check text-success": " fa-times text-danger";
                html += '"></i>';
            }
            
        }else{
            html += row[f];
        }
        html += '</td>';
    } 
    html += '</tr>';
    return html;
}
$(function(){
    function fillAndActivateTable(data){
        loadTable(data);
        $("#task-view-table").on("click",".sort-rows",function(){
            var order = $(this).data("order");
            var field = $(this).data("field");

            $(this).find("i").addClass("hidden");
            var toggledOrder = "asc";

            if(order == "asc"){ //activate the desc view icon
                toggledOrder = "desc";
                $(this).find("i.fa-sort-down").removeClass("hidden");
            }else{
                $(this).find("i.fa-sort-up").removeClass("hidden");
            }
            $(this).data("order", toggledOrder);

            loadTable(data,field,order); //refresh the table view, sorted in the respective sort
        })
    }
    function loadTable(data){
        var rows = "";
        if(isDefined(arguments[1])){ //sort field
            var field = arguments[1];
            var order = isDefined(arguments[2]) ? arguments[2] : "asc";
            data = data.sort(function(a,b){
                if(order == "asc")
                    return a[field].localeCompare(b[field]);
                else
                return b[field].localeCompare(a[field]);
            })
        }
        for(var row in data){
            rows += taskRow(row, data[row]);
        }
    

        $(".task-view-body").html(rows)
                            .on("click",".finish-task",function(){ //update task finish status
                                /**
                                 * activates the functionality of task finish by the admin
                                 */
                                var target = $(this).parents("tr").data("target");
                                var updateTask = $.post("/model/updateTask/", {"target": target});
                                updateTask.done(function(updateResponse){
                                    console.log(updateResponse)
                                });
                                updateTask.fail(ajaxExceptionhandler);
                            });


        $(".page-link").on("click",function(){ // pagination event
            $(".page-link").removeClass("active");
            var target;
            if(isDefined($(this).data("target"))){
                $(this).addClass("active");
                target = $(this).data("target");
            }
            //todo add next and previous functionality.

            $(".task-view-body").find("tr").addClass("hidden");
            $(".task-view-body").find("."+target).removeClass("hidden");
            
        })
        $(".task-view-body").on("click",".activate-edit-task",function(){ //initiate edit row 
            var parent = $(this).parents("tr");
            $("hidden#task_id").val(parent.data("target"));
            $("input#username").val(parent.children("td.task-username").text()).prop("readonly",true);
            $("input#email").val(parent.children("td.task-email").text()).prop("readonly",true);
            $("textarea#task-text").val(parent.children("td.task-text").text());
        })
    }

    
    //load task views
    var tasks = $.get("/model/getTasks/");
    tasks.done(fillAndActivateTable);
    tasks.fail(ajaxExceptionhandler);

    //add tasks
    $(".submit-task").on("submit",function(e){
        e.preventDefault();

        var payload = {
            "username" : $("input#username").val(),
            "email" : $("input#email").val(),
            "text" : $("textarea#task-text").val(),
            "_id" : $("input#task_id").val()
        }

        var addtasks = $.post("/model/putTask/", payload);
        addtasks.done(function(putResponse){
            //enable inputs, had they been disabled by task text edit by admin
            $("input#username").prop("readonly",false); 
            $("input#email").prop("readonly",false); 
            //cleans the form 
            document.getElementById("submit-task").reset();
            fillAndActivateTable(putResponse);
        });
        addtasks.fail(ajaxExceptionhandler);
    });

})