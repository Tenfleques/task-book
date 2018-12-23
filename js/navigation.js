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
        
        $(".wide-screen-nav").html(wideScreenNavs).on("click", "a", processNavAction); //populates widescreen navigation
        $(".small-screen-nav").html(smallScreensNavs).on("click", "a", processNavAction); //populates smallscreen navigation
    }
    function processNavAction(e){
        switch ($(this).attr("href")){
            case "#logout" : {
                var token = getCookie("token");
                setCookie("token","");
                var logout = $.post("/model/logout/", {"token": token});
                logout.done(function(data){
                    window.location.href = "index.html";
                })
            }
        }        
    }
    var reqNavs = $.post("/model/navigation/", {token: getCookie("token")});
    reqNavs.done(function(data){
        fillNavs(data);
        toggleSmallScreenNavControl();
        initInternationalization();
    });
    reqNavs.fail(ajaxExceptionhandler);
})