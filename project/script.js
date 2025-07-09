function handleAuthButtons() {
  if (localStorage.getItem("user")) {
    authButtons.innerHTML = "<p onclick='logout()'>Logout</p>";
    contentSection.innerHTML = "<h1>Secret Society</h1>"
  } else {
    authButtons.innerHTML =
    ' <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#loginModal">Login</button> <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#loginModal" data-bs-whatever="@mdo">Signup</button>';
  }
}
handleAuthButtons();

function logout() {
  localStorage.removeItem("user");
  handleAuthButtons();
  contentSection.innerHTML = `<div id="carouselExample" class="carousel slide">
      <div class="carousel-inner">
        <div class="carousel-item active">
          <img src="https://images.pexels.com/photos/5655150/pexels-photo-5655150.jpeg" class="d-block w-100" alt="...">
        </div>
        <div class="carousel-item">
          <img src="https://images.pexels.com/photos/5655150/pexels-photo-5655150.jpeg" class="d-block w-100" alt="...">
        </div>
        <div class="carousel-item">
          <img src="https://images.pexels.com/photos/5655150/pexels-photo-5655150.jpeg" class="d-block w-100" alt="...">
        </div>
      </div>
      <button class="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>`;
}

function login(username, password) {
 const attempt = authUsers.find(
  (user) => user.username === username && user.password === password
 );
 
 
  if (attempt) {
    localStorage.setItem("user", JSON.stringify(attempt));
    handleAuthButtons();

    contentSection.innerHTML = "<h1>Secret Society</h1>"
    callRandomUsers();
  //set localStorage here
  } else {
    alert("WRONG CREDENTIALS");
  }
}

loginBtn.addEventListener("click", function() {
  console.log(`Username: ${recipientUsername.value}`);
  console.log(`Password: ${recipientPassword.value}`);

  // login(user)
  login(recipientUsername.value,recipientPassword.value)

  recipientUsername.value = '';
  recipientPassword.value = '';
});


async function callRandomUsers() {
  const div = document.createElement("div");
  const ru = await (await fetch("https://randomuser.me/api?results=30")).json();

  renderRandomUsers(ru.results);
  // div.innerHTML = `<pre>${JSON.stringify(ru, null, 2)}</pre>`;
  // contentSection.appendChild(div);
}

window.onload = () => {
  handleAuthButtons();
}


function renderRandomUsers(data) {
  for (let i = 0; i < data.length; i++) {
    const current = data[i];
    console.log("Current =", current);
    const currentImage = current.picture.medium;
    const currentName = `${current.name.title} ${current.name.first} ${current.name.last}`;
    const currentLocation = `${current.location.city}, ${current.location.country}`;
    const currentEmail = current.email;
    const currentPhone = current.phone;
    const randomUserCard = RandomUserCard(
      currentImage,
      currentName,
      currentLocation,
      currentEmail,
      currentPhone
    );
    contentSection.innerHTML += randomUserCard;
  }
}

function RandomUserCard(img, name, location, email, phone) {
  return `
    <div class="random-user-card">
      <div>
        <img
          class="profile-pic" 
          src="${img}"
        >
      </div>
      <div>
        <p>${name}</p>
        <p>${location}</p>
      </div>
      <div>
        <a href="mailto:${email}"><i class="fa-solid fa-envelope"></i>email</a>
        <a href="tel:${phone}"><i class="fa-solid fa-envelope"></i>phone</a>
      </div>
    </div>
  `;
}