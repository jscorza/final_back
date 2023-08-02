document.getElementById("borrarInactivosButton").addEventListener("click", async () => {
    try {
      const response = await fetch("/api/usuarios/borrarInactivos", {
        method: "DELETE"
      });
      if (response.ok) {
        alert("Usuarios inactivos borrados correctamente");
        location.reload(); // Recargar la página para mostrar la lista actualizada
      } else {
        alert("Error al borrar usuarios inactivos");
      }
    } catch (error) {
      alert("Error al realizar la solicitud");
    }
  });