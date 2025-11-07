

 document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("menu-toggle");
  const navLinks = document.getElementById("nav-links");

  if (toggle && navLinks) {
    toggle.addEventListener("click", () => {
      navLinks.classList.toggle("show");
    });
  }

  verificarSesion();
});

async function verificarSesion() {
  try {
    const response = await fetch("https://backendhabilidadesb.onrender.com/api/user", {
      credentials: "include"
    });
    const data = await response.json();
    const nav = document.getElementById("nav-links");

    // Limpiar elementos dinámicos existentes para evitar duplicados
    const existingLogout = document.getElementById("logoutLink");
    if (existingLogout) existingLogout.parentElement.remove();

    const existingLogin = nav.querySelector('a[href="/Html/login.html"]');
    if (existingLogin) existingLogin.parentElement.remove();

    const existingRegister = nav.querySelector('a[href="/Html/registro.html"]');
    if (existingRegister) existingRegister.parentElement.remove();

    if (data.loggedIn) {
      // Agregar botón de Cerrar sesión
      const li = document.createElement("li");
      li.innerHTML = `<a href="#" id="logoutLink">Cerrar sesión</a>`;
      nav.appendChild(li);

      document.getElementById("logoutLink").addEventListener("click", async (e) => {
        e.preventDefault();
        await fetch("https://backendhabilidadesb.onrender.com/logout", {
          credentials: "include"
        });
        alert("Sesión cerrada correctamente.");
        location.reload();
      });
    } else {


