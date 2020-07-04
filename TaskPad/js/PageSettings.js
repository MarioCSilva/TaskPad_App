$(document).ready(function () {
    class PageMember{
        constructor(pagename,personlist){
            this.pagename=pagename;
            this.personlist=personlist;
        }
    }
    $('[data-toggle="popover"]').each(function() {

        $(this).placement = 'right';// For dynamic position
        $(this).boundary= 'right'; // Used for tooltip boundary range
      });
      
    $('[data-toggle="popover"]').popover();
    var users = JSON.parse(localStorage.getItem("users"));
    var pagemembers = JSON.parse(localStorage.getItem("pagemembers"));
    var user= users["currentUser"];
    var pages = user.pages
    var url = window.location.href.split("#")[1];
    url = url.split("_").join(" ");
    var page;
    var pageMemb;
    
    $.each(pages, function (index, value) {
        if (value.split("/")[0]==url){
            page=value;
            return page;
        }
    })
    var pageind=0;
    var found=false
    $.each(pagemembers, function (index, value) {
        if (value.pagename==page){
            found=true
            pageMemb=value;
            return pageMemb;
        }
        if (found==false){
            pageind+=1;
        }
    })
    console.log(pageind)
    page=page.split("//")
    
    var title=page[0].split("/")[0]
    $("#goback").attr("href","Page.html#"+title.split(" ").join("_"));
    var desc=page[0].split("/")[1]
    var newdesc=desc
    var newtitle=title
    var members=pageMemb.personlist;

    $("#pagetitle").val(title);
    $("#pagedesc").val(desc);

    $.each(members, function (index, value) {
        if (value==users["currentUser"].username){
            $("#memberpart").append(`
            <div class="row" style="width: 100%;">
                <div style="width: 80%; padding-left: 20px;"><h5 style="padding-left: 10px">`+value+` (You)</h5></div>
            </div>
            `)
        } else{
            $("#memberpart").append(`
            <div class="row" style="width: 100%;">
                <div style="width: 80%; padding-left: 20px;"><h5 style="padding-left: 10px">`+value+`</h5></div>
                <div style="width: 20%; text-align: right;"><i  class="fa fa-trash fa-lg" aria-hidden="true"></i></div>
            </div>
            `)
        }
    });

    $("#membersgrid").append(`  
    <br>
    <div class="input-group mb-3" style="padding-top: 10px; bottom:0px; height:44px">
    <input id="invites" type="text" class="form-control" placeholder="" aria-label="" aria-describedby="basic-addon2" style="border-bottom-left-radius:0%">
    <div class="input-group-append">
      <div class="container-login100-form-btn">
        <div class="wrap-login100-form-btn" style="border-radius:0%; border-top-right-radius: 15%; border-bottom-right-radius: 15%;">
            <div class="login100-form-bgbtn"></div>
            <button id="btninvites" class="login100-form-btn ">Invite</button>
        </div>
    </div>
    </div>
  </div>`)




  var final="";
    $("#editname").click(function (event) {
        var newtitle=$("#pagetitle").val(); 
        var title=window.location.href.split("#")[1].split("_").join(" ")
        var final=""
        if (newtitle!=title){
            $("#goback").attr("href","Page.html#"+newtitle.split(" ").join("_"));
            $.each(pages, function (index, value) {
                if (value.split("/")[0]==title){
                    page=value;
                    return page;
                }
            })
            page=page.split("//")

            page[0]=newtitle+"/"+newdesc
            
            $.each(page, function (index, value) {
                if (index==(page.length-1)){
                    final+=value
                } else{
                    final+=value+"//"
                }
            })
           
            var indpage=0;
            $.each(members, function (index1, value1) {
                $.each(users[value1].pages, function (index2, value2) {
                    if (value2.split("//")[0]==(title+"/"+newdesc)){
                        indpage=index2;
                        return indpage;
                    }
                })
                console.log(value1)
                if (users["currentUser"].username==value1){
                    users["currentUser"].pages[indpage]=final
                    console.log(users)
                }
                users[value1].pages[indpage]=final
            })
            delete pagemembers.title+"/"+newdesc
            var newpage = new PageMember(final,members);
            pagemembers[newtitle+"/"+newdesc]=newpage;
            localStorage.setItem("users", JSON.stringify(users));
            localStorage.setItem("pagemembers",JSON.stringify(pagemembers))
            location.assign("PageSettings.html#"+newtitle.split("/")[0].split("//")[0].split("/")[0].split(" ").join("_"));
        }


    })
    $("#btninvites").click(function(event){
        var persontoinvite=$("#invites").val(); //user to invite
        $("#memberpart").append(`
        <div class="row" style="width: 100%;">
            <div style="width: 80%; padding-left: 20px;"><h5 style="padding-left: 10px">`+persontoinvite+`</h5></div>
            <div style="width: 20%; text-align: right;"><i  class="fa fa-trash fa-lg" aria-hidden="true"></i></div>
        </div>
        `)
        $("#invites").val("");
        var title=window.location.href.split("#")[1].split("_").join(" ");
    });
    $("#confdelete").click(function (event) {
        var title=window.location.href.split("#")[1].split("_").join(" ");
        var delmembers = pageMemb.personlist
        $.each(delmembers,function(index,value){
            console.log(pageMemb.pagename)
            var usr = value
            $.each(users[value].pages,function(index,value){
                if (value==pageMemb.pagename){
                        users[usr].pages.splice(index,1)
                        users["currentUser"].pages.splice(index,1)
                }
            })
        })
        $.each(pagemembers,function(index,value){
                if (value.pagename == (pageMemb.pagename)) {
                     delete pagemembers[index]
                }
               
        });
        localStorage.setItem("users", JSON.stringify(users));
        localStorage.setItem("pagemembers",JSON.stringify(pagemembers))
        window.location.assign("pages.html")
    })
    $("#editdesc").click(function (event) {
        var newdesc=$("#pagedesc").val();
        var title=window.location.href.split("#")[1].split("_").join(" ")
        var final=""
        if (newdesc!=desc){
            $("#goback").attr("href","Page.html#"+title.split(" ").join("_"));
            $.each(pages, function (index, value) {
                if (value.split("/")[0]==title){
                    page=value;
                    return page;
                }
            })
            page=page.split("//")
            page[0]=title+"/"+newdesc
            console.log(page)
            $.each(page, function (index, value) {
                if (index==(page.length-1)){
                    final+=value
                } else{
                    final+=value+"//"
                }
            })
            
            console.log(final)

            var indpage=0;
            $.each(members, function (index1, value1) {
                $.each(users[value1].pages, function (index2, value2) {
                    if (value2.split("//")[0]==(title+"/"+desc)){
                        indpage=index2;
                        return indpage;
                    }
                })
                if (users["currentUser"].username==value1){
                    users["currentUser"].pages[indpage]=final
                }
                users[value1].pages[indpage]=final
            })
            delete pagemembers.title+"/"+desc
            var newpage = new PageMember(final,members);
            pagemembers[title+"/"+newdesc]=newpage;
            localStorage.setItem("users", JSON.stringify(users));
            localStorage.setItem("pagemembers",JSON.stringify(pagemembers))
    }
    })

});    

