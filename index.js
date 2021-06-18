var retrievedUser = JSON.parse(localStorage.getItem("user"));
var retrievedId = localStorage.getItem("userId");
let usersArray = [];
var innerHTMLUser = document.getElementById("user");
var list;

if (retrievedUser == null) {
    window.location.href = "./signin.html";
}
var all_users = db.collection("users");
var chat_room_id;
all_users.get().then((snapshot) => {
    snapshot.docs.forEach(doc => {
        // console.log(doc.data());
        usersArray.push({
            username: doc.data().username,
            id: doc.id
        });
        displayUsers(usersArray);
    })
});

function pickUser(list) {
    for (let i = 0; i < list.length; i++) {
        let a = 0;
        list[i].addEventListener('click', () => {
            a++;
            // console.log(event)
            document.getElementById("messages").innerHTML = "";
            let n = list[i].id.localeCompare(retrievedId);
            if (n == 1) {
                chat_room_id = list[i].id + "-" + retrievedId;

            }
            if (n == -1) {
                chat_room_id = retrievedId + "-" + list[i].id;

            }
            if (n == 0) {
                // // let string1 = list[i].substring(k), string2 = retrievedId.substring(k);
                // for (let k = 0; k < retrievedId.length; k++) {
                //     if (list[i].id.substring(k).localeCompare(retrievedId.substring(k)) == 0) {
                //         continue;
                //     }
                //     if (n == 1) {
                //         chat_room_id = list[i].id + "-" + retrievedId;
                //         break;
                //     }
                //     if (n == -1) {
                //         chat_room_id = retrievedId + "-" + list[i].id;
                //         break;
                //     }
                // }

                chat_room_id = retrievedId + "-" + list[i].id;
            }

            // chat_room_id = list[i].id + "-" + retrievedId;
            console.log(chat_room_id);
            console.log(a);
            showMessages(chat_room_id);
            for (let j = 0; j < list.length; j++) {
                if (i == j) {
                    list[i].style.backgroundColor = "lightgray";
                } else {
                    list[j].style.backgroundColor = "white";
                }
            }

            // for (let j = 0; j < a; j++) {
            //     // console.log(j);
            //     if (j == 0) {

            //     }
            // }
        });


    }
}

function displayUsers(user) {
    var html = user.map(item => {
        return `<div class = "user_box" id = "${item.id}">
    ${item.username}</div>`;
    }).join("");

    innerHTMLUser.innerHTML = html;
    list = document.getElementsByClassName("user_box");
    pickUser(list);
}
// function generateChatRoomId(a, listItem) {


//     // console.log(chat_room_id);
//     // sendMessageWithId(chat_room_id, message);
//     return a;
// }
// console.log(retrievedUser);
// console.log(retrievedId);
// console.log(localStorage.getItem("user"));
// console.log(localStorage.getItem("userId"));

// localStorage.removeItem("user");
// localStorage.removeItem("userId");

var myName = retrievedUser.username;
// for (let i = 0; i = 1;) {
//     if (myName == "") {
//         myName = prompt("Enter your name");
//     } else {
//         i++;
//         break;
//     }
// }


// function sendMessage() {
//     //get message
//     var message = document.getElementById("message").value;
//     var today = new Date();
//     var date = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
//     var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
//     var dateTime = date + ' ' + time;

//     //save in database
//     if (message != "") {
//         firebase.database().ref("messages").push().set({
//             "sender": myName,
//             "message": message,
//             "time": dateTime
//         });
//     }


//     //prevent form from submitting
//     return false;
// }

//listen for incoming messages
// firebase.database().ref("messages").on("child_added", function (snapshot) {
//     var html = `<div class = "chatRow"><p class="messageBox"> 
//       ${snapshot.val().sender}:  ${snapshot.val().message}
//       </p> <span class = "time">${snapshot.val().time}</span></div>`

//     document.getElementById("messages").innerHTML += html;
//     document.getElementById("message").value = "";
//     // updateScroll();
// });


function sendMessageWithId(chat_room_id, message) {

    var message = document.getElementById("message").value;
    var today = new Date();
    var date = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date + '  ' + time;

    if (message != "") {
        firebase.database().ref("ChatRoom/" + chat_room_id).push().set({
            "sender": myName,
            "message": message,
            "time": dateTime
        });
    }

    return false;
}

var usersList = document.getElementById("users_field");
// firebase.database().ref("users").on("child_added", function (snapshot) {
//     // var html = `<div class = "user_box" id = "${snapshot.key}">
//     // ${snapshot.val().username}</div>`

//     // usersList.innerHTML += html;


// });

function showMessages(chat_room_id) {
    firebase.database().ref("ChatRoom/" + chat_room_id).on("child_added", function (snapshot) {
        if (snapshot.val().sender == myName) {
            var html = `<div class = "chatRow2"><p class="messageBox2">
                         ${snapshot.val().message}
                        </p><span class = "time">${snapshot.val().time}</span></div>`;

            document.getElementById("messages").innerHTML += html;
            document.getElementById("message").value = "";
        }
        else {
            var html = `<div class = "chatRow1"><p class="messageBox1"> 
                        ${snapshot.val().sender}:  ${snapshot.val().message}
                        </p> <span class = "time">${snapshot.val().time}</span></div>`;

            document.getElementById("messages").innerHTML += html;
            document.getElementById("message").value = "";
        }

        // updateScroll();
    });
}

const searchBox = document.getElementById("searchBox");
searchBox.addEventListener("keyup", (e) => {
    const searchString = e.target.value;
    const filteredUsersArray = usersArray.filter(item => {
        return item.username.includes(searchString);
    })
    // console.log(filteredUsersArray);
    displayUsers(filteredUsersArray);
})
// {
//     id,
//     username,
//     password,
//     status: ON/OFF
// }