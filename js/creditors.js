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

                //sending product data to firestore
                document.getElementById("submit").onclick = function(){
                    var fullName = document.getElementById("fullName").value;
                    var phoneNo = document.getElementById("phoneNo").value;
                    var company = document.getElementById("company").value;
                    
                
                    document.getElementById("submitting").style.display = "block";
                    document.getElementById("submit").style.display = "none";
        
                    var sendCreditors = firebase.firestore().collection("Creditors").doc();
                    sendCreditors.set({
        
                        fullName:fullName,
                        phoneNo:phoneNo,
                        company: company,
                        userid:userid,
                        docId:sendCreditors.id
        
                    }).then(()=>{
                        window.location.reload();
                    })
                
                
                }
                firebase.firestore().collection("Creditors").get().then((creditorSnap)=>{
                    var content = ""
                    creditorSnap.forEach((prod)=>{
                        var fullName =prod.data().fullName;
                        var phoneNo =prod.data().phoneNo;
                        var company =prod.data().company;
        
        
                        content+= '<tr>'
                        content+='   <th> ' +fullName+'</th>'
                        content+='   <td>'+phoneNo+'</td>'
                        content+='   <td>'+company+'</td>'
                        content+='   <td><button class="btn btn-sm btn-danger">Delete</button></td>'
                        content+='</tr>'
        
                    });
                    $("#allCreditor").append(content);
                })







    }else{
        //if user is not logged in
        window.location.href = "/index.html"
    }
})