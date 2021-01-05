const socket = io.connect("http://192.168.0.105:4000");

//Collect the DOM
const input = document.getElementById("input");
const output = document.getElementById("output");
const typing = document.getElementById("typing");
const btn = document.getElementById("send");

//Send the msg to other
btn.addEventListener("click", () => {
  socket.emit("chat", {
    message: input.value,
  });
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
    socket.emit("typing", {
      name: "Some one",
    });
  }
};
//Make this infinate
setInterval(checkTyping, 1000);

//Listen to the socket call And print it
//Print the chat
socket.on("chat", (data) => {
  output.innerHTML += `<p> ${data.message} </p>`;
  typing.innerHTML = "";
  //Automatic go to the bottom when new message comes
  input.scrollIntoView();
});

//Print if someone is typing
socket.on("typing", (data) => {
  typing.innerHTML = `<p> ${data.name} is typing...</p>`;
});
