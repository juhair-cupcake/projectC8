const serverName = "http://192.168.0.105:4000";
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
  output.innerHTML += `<p> ${data.message} </p>`;
  typing.innerHTML = "";
  //Automatic go to the bottom when new message comes
  input.scrollIntoView();
});

//Print if someone is connected
socket.on("newHere", (data) => {
  output.innerHTML += `<p>${data} joined the chat</p>`;
});
//Print if someone is Disconnected
socket.on("oldGone", (data) => {
  output.innerHTML += `<p>${data} is gone from chat :(</p>`;
});

//Print typing
socket.on("typing", (data) => {
  typing.innerHTML = `<p> ${data} is typing...</p>`;
});
