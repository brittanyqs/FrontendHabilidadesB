document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("menu-toggle");
  const navLinks = document.getElementById("nav-links");

  if (toggle && navLinks) {
    toggle.addEventListener("click", () => {
      navLinks.classList.toggle("show");
    });
  }

  // Verificar sesión al cargar la página
  verificarSesion();
});

async function verificarSesion() {
  try {
    // ✅ Llama al endpoint correcto del backend
    const response = await fetch("https://backendhabilidadesb.onrender.com", {
      credentials: "include" // importante para sesiones
    });

    const data = await response.json();
    const nav = document.getElementById("nav-links");

    // ✅ Si hay sesión activa, mostrar botón de logout
    if (data.loggedIn) {
      nav.innerHTML += `<li><a href="#" id="logoutLink">Cerrar sesión</a></li>`;

      document.getElementById("logoutLink").addEventListener("click", async () => {
        await fetch("http://localhost:7000/logout", {
          credentials: "include"
        });
        alert("Sesión cerrada correctamente.");
        location.reload();
      });
    }
  } catch (error) {
    console.error("Error al verificar sesión:", error);
  }
}


