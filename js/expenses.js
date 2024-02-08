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
            var date = document.getElementById("date").value;
            var amount = document.getElementById("amount").value;
            var exCate = document.getElementById("exCate").value;
            var exDes = document.getElementById("exDes").value;
        
            document.getElementById("submitting").style.display = "block";
            document.getElementById("submit").style.display = "none";

            var sendProduct = firebase.firestore().collection("Expense").doc();
            sendProduct.set({

                date:date,
                amount:amount,
                exCate: exCate,
                exDes:exDes,
                userid:userid,
                docId:sendProduct.id

            }).then(()=>{
                window.location.reload();
            })
        
        
        }

        firebase.firestore().collection("Expense").get().then((expenSnap)=>{
            var content = ""
            expenSnap.forEach((ex)=>{
                var date =ex.data().date;
                var amount =ex.data().amount;
                var exCate =ex.data().exCate;
                var exDes =ex.data().exDes;


                content+= '<tr>'
                content+=  '<th> ' +date+'</th>'
                content+='   <td>'+amount+'</td>'
                content+='   <td>'+exCate+'</td>'
                content+='   <td>'+exDes+'</td>'
                content+='   <td><button class="btn btn-sm btn-danger">Delete</button></td>'
                content+='</tr>'

            });
            $("#allExpense").append(content);
        })








    }else{
        //if user is not logged in
        window.location.href = "/index.html"
    }
})