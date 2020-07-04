$(document).ready(function () {
 var users = JSON.parse(localStorage.getItem("users"));
 var user= users["currentUser"];
 var rm=user.invitations;
 var counter=-1
 $.each(rm, function (index, value) {
 	var spec=value.split("/");
 	counter+=1
 	$("#invitesgrid").append(`<div  id="card` +  counter + `" class="col-lg-4 py-2">
     <div class="card h-100"  style="border-bottom-left-radius: 10%; border-bottom-right-radius: 10%;">
                    <div class="card-header" >
                        <h4>` + spec[0] + ` </h4>
                    </div>
                <div class="card card-body h-100" >
                    <div style="border-width: 3x;border-style: groove;">
                        <h5 >Invitation sent by :</h5>
                        <p  id="inviter" style="margin-bottom: 0px"> ` + spec[1] + `</p>
                        <h5 >Page Description:</h5>
                        <p  id ="description"style="margin-bottom: 0px"> ` + spec[2] +  `</p> 
                       </div>  
                 </div>
                  <div class="container-login100-form-btn">
                        <div class="wrap-login100-form-btn btn-group" style="border-top-left-radius:0px;border-top-right-radius:0px">
                            <div class="login100-form-bgbtn" ></div>
                            <button id="joinbtn` + counter + `" class="login100-form-btn "  onclick="checkButton(this);" >Join Page</button>
                             <button id="removebtn` + counter + `" class="login100-form-btn "  onclick="checkButton(this);" >Remove Invite</button>
                            </div>
                        </div>
               </div>
            </div> `);

 		
 });

});

function checkButton(btn) {
 var users = JSON.parse(localStorage.getItem("users"));
 var pagemembers=JSON.parse(localStorage.getItem("pagemembers"));
 var user= users["currentUser"];
 var rm=user.invitations;
 var id = String(btn.id)
 var pagememberskey;

 if(id.includes("joinbtn")){
        var counter=parseInt(id.substring(7,8))
   		var inviter=rm[counter].split("/")[1]
        var pagename=rm[counter].split("/")[0]
        var pagedescrip=rm[counter].split("/")[2]
        var inviterpages=users[inviter].pages
   		for(i =0; i< inviterpages.length;i++){
   			if (inviterpages[i].split("/")[0]==pagename) {
                pagememberskey=pagename+"/"+pagedescrip;
                pagemembers[pagememberskey].personlist.push(user.username)
                user.pages.push(inviterpages[i])
                users[users["currentUser"].username].pages.push(inviterpages[i])
                break;
            }
        }

   		user.invitations.splice(counter,1);
        users[users["currentUser"].username].invitations.splice(counter,1);
        localStorage.setItem("users", JSON.stringify(users));
        localStorage.setItem("pagemembers", JSON.stringify(pagemembers));
        location.reload()
   }
   else{
        var counter=parseInt(id.substring(9,10))
     
   		user.invitations.splice(counter,1);
        users[users["currentUser"].username].invitations.splice(counter,1);
   	    localStorage.setItem("users", JSON.stringify(users));
    	location.reload();
    }

  }
