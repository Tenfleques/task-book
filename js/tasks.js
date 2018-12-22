function taskRow(index,row){
    var view = "table-" + index % 3; //view regulates the pagination the row is in 
    html = '<tr class="'+view+'">';
    for(var f in row){
        if(f !== "finished"){
            html += '<td class="task-'+f+'">' + row[f] + '</td>';
        }
    } 
    return html;
}
$(function(){
    //task view controls
	function sortTable(table, field) {
		/**
		 * sort the table using the class of a given column and comparing the contents
		 */
		var asc = isDefined(arguments[2]),
					tbody = table.find('tbody');		

		tbody.find('tr').sort(function(a, b) {
			if (asc) 
				return $('td.'+field, a).text().localeCompare($('td.'+field, b).text());			
			else
				return $('td.'+field, b).text().localeCompare($('td.'+field,a).text());			
		}).appendTo(tbody);
	}	
	//sortTable($('#mytable'),'asc');

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
    }

    function toggleSortIcon(){
        /**
         * toggles the view of the sort icon relative to the available sort
         */

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

            loadTable(data,field,order); //refreshe the table view, sorted in the respective sort
        })
    });
    tasks.fail(ajaxExceptionhandler);

})