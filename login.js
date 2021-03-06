var btnSignIn = document.getElementById("Sign");
var users = db.collection("users");

btnSignIn.addEventListener("click", function (e) {
    e.preventDefault();
    // console.log("success")
    let username = document.getElementById("username").value;
    let password = document.getElementById("pwd").value;
    // console.log(password)

    users.where("username", "==", username).get().then((querySnapshot) => {
        console.log(querySnapshot.docs);
        if (querySnapshot.docs != "") {
            // console.log("true")
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                // console.log(doc.id, " => ", doc.data());
                console.log(doc.data());

                // if(doc)
                if (username == doc.data().username && password == doc.data().password) {
                    // console.log("true");
                    var user = doc.data();
                    var userId = doc.id;
                    // console.log(userId);
                    localStorage.removeItem("user");
                    localStorage.removeItem("userId");
                    localStorage.setItem("user", JSON.stringify(user));
                    localStorage.setItem("userId", userId);
                    window.location.href = "./index.html";
                } else {
                    alert("Failed");
                }
            })
        } else {
            alert("Failed");
        }

    }).catch((error) => {
        console.log("Error getting documents: ", error);
    });
});
