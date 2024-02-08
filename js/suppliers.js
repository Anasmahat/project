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
            var filNmae = document.getElementById("filNmae").value;
            var fillNumber = document.getElementById("fillNumber").value;
            var fillComp = document.getElementById("fillComp").value;
        
            document.getElementById("submitting").style.display = "block";
            document.getElementById("submit").style.display = "none";

            var sendProduct = firebase.firestore().collection("supplier").doc();
            sendProduct.set({

                filNmae:filNmae,
                fillNumber:fillNumber,
                fillComp: fillComp,
                userid:userid,
                docId:sendProduct.id

            }).then(()=>{
                window.location.reload();
            })
        
        
        }

        firebase.firestore().collection("supplier").get().then((supplierSnapshot)=>{
            
            var content = ''
            supplierSnapshot.forEach((doc)=>{
                var filNmae = doc.data().filNmae;
                var fillNumber = doc.data().fillNumber;
                var fillComp = doc.data().fillComp;


                content += '<tr>'
                content += '    <th>' + filNmae +'</th>'
                content += '    <td>' +fillNumber+'</td>'
                content += '    <td>'+fillComp+'</td>'
                content += '    <td><button class="btn btn-sm btn-danger">Delete</button></td>'
                content += '</tr>'
                    
            })
            $("#allSupplier").append(content);

        })









    }else{
        //if user is not logged in
        window.location.href = "/index.html"
    }
})