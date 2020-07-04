class User {
    constructor(username, password, name, email, imageProfile, invitations, pages, reminders) {
        this.username=username;
        this.name = name;
        this.email = email;
        this.imageProfile = imageProfile;
        this.password = password;
        this.invitations=invitations;
        this.pages=pages;
        this.reminders=reminders;
    }
}

function contains(a, obj) {
    for (key in a) {
        if (key==obj){
            return true;
        }
    }
    return false;
}
(function ($) {
    "use strict";


    /*==================================================================
    [ Focus input ]*/
    $('.input100').each(function(){
        $(this).on('blur', function(){
            if($(this).val().trim() != "") {
                $(this).addClass('has-val');
            }
            else {
                $(this).removeClass('has-val');
            }
        })    
    })
  
  
    /*==================================================================
    [ Validate ]*/
    var input = $('.validate-input .input100');

    $("#loginbtn").click(function () {
        var check = true;

        for(var i=0; i<input.length; i++) {
            if(validate(input[i]) == false){
                showValidate(input[i]);
                check=false;
            }
        }
        if (check==false){
            return false;
        }

        var users = JSON.parse(localStorage.getItem("users"));

        var username = $("#username").val();
        var password = $("#password").val();
        var val;
        if(username.length==0 && password.length==0){
           console.log("invalid login")
        }
        else{
            $.each(users, function (index, value) {
                if (username==value.username && password==value.password){
                    val=true;
                    users["currentUser"].username=value.username;
                    users["currentUser"].password=value.password;
                    users["currentUser"].name=value.name;
                    users["currentUser"].email=value.email;
                    users["currentUser"].invitations=value.invitations;
                    users["currentUser"].imageProfile=value.imageProfile;
                    users["currentUser"].pages=value.pages;
                    users["currentUser"].reminders=value.reminders;
                    localStorage.setItem("users", JSON.stringify(users));
                    window.location.assign("Pages.html");
                }
            });
            console.log("invalid login 2")

   		}
        
        return check;
    });

    $("#retPass").click(function(event){
        var check = true;

        for(var i=0; i<input.length; i++) {
            if(validate(input[i]) == false){
                showValidate(input[i]);
                check=false;
            }
        }
        if (check==false){
            return false;
        }
        var x = document.getElementById("emailsent");
        var y = document.getElementById("email");
        if (x.style.display === "none" & y.value!="") {
            x.style.display = "block";
          } else {
            x.style.display = "none";
          }
    })


    $("#regbtn").click(function (event) {
        var check = true;

        for(var i=0; i<input.length; i++) {
            if(validate(input[i]) == false){
                showValidate(input[i]);
                check=false;
            }
        }
        if (check==false){
            return false;
        }

        var users = JSON.parse(localStorage.getItem("users"));

        if (!(contains(users, $("#username").val()))) {
            if (!(contains(users, $("#email").val()))) {
                var name = $("#name").val();
                var username = $("#username").val();
                var password = $("#pass").val();
                var email = $("#email").val();
                var user = new User(username, password, name, email,"https://img.tineye.com/result/f7479eed5d3fd4da70043343f1d7176fcd15b4cc1c67ecfd4d2295efa10964a1?size=160", [], [], []);
                users[user.username]= user;
                users["currentUser"]=user;
                localStorage.setItem("users", JSON.stringify(users));
                window.location.assign("Pages.html");
            }
            else {
                alert("Email already taken.");
            }
        } else {
            alert("Username already taken.");
        }

        return check;
    });


    $('.validate-form .input100').each(function(){
        $(this).focus(function(){
           hideValidate(this);
        });
    });

//validate input for login and register
    function validate (input) {
        if($(input).attr('type') == 'email' || $(input).attr('name') == 'email') {
            if($(input).val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
                return false;
            }
        }
        else if ($(input).attr('name') == 'name'){
            if ($(input).val().trim().length<2){
                return false;
            }
        }
        else if( $(input).attr('name') =='username' || $(input).attr('name') == 'password'){
            if ($(input).val().trim().length<5){
                return false;
            }
        }
        else if ($(input).attr('name') == 'confpass'){
            if($(input).val().trim()!= $('#password').val().trim()  && ( $(input).val().trim().length >0  || $('#password').val().trim().length >0 ) ) {
                return false
            }
        }
        if($(input).val().trim() == ''){
            return false;
        }
    }
 
    function showValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).addClass('alert-validate');
    }

    function hideValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).removeClass('alert-validate');
    }
    
    /*==================================================================
    [ Show pass ]*/
    var showPass = 0;
    $('.btn-show-pass').on('click', function(){
        if(showPass == 0) {
            $(this).next('input').attr('type','text');
            $(this).find('i').removeClass('zmdi-eye');
            $(this).find('i').addClass('zmdi-eye-off');
            showPass = 1;
        }
        else {
            $(this).next('input').attr('type','password');
            $(this).find('i').addClass('zmdi-eye');
            $(this).find('i').removeClass('zmdi-eye-off');
            showPass = 0;
        }
        
    });


})(jQuery);