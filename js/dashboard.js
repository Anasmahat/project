//check if the user has logged in
firebase.auth().onAuthStateChanged((user)=>{
    if(user){
        //if user is logged in


        //logout the user
        document.getElementById("logout").onclick =  function(){
            firebase.auth().signOut().then(()=>{
                window.location.href = "/index.html"
            })
        }

        //read the user who is logged in
        //find user id
        var userid = user.uid;

        firebase.firestore().collection("users").doc(userid).get().then((doc) =>{

            var name =  doc.data().name;

            document.getElementById("username").innerText = name;
        })
        //end

        







    }else{
        //if user is not logged in
        window.location.href = "/index.html"
    }
})