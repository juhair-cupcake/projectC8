const serverName = "http://localhost:4000";
const socket = io.connect(serverName);

//collect the User name
let userName = sessionStorage.getItem("name");
if (userName == null) {
  console.log("empty");
  window.location.href = `/username`;
} else {
  socket.emit("newUser", userName);
}

//Collect the DOM
const input = document.getElementById("input");
const output = document.getElementById("output");
const typing = document.getElementById("typing");
const btn = document.getElementById("send");

//Send the msg to other
btn.addEventListener("click", () => {
  if (input.value != "") {
    socket.emit("chat", {
      name: userName,
      message: input.value,
    });
  }
  input.value = "";
});
//Same thing just with enter without clicking
input.addEventListener("keyup", (evt) => {
  if (evt.keyCode === 13) {
    btn.click();
  }
});

//send the key stroke
const checkTyping = () => {
  if (input.value != "") {
    socket.emit("typing", userName);
  }
};
//Make this infinate
setInterval(checkTyping, 500);

//Listen to the socket call And print it
//Print the chat
socket.on("chat", (data) => {
  if (data.name != userName) {
    output.innerHTML += ` <p class="msg"><b><i>${data.name}: </i></b>${data.message} </p>`;
    typing.innerHTML = "";
  } else {
    output.innerHTML += ` <p class="me">${data.message} </p>`;
    typing.innerHTML = "";
  }
  //Automatic go to the bottom when new message comes
  typing.scrollIntoView();
});

//Print if someone is connected
socket.on("newHere", (data) => {
  output.innerHTML += `<p class="comment">${data} joined the chat</p>`;
});
//Print if someone is Disconnected
socket.on("oldGone", (data) => {
  if (data != null) {
    output.innerHTML += `<p class="comment">${data} is gone from chat :(</p>`;
  }
});

//Print typing
socket.on("typing", (data) => {
  typing.innerHTML = `<p class="type"> ${data} is typing...</p>`;
});
