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

        //sending material data to firestore
        document.getElementById("submit").onclick = function(){
            var matName = document.getElementById("matName").value;
            var matSize = document.getElementById("matSize").value;
            var matDes = document.getElementById("matDes").value;
        
            document.getElementById("submitting").style.display = "block";
            document.getElementById("submit").style.display = "none";

            var sendMaterial = firebase.firestore().collection("Material").doc();
            sendMaterial.set({

                matName:matName,
                matSize:matSize,
                matDes: matDes,
                userid:userid,
                docId:sendMaterial.id

            }).then(()=>{
                window.location.reload();
            })
        
        
        }
        firebase.firestore().collection("Material").get().then((materialSnap)=>{
            var content = ""
            materialSnap.forEach((doc)=>{
                var matName =doc.data().matName;
                var matSize =doc.data().matSize;
                var matDes =doc.data().matDes;


                content+= '<tr>'
                content+=  '<th> ' +matName+'</th>'
                content+='   <td>'+matSize+'</td>'
                content+='   <td>'+matDes+'</td>'
                content+='   <td><button class="btn btn-sm btn-danger">Delete</button></td>'
                content+='</tr>'

            });
            $("#allMaterial").append(content);
        })






    }else{
        //if user is not logged in
        window.location.href = "/index.html"
    }
})