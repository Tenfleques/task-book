function wideScreenNavItem(navItem){
    /** generates the html for a wide screen navigation item 
     * navItem = {
     *              active: "active" | "",
     *              url: "path to asset"| "/",
     *              caption : {
     *                      "en" : "english caption" | ""
     *                      "ru" : "russian caption" | ""
     *                  }
     *           }
    */
    html = '<li class="nav-item link-box" >';
    html +='    <a class="nav-link text-right link-goto '+navItem.active+'" href="'+navItem.url+'" role="button" aria-expanded="false">';
    html +='        <span class = "hidden lang en">'+navItem.caption.en+'</span> ';
    html +='        <span class = "hidden lang ru">'+navItem.caption.ru+'</span> ';
    html +='    </a>';
    html +='</li>';
    return html;
}
function smallScreenNavItem(navItem){
    /** generates the html for a wide screen navigation item 
     * navItem = {
     *              active: "active" | "",
     *              url: "path to asset"| "/",
     *              caption : {
     *                      "en" : "english caption" | ""
     *                      "ru" : "russian caption" | ""
     *                  }
     *           }
    */
    html = '<a href="'+navItem.url+'" class="list-group-item list-group-item-action m-0 pl-1 text-dark border-0 link-goto bg-transparent '+navItem.active+'">';
    html +='        <span class = "hidden lang en">'+navItem.caption.en+'</span> ';
    html +='        <span class = "hidden lang ru">'+navItem.caption.ru+'</span> ';
    html +='</a>';
    return html;
}


$(function(){
    function fillNavs(navData){
        /** require json array of navigation items. 
         * creates html of navigation items and populate the respective navigation areas
         * 
        */
        var smallScreensNavs = "", //html for smaller screens 
            wideScreenNavs = ""; //html for wider screens

        for (var i in navData){
            smallScreensNavs += smallScreenNavItem(navData[i]);
            wideScreenNavs += wideScreenNavItem(navData[i]);
        }
        
        $(".wide-screen-nav").html(wideScreenNavs); //populates widescreen navigation
        $(".small-screen-nav").html(smallScreensNavs); //populates smallscreen navigation
    }
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
 
    var reqNavs = $.post("/model/navigation/");
    reqNavs.done(function(data){
        fillNavs(data);
        internationale();
        $(".international").on("change",toggleInternationale)
        toggleSmallScreenNavControl()
    });
    reqNavs.fail(ajaxExceptionhandler);
})