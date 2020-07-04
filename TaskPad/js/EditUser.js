$(document).ready(function () {
    var users = JSON.parse(localStorage.getItem("users"));
   	updatedata();
    $('#editbtnprofile').click(function(){
        $('#pic1').css({ display : 'inline-block' })
        $('#pic2').css({ display : 'inline-block' })
        $('#pic3').css({ display : 'inline-block' })
        $('#form1').css({ display : 'block' })
        $('#normcontainer').css({ display : 'none' })
        $('#cancelbtn').show();
        teste();
    })

    function updatedata(){
        $('#username2').html(users["currentUser"].username);
        $('#name').attr('placeholder', users["currentUser"].name);
        $('#name').val(users["currentUser"].name);
        $('#name2').html(users["currentUser"].name);
        $('#email').attr('placeholder', users["currentUser"].email);
        $('#email').val(users["currentUser"].email);
        $('#password').val(users["currentUser"].password);
        $('#email2').html(users["currentUser"].email);
        $('#profilePic').attr('src', users["currentUser"].imageProfile);
        $('#confirmbtn').hide();
        $('#cancelbtn').hide();
    }
    

    function teste(){
    	$("input[type=text]").keyup(function() {
            $('#confirmbtn').show();
        })

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
    $("#confdelete").click(function (event) {
        window.location.assign("index.html")
    })
  
    /*==================================================================
    [ Validate ]*/
    var input = $('.validate-input .input100');
	var users = JSON.parse(localStorage.getItem("users"));
   
    $("#confirmbtn").click(function (event) {
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

        if(users["currentUser"].name!=$("#name").val()){
         users[users["currentUser"].username].name=$("#name").val();
    	 users["currentUser"].name=$("#name").val(); 
    
         }

        if(users["currentUser"].email!=$("#email").val()){
        	 if (!(contains(users, $("#email").val()))){
        	 	 users[users["currentUser"].username].email=$("#email").val();
        	 	 users["currentUser"].email=$("#email").val();
        	 }
        	 else{
        	 	alert("email already taken!");
        	 	return check;
        	 }
         }
          if(users["currentUser"].password!=$("#password").val()){
         users[users["currentUser"].username].password=$("#password").val();
    	 users["currentUser"].password=$("#password").val(); 
    
         }

        localStorage.setItem("users", JSON.stringify(users));
        updatedata();
        return check;
    });


    $('.validate-form .input100').each(function(){
        $(this).focus(function(){
           hideValidate(this);
        });
    });

//validate input for login and register
    function validate (input) {
    	//ver dps..
    	return true;
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
})(jQuery);;    
})