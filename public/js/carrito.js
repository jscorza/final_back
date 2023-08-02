
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
    event.preventDefault();
    await comprar();
    location.reload()
    
  });
});

async function comprar() {
  try{
    const response = await fetch(`/api/carritos/comprar/carrito`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }})
    if(response.ok){
      alert("compra realizada exitosamente, revisa tu mail para obtener tu comprobante")      
    };
  } catch (error) {
    console.error('Error al realizar carrito:', error.message);
  }
}