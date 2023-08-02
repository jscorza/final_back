
// Obtener referencia al botón "Agregar al carrito"
const addToCartButtons = document.querySelectorAll('.add-to-cart');

// Agregar controlador de eventos para el clic en el botón "Agregar al carrito"
addToCartButtons.forEach(button => {
  button.addEventListener('click', async (event) => {
    event.preventDefault();
    const productId = button.value;
    await addToCart(productId);
  });
});

async function addToCart(productId) {
  try{
    await fetch(`/api/carritos/agregar-producto/${productId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error('Error al agregar el producto al carrito:', error.message);
  }
}


const deleteFromCartButtons = document.querySelectorAll('.eliminar');

// Agregar controlador de eventos para el clic en el botón "eliminar al carrito"
deleteFromCartButtons.forEach(button => {
  button.addEventListener('click', async (event) => {
    event.preventDefault();
    const productId = button.value;
    await deleteFromCart(productId);
    location.reload();
  });
});

async function deleteFromCart(productId) {
  try{
    await fetch(`/api/carritos/eliminar-producto/${productId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error('Error al agregar el producto al carrito:', error.message);
  }
}


const buyCartButton = document.querySelectorAll('.comprar');

// Agregar controlador de eventos para el clic en el botón "eliminar al carrito"
buyCartButton.forEach(button => {
  button.addEventListener('click', async (event) => {
    try {
      event.preventDefault();
      const response = await comprar();
      if(response.ok){
        alert("compra realizada, revisa tu casilla de email para obtener el comprobante")
        location.reload()
      }
    } catch (error) {
      alert("Hubo un error en la compra")
    }
   
  });
});

async function comprar() {
  try{
    const response = await fetch(`/api/carritos/comprar/carrito`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }})
    return response;
  } catch (error) {
    console.error('Error al realizar carrito:', error.message);
  }
}