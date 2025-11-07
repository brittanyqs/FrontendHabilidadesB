

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

    // Elimina los botones previos (para evitar duplicados)
    const loginLink = nav.querySelector('a[href="/Html/login.html"]');
    const registerLink = nav.querySelector('a[href="/Html/registro.html"]');

    if (data.loggedIn) {
      // 🔹 Si el usuario está logueado
      if (loginLink) loginLink.parentElement.remove();
      if (registerLink) registerLink.parentElement.remove();

      // Agregar botón de cerrar sesión si no existe
      if (!document.getElementById("logoutLink")) {
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
      }
    } else {
      // 🔹 Si NO está logueado, asegurarse de mostrar login y registro
      if (!loginLink) {
        const liLogin = document.createElement("li");
        liLogin.innerHTML = `<a href="/Html/login.html">Login</a>`;
        nav.appendChild(liLogin);
      }
      if (!registerLink) {
        const liRegister = document.createElement("li");
        liRegister.innerHTML = `<a href="/Html/registro.html">Registrarse</a>`;
        nav.appendChild(liRegister);
      }
    }
  } catch (error) {
    console.error("Error al verificar sesión:", error);
  }
}


