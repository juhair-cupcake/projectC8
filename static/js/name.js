//Collect the DOM
let input = document.getElementById("nameInput");
let btn = document.getElementById("sendName");

btn.addEventListener("click", () => {
  if (input.value != "") {
    sessionStorage.setItem("name", input.value);
    window.location.href = `/`;
  }
});
