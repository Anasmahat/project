document.getElementById("sigin").onclick = function (){
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    document.getElementById("sigin").style.display="none";
    document.getElementById("signing").style.display="block";
    
    
    firebase.auth().signInWithEmailAndPassword(email,password).then((userCredential) =>{
        window.location.href= "dashboard.html"; 
    }).catch((error)=>{

        var errormessage =error.message;
        swal ("sign In error",`${errormessage}`, "error")

        document.getElementById("sigin").style.display="block";
    document.getElementById("signing").style.display="none";
    })
}