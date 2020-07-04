$(document).ready(function () {
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
    class PageMember{
        constructor(pagename,personlist){
            this.pagename=pagename;
            this.personlist=personlist;
        }
    }
    var users = {
        "user1": new User("user1", "user1", "Miguel Almeida", "user1@ex.pt", "https://media.istockphoto.com/vectors/man-avatar-profile-male-face-icon-vector-illustration-vector-id1142192538?k=6&m=1142192538&s=170667a&w=0&h=mKkx-3SlGFT_QL10L3zcx_jepev6R7qk2-b7q5XpYA4=", ["Project 2/user3/This project was created to build an app.", "A nice Page/user2/Project for distributed systems."], ["Personal Page/My daily routine//Shopping Cart/Buy fruit--false/Buy meat--false","Project 1/This project was made to build a mobile app.//Topic A/Task 1--true/Task 2--true/Task 3--false//Topic B/Task 1--false/Task 2--true//Topic C/Task 1--true/Task 2--false/Task 3--false"], ["Wed Jun 24 2020/./09:00/./IHC Project","Thu Jun 25 2020/./14:00/./Study Algebra", "Fri Jun 26 2020/./15:00/./CD Project"]),
        "user2": new User("user2", "user2", "Luís Valentim", "user2@ex.pt", "https://media.istockphoto.com/vectors/man-avatar-profile-male-face-icon-vector-illustration-vector-id1142192538?k=6&m=1142192538&s=170667a&w=0&h=mKkx-3SlGFT_QL10L3zcx_jepev6R7qk2-b7q5XpYA4=", [], ["Personal Page/My daily to-do shores","A nice Page/Project for distributed systems."], []),
        "user3": new User("user3", "user3", "Tiago Oliveira", "user3@ex.pt", "https://media.istockphoto.com/vectors/man-avatar-profile-male-face-icon-vector-illustration-vector-id1142192538?k=6&m=1142192538&s=170667a&w=0&h=mKkx-3SlGFT_QL10L3zcx_jepev6R7qk2-b7q5XpYA4=", [], ["Personal Page/My day-to-day tasks.", "Project 2/This project was created to build an app."], []),
        "currentUser": new User("", "", "", "", "", [], [], []),
    };
    var pagemembers = {
        "Project 1/This project was made to build a mobile app.": new PageMember("Project 1/This project was made to build a mobile app.//Topic A/Task 1--true/Task 2--true/Task 3--false//Topic B/Task 1--false/Task 2--true//Topic C/Task 1--true/Task 2--false/Task 3--false",["user1","user3"]),
        "Personal Page/My daily routine": new PageMember("Personal Page/My daily routine//Shopping Cart/Buy fruit--false/Buy meat--false",["user1"]),
        "Personal Page/My daily to-do shores": new PageMember("Personal Page/My daily to-do shores",["user2"]),
        "A nice Page/Project for distributed systems.":new PageMember("A nice Page/Project for distributed systems.",["user2"]),
        "Personal Page/My day-to-day tasks." : new PageMember("Personal Page/My day-to-day tasks.",["user3"]),
        "Project 2/This project was created to build an app." : new PageMember("Project 2/This project was created to build an app.", ["user3"]),
    }
    if (localStorage.getItem("users") == null) {
        localStorage.setItem("users", JSON.stringify(users));
    }
    if(localStorage.getItem("pagemembers") == null){
        localStorage.setItem("pagemembers", JSON.stringify(pagemembers));
    }

    $(".btn-log-out").click(function() {
        var newUser = new User("", "", "", "", "", [],[],[]);
        users["currentUser"] = newUser;
        localStorage.setItem("users", JSON.stringify(users));
        window.location.assign("index.html");
    })
});