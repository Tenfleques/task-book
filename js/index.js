function toggleSmallScreenNavControl(){
	// small screen navigation events 
	$('#nav-icon').click(function(){
		$(this).toggleClass('open');
		$(".ham-container").toggleClass("border border-left-0 border-right-0 border-dark open pr-4");
		$(".left,.ham-title").toggleClass('open');
		$("body").toggleClass("frozen");
	});
	// close navigation sidebar after sidemenu link click
	$(".sidemenu.left").on("click",".link-goto",function(){
		$("#nav-icon").toggleClass('open');
		$(".ham-container").toggleClass("border border-left-0 border-right-0 border-dark open pr-4");
		$(".left,.ham-title").toggleClass('open');
		$("body").toggleClass("frozen");
	})
}  
function internationale(){
	/**
	 * for toggling between Ru and En languages
	 */
	var lang = getCookie("lang");
	if(lang==""){
		setCookie("lang","ru",365);
		lang = "ru";
	}			
	$(".lang").addClass("hidden");
	$(".lang").css("visibility","visible");
	$(".lang."+lang).removeClass("hidden");
}	
function toggleInternationale(){
	/** переключитель языков
	 * 
	 */
	var lang = $(this).find(":selected").text();
	setCookie("lang",lang,365);
	internationale();
}	
function initInternationalization(){
	var lang = getCookie("lang");
	$(".international").val(lang);
	internationale();
	$(".international").on("change",toggleInternationale)
}

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
			$(".title." + langTitle).html(appData.title[langTitle]);	//populate all the title instances with respective language titles
			$("address." + langTitle).html(addressBox(appData.contacts[langTitle])); //poulate all the address instances with respective language contacts
		}
	})
	app.fail(ajaxExceptionhandler);	
	initInternationalization()
})