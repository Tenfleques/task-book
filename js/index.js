$(function(){
	var app = $.getJSON("/model/details/");
	function addressBox(){
		var html ="";
		var cons = arguments[0];
		for (var i in cons)
			if(cons[i].length)
				html += cons[i]+"<br>";
		return html;
	}


	app.done(function(appData){
		$("title").html(appData.title["ru"]);	
		for (var langTitle in appData.title){
			$(".title ." + langTitle).html(appData.title[langTitle]);	//populate all the title instances with respective language titles
			$("address ." + langTitle).html(addressBox(appData.contacts[langTitle])); //poulate all the address instances with respective language contacts
		}
	})
	app.fail(ajaxExceptionhandler);	 

})