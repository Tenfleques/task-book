$(function(){
    //check if the admin is already registered
    var getUsers = $.get("/model/getUsers/");
    getUsers.done(function(data){
        if(!data){
            $(".register-admin").removeClass("hidden");
        }else{
            $(".use-admin").removeClass("hidden");
        }
    })
    getUsers.fail(ajaxExceptionhandler);

    //register the admin
    $(".register-admin").on("click", function(e){
        payload = {};
        var reg = $.post("/model/registration/",payload);
        reg.done(function(data){
            console.log(data);
        })
        reg.fail(ajaxExceptionhandler);
    })

    //login submit event
    $(".submit-user").on("submit", function(e){
        e.preventDefault();
        var payload = {
            "username" : $("input#username").val(),
            "password" : $("input#password").val()
        };
        var login = $.post("model/authorization/", payload);
        login.done(function(data){
            //console.log(data);  
            if(data.success){
                setCookie("token", data.token);
                window.location.href = "index.html";
            }else{
                $(".error-credentials").removeClass("hidden");
            }
        })
        login.fail(ajaxExceptionhandler);
    })
})