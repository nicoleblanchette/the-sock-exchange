document.getElementById("loginButton").addEventListener("click", function () {
  const username = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  console.log("Username: " + username);
  console.log("Password: " + password);

  const status = document.querySelector("#status");
  if (username === "wasadmin@test.com" && password === "red") {
    status.textContent = "Logged in";
  } else {
    status.textContent = "Not authorized";
  }
});
