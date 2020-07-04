    
$(document).ready(function () {
class PageMember{
    constructor(pagename,personlist){
        this.pagename=pagename;
        this.personlist=personlist;
    }
}
  var users = JSON.parse(localStorage.getItem("users"));
  var user= users["currentUser"];
  var pages = user.pages

  $.each(pages, function (index, value) {
    $("#grid").append(`
    <a href="Page.html#`+value.split("//")[0].split("/")[0].split(" ").join("_")+`">
    <div class="card  bg-dark text-white " style="margin-bottom:15px; ">
    <div class="card-header row" style="width:100%;margin-left:2px"><div style="width:80%">`+value.split("//")[0].split("/")[0]+`</div>
    <div style="width:20%;text-align:right"><i class="fa fa-lg fa-arrow-right" aria-hidden="true"></i></div>
    </div>
    <div class="card-body bg-light  text-dark">`+value.split("//")[0].split("/")[1]+`</div>
    </div></a>
    `);
  });

  $("#addTask").click(function (event) {
    if ($("#name").val()=="" || $("#desc").val()==""){
      alert("Please fill name and description of the page");
    } else{
      var res=$("#name").val()+"/"+$("#desc").val()
      var user=$("#col").val();
      var flag=false;
      $.each(users,function(index,value){
         if(value.username == user){
           flag=true
         }
      });
      if(!flag && user.length>0){
        alert("User not found!")
      }
      else {
        var invite= $("#name").val()+"/" + users["currentUser"]. username +"/"+ $("#desc").val()
        var pagemembers=JSON.parse(localStorage.getItem("pagemembers"));
        pagemembers[res]= new PageMember(res,[users["currentUser"].username])
        console.log(pagemembers[res])
        if (user.length>0){
        users[user].invitations.push(invite)}
        users["currentUser"].pages.push(res);
        users[users["currentUser"].username].pages.push(res);
        localStorage.setItem("users", JSON.stringify(users));
        localStorage.setItem("pagemembers", JSON.stringify(pagemembers));
       location.reload();
      }

        
      
     
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