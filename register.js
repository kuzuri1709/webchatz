// function sendUserInfo() {
//     function User(email, password, username) {
//         this.email = email
//         this.password = password
//         this.username = username
//     }
//     var user

//     getUserInfo()
function checkPwd(pwInput, confirm_password) {
    //Check password

    if (pwInput.length >= 8) {
        if (confirm_password == pwInput) {
            //valid
            // console.log("valid password")
            return true;
        }
        else {
            alert('Please confirm your password');
        }
    } else {
        //invalid
        alert('Invalid password');
    }
}

//     //save in database
//     firebase.database().ref("users").push().set({
//         "username": user.username,
//         "email": user.email,
//         "password": user.password,
//     });

//     //prevent form from submitting
//     return false;
// }

// var btnCreate = document.getElementById("create-button");
// btnCreate.addEventListener("click", function () {
//     sendUserInfo();
// })

//getting data from database
// db.collection('users').get().then((snapshot) => {
//     snapshot.docs.forEach(doc => {
//         console.log(doc.data());
//     })
// });

//saving data
const form = document.getElementById('content');
var all_users = db.collection("users");

form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (form.email.value != "" && form.username.value != "" && form.password.value != "" && form.confirm_password.value != "") {
        if (checkPwd(form.password.value, form.confirm_password.value) == true) {

            all_users.get().then((snapshot) => {
                // console.log(snapshot.docs.length)
                // snapshot.docs.forEach(doc => {
                //     var x = true;
                //     if (doc.data().username == form.username.value) {
                //         alert("This username has already been taken!");
                //         x = false;
                //         console.log(x);
                //         if (x) {
                //             all_users.add({
                //                 email: form.email.value,
                //                 username: form.username.value,
                //                 password: form.password.value
                //             });

                //             form.email.value = '';
                //             form.username.value = '';
                //             form.password.value = '';
                //             form.confirm_password.value = '';
                //         }
                //         x = true;
                //         // console.log(x);
                //     } else {
                //         // console.log("else");
                //     }

                //     // console.log(doc.data().username)

                // })
                var y = 0;
                for (let i = 0; i < snapshot.docs.length; i++) {
                    // console.log(snapshot.docs[i].data().username);
                    if (snapshot.docs[i].data().username == form.username.value) {
                        alert("This username has already been taken!");
                        y++;
                        // console.log(x);
                        // if (x) {
                        //     all_users.add({
                        //         email: form.email.value,
                        //         username: form.username.value,
                        //         password: form.password.value
                        //     });

                        //     form.email.value = '';
                        //     form.username.value = '';
                        //     form.password.value = '';
                        //     form.confirm_password.value = '';
                        // }
                        // x = true;
                        // console.log(x);
                    } else {
                        continue;
                    }
                    
                }
                // console.log(y);
                if (y == 0) {
                    all_users.add({
                        email: form.email.value,
                        username: form.username.value,
                        password: form.password.value
                    });

                    form.email.value = '';
                    form.username.value = '';
                    form.password.value = '';
                    form.confirm_password.value = '';
                }
            })


        }
    } else {
        alert("Failed!");
    }
});

// const chatroom =firebase.database().ref("chatrooms")
// chatrooms.push().set({
//     "id": 1,
//     "messages":[]
// })
