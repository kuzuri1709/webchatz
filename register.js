// function sendUserInfo() {
//     function User(email, password, username) {
//         this.email = email
//         this.password = password
//         this.username = username
//     }
//     var user

//     getUserInfo()
//     function checkPwd(pwInput, password) {
//         //Check password

//         if (password.length >= 8) {
//             //valid
//             console.log("valid password")
//             return true;
//         } else {
//             //invalid
//             console.log('invalid password')
//         }
//     }

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
form.addEventListener('submit', (e) => {
    e.preventDefault();
    db.collection('users').add({
        email: form.email.value,
        username: form.username.value,
        password: form.password.value
    })

    form.email.value = '';
    form.username.value = '';
    form.password.value = '';
    form.confirm_password.value = '';
});

// const chatroom =firebase.database().ref("chatrooms")
// chatrooms.push().set({
//     "id": 1,
//     "messages":[]
// })
