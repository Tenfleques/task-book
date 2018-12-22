function taskRow(index,row){
    var view = "table-" + index % 3; //view regulates the pagination the row is in 
    var html = ""
    if(index %3)
        html += '<tr class="hidden '+view+'">';
    else    
        html += '<tr class="'+view+'">';
    for(var f in row){
        if(f !== "finished"){
            html += '<td class="task-'+f+'">' + row[f] + '</td>';
        }
    } 
    html += '</tr>';
    return html;
}
$(function(){
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
        $(".task-view-body").html(rows);
        $(".page-link").on("click",function(){
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
    }

    //load task views
    var tasks = $.get("/model/getTasks/");
    tasks.done(function(data){
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
    });
    tasks.fail(ajaxExceptionhandler);

})