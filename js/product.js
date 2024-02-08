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
            var ProductName = document.getElementById("proNmae").value;
            var ProductSize = document.getElementById("proSize").value;
            var ProductDescription = document.getElementById("proDec").value;
            var ProductPrice = document.getElementById("proPrice").value;
        
            document.getElementById("submitting").style.display = "block";
            document.getElementById("submit").style.display = "none";

            var sendProduct = firebase.firestore().collection("product").doc();
            sendProduct.set({

                ProductName:ProductName,
                ProductSize:ProductSize,
                ProductDescription: ProductDescription,
                ProductPrice:ProductPrice,
                userid:userid,
                docId:sendProduct.id

            }).then(()=>{
                window.location.reload();
            })
        
        
        }

        firebase.firestore().collection("product").get().then((productSnap)=>{
            var content = ""
            productSnap.forEach((prod)=>{
                var ProductName =prod.data().ProductName;
                var ProductSize =prod.data().ProductSize;
                var ProductDescription =prod.data().ProductDescription;
                var ProductPrice =prod.data().ProductPrice;


                content+= '<tr>'
                content+=  '<th> ' +ProductName+'</th>'
                content+='   <td>'+ProductSize+'</td>'
                content+='   <td>'+ProductDescription+'</td>'
                content+='   <td>'+ProductPrice+'</td>'
                content+='   <td><button class="btn btn-sm btn-danger">Delete</button></td>'
                content+='</tr>'

            });
            $("#allProduct").append(content);
        })






    }else{
        //if user is not logged in
        window.location.href = "/index.html"
    }
})