document.getElementById("restockButton").addEventListener("click", async () => {
    try {
      const response = await fetch("/api/productos/restock", {
        method: "PUT"
      });
      if (response.ok) {
        document.getElementById("message").textContent = "Restock realizado correctamente.";
      } else {
        document.getElementById("message").textContent = "Error al realizar el restock.";
      }
    } catch (error) {
      document.getElementById("message").textContent = "Error al realizar la solicitud.";
    }
  });