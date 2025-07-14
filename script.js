const navLinks = document.querySelectorAll('a');
const viewContainer = document.getElementById('view-container');

const router = {
  "#/home": renderHome,
  "#/contact": renderContact,
  "#/terms": renderTerms,
  "#/users": renderUsers
};

function renderHome() {
  viewContainer.innerHTML = `<h1>Home</h1>`;
  window.location.hash = "#/home";
}

function renderContact() {
  viewContainer.innerHTML = `<h1>Contact</h1>`;
  window.location.hash = "#/contact";
}

function renderTerms() {
  viewContainer.innerHTML = `<h1>Terms</h1>`;
  window.location.hash = "#/terms";
}

async function renderUsers() {
  viewContainer.innerHTML = `
    <table class="user-table">
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Email</th>
        </tr>
      </thead>
      <tbody></tbody>
    </table>
  `;

  const response = await fetch('http://localhost:3000/users');
  const users = await response.json();

  const tbody = viewContainer.querySelector('tbody');
  users.forEach((user, index) => {
    tbody.innerHTML += `
      <tr>
        <td>${index + 1}</td>
        <td>${user.name}</td>
        <td>${user.email}</td>
      </tr>
    `;
  });

  window.location.hash = "#/users";
}

navLinks.forEach(link => {
  link.addEventListener("click", event => {
    event.preventDefault();
    const path = link.getAttribute("href");
    console.log(`Navigating to ${path}`);
    router[path]();
  });
});
