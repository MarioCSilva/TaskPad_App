$(document).ready(function () {
    var users = JSON.parse(localStorage.getItem("users"));
    var user= users["currentUser"];
    var rm=user.reminders;

    $.each(rm, function (index, value) {
        var spec=value.split("/./");
        $("#grid").append(`
            <div class="col-sm-12">  
                <div class="container-login100-form-btn" style=" padding-top:0%" >
                    <div class="wrap-login100-form-btn" style="z-index:0;width: 100vw; position: relative; margin-left: -50vw; left: 50%; border-radius: 0%;">
                        <div class="login100-form-bgbtn"></div>
                        <button id="editbtn" style="cursor:default"  class="login100-form-btn" style="width: 100vw; position: relative; margin-left: -50vw; left: 50%;  font-weight:bold;font-size:1.15em">`+spec[0]+`</button>
                    </div>
                </div>
                <div class="row col-sm-12" style="display: table; min-height: 100px ;width: 100vw; position: relative; margin-left: -50vw; left: 50%;">
                     <i style="margin-top:37px;font-size:1.8em;color:black" class="fa fa-pencil fa-lg"></i>
                    <span style="display: table-cell; vertical-align: middle; text-align: center; border-right:  6px solid white; width: 30%; color: black; font-weight:bold;font-size:1.15em">`+spec[1]+`</span>
                    <span style="display: table-cell; vertical-align: middle; text-align: center; width: 70%;  color: black; font-weight:bold; font-size:1.15em">`+spec[2]+`</span>
                    <i  style="text-align:right; margin-top:30px;color:black;font-size:1.8em;"  class="fa fa-trash fa-lg" aria-hidden="true"></i>
                </div>
            </div>
        `)
    });

    $("#grid").append(`
        <div class="container" style="font-size: 80px;color: #000000;"  >
                <div class="title text-center"   id="myBtn">
                    <br>
                    <br>
                    <h1 class="mb-10">Add A Reminder</h1>
                    <br>
                    <br>
                    <i class="fa fa-plus-circle fa-10x"style=" position: absolute;left: 50%; transform: translate(-50%, -50%);" ></i>
                    <br>
                    <br>
                </div>
            </div>`);

    $("#addNote").click(function (event) {
        if ($("#date").val()=="" || $("#time").val()=="" || $("#note").val()==""){
            alert("Please fill all parameters;")
        } else{
            var res=new Date($("#date").val()).toDateString()+"/./"+$("#time").val()+"/./"+$("#note").val();
            console.log(res);
            users["currentUser"].reminders.push(res);
            users[users["currentUser"].username].reminders.push(res);
            localStorage.setItem("users", JSON.stringify(users));
            location.reload();
        }
    });


    var modal = document.getElementById("myModal");

    // Get the button that opens the modal
    var btn = document.getElementById("myBtn");
    
    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];
    
    // When the user clicks on the button, open the modal
    btn.onclick = function() {
      modal.style.display = "block";
    }
    
    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
      modal.style.display = "none";
    }
    
    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    }
});