function handleAuthButtons() {
  if (localStorage.getItem("user")) {
    authButtons.innerHTML = "<p onclick='logout();'>Logout</p>";
  } else {
    authButtons.innerHTML =
    ' <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#loginModal">Login</button> <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#loginModal" data-bs-whatever="@mdo">Signup</button>';
  }
}
handleAuthButtons();

function logout() {
  localStorage.removeItem("user");
  handleAuthButtons();
}

function login(username, password) {
 if (authUsers.find((user) => {
    user.username === username && user.password === password;
  })
) {
  //set localStorage here
  } else {
    alert("WRONG CREDENTIALS");
  }
}

loginBtn.addEventListener("click", function() {
  console.log(`Username: ${recipientUsername.value}`);
  console.log(`Password: ${recipientPassword.value}`);

  // login(user)

})


window.onload = () => {
}

