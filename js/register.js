document.getElementById("signup").onclick = function (){
    var email = document.getElementById("email").value;
    var password = document.getElementById("pass").value;
    var name = document.getElementById("name").value;
    var timestamp = new Date()

    document.getElementById("signingUp").style.display="block";
    document.getElementById("signup").style.display="none";

    firebase.auth().createUserWithEmailAndPassword(email,password).then((userCredential)=>{
        var userid = userCredential.user.uid;

        firebase.firestore().collection("users").doc(userid).set({
            name:name,
            email:email,
            userid:userid,
            timestamp:timestamp

        }).then(()=>{
            window.location.href="/dashboard.html";
        })
    }).catch((error)=>{
        // swal("sign Up error", `${error.message}`, "error");

        document.getElementById("signingUp").style.display="none";
        document.getElementById("signup").style.display="block";
    })
    
}





