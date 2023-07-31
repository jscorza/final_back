import { Carrito } from '../models/entities/Carrito.js'
import { Ticket } from '../models/entities/Ticket.js'
import { carritosRepository } from '../repositories/carritos.repository.js'
import { productosRepository } from '../repositories/productos.repository.js'
import { ticketsRepository } from '../repositories/tickets.repository.js'
import { usuariosRepository } from '../repositories/usuarios.repository.js'

class CarritosService {

  async agregarProducto(pid, uid) {
    try {
      
      const producto = await productosRepository.readOne({ id: pid });
      
      if (!producto) {
        throw new Error("Producto no encontrado");
      }
  
      const usuario = await usuariosRepository.readOne({ id: uid });
      if (!usuario) {
        throw new Error("Usuario no encontrado");
      }
      const carritoPendiente = usuario.carritos.find(carrito => carrito.estado === 'pendiente');
      
  
      if (carritoPendiente) {
        
        const carrito = await carritosRepository.readOne({ id: carritoPendiente.idCarrito });
        const productoEnCarrito = carrito.productos.find(item => item.producto.toString() === producto.id.toString());
        if (productoEnCarrito) {
          productoEnCarrito.quantity += 1;
        } else {
          carrito.productos.push({
            producto: producto.id,
            quantity: 1
          });
        }
  
        await carritosRepository.updateOne({ id: carrito.id }, carrito);
      } else {
        
        const productos = [{producto: producto.id ,quantity: 1}] 
        const nuevoCarrito = new Carrito({productos:productos});
        const carritoCreado = await carritosRepository.create(nuevoCarrito.dto());
        usuario.carritos.push({
          idCarrito: carritoCreado.id,
          estado: carritoCreado.estado
        });
  
        await usuariosRepository.updateOne({ id: usuario.id }, usuario);
      }
    } catch (error) {
      throw new Error('Error al agregar el producto al carrito');
    }
  }



  async   extraerProductosCarrito(uid) {
    const usuario = await usuariosRepository.readOne({ id: uid });
    const carritoPendiente = usuario.carritos.find(carrito => carrito.estado === 'pendiente');
    
    

    if(carritoPendiente){
      const carrito = await carritosRepository.readOne({ id: carritoPendiente.idCarrito });
      const productos = [];
    for (const item of carrito.productos) {
      const producto = await productosRepository.readOne({ id: item.producto.toString() });
      productos.push({
        producto:{
          id: producto.id
          ,price: producto.price,
          title: producto.title
        },
        quantity: item.quantity,
        qp : producto.price * item.quantity
      });
    }
    return productos;
    }else{
      const prod = []
      return prod  
    }
    
    
  }

  async eliminarProducto(pid, uid) {
    try {
      
      const producto = await productosRepository.readOne({ id: pid });
      
      if (!producto) {
        throw new Error("Producto no encontrado");
      }
  
      const usuario = await usuariosRepository.readOne({ id: uid });
      if (!usuario) {
        throw new Error("Usuario no encontrado");
      }
      const carritoPendiente = usuario.carritos.find(carrito => carrito.estado === 'pendiente');
      
  
      if (carritoPendiente) {
        
        const carrito = await carritosRepository.readOne({ id: carritoPendiente.idCarrito });
        const productoEnCarrito = carrito.productos.find(item => item.producto.toString() === producto.id.toString());
        if (productoEnCarrito) {
          if(productoEnCarrito.quantity>1){
            productoEnCarrito.quantity -= 1;
          }else {
            carrito.productos = carrito.productos.filter(item => item.producto.toString() !== producto.id.toString());
          }
          
        } else {
          throw new Error("no se encontro el producto en el carrito")
        }
  
        await carritosRepository.updateOne({ id: carrito.id }, carrito);
      } else {
        
        }
      
    } catch (error) {
      throw new Error('Error al eliminar el producto del carrito');
    }
  }

  async compra(uid) {
    const usuario = await usuariosRepository.readOne({ id: uid });
    const carritoPendiente = usuario.carritos.find(carrito => carrito.estado === 'pendiente');
    const carrito = await carritosRepository.readOne({ id: carritoPendiente.idCarrito });
  
    const productosParaComprado = [];
    const productosNoDisponibles = [];
  
    for (const item of carrito.productos) {
      const producto = await productosRepository.readOne({ id: item.producto.toString() });
  
      if (producto.stock >= item.quantity) {
        // Suficiente stock disponible
        productosParaComprado.push({
          producto: producto.id,
          
          quantity: item.quantity
        });
  
        // Restar la cantidad comprada al stock
        producto.stock -= item.quantity;
        await productosRepository.updateOne({id: producto.id},producto); // Actualizar el producto en el repositorio
      } else {
        // Insuficiente stock disponible
        productosParaComprado.push({
          producto: producto.id,
          quantity: producto.stock // Vender el stock disponible
        });
        const unidadesFaltantes = item.quantity - producto.stock;
        // Actualizar el stock del producto a 0
        producto.stock = 0;
        await productosRepository.updateOne({id: producto.id},producto); // Actualizar el producto en el repositorio
  
        // Agregar las unidades faltantes al nuevo carrito pendiente
        productosNoDisponibles.push({
          producto: producto.id, quantity: unidadesFaltantes
        });
      }
    }
    if (productosNoDisponibles.length > 0) {
      // Crear un nuevo carrito pendiente con los productos no disponibles
      const nuevoCarritoPend = new Carrito({productos:productosNoDisponibles});
      const nuevoCarritoPendiente = await carritosRepository.create(nuevoCarritoPend.dto());
      usuario.carritos.push({idCarrito: nuevoCarritoPendiente.id,estado: "pendiente"})
    }


  
      carritoPendiente.estado = "comprado"
      const actualizarUser = await usuariosRepository.updateOne({id: usuario.id},usuario)
      // Actualizar el estado del carrito actual a 'comprado'
      const car = new Carrito({productos:productosParaComprado,estado: "comprado"})
      await carritosRepository.updateOne({id: carrito.id},car.dto());

      //generar ticket 
      const productosTicket = [];
    for (const item of productosParaComprado) {
      const producto = await productosRepository.readOne({ id: item.producto.toString() });
      productosTicket.push({
        producto:{
          id: producto.id
          ,price: producto.price,
          title: producto.title
        },
        quantity: item.quantity,
      });
    }
        let amount = 0;
        productosTicket.forEach(producto => {
        const precioTotal = producto.producto.price * producto.quantity;
        amount += precioTotal;})
        const ticket = new Ticket({purchaser: usuario.id, amount:amount})
        const tick = await ticketsRepository.create(ticket.dto())
  }
  
}




  

 
export const carritosService = new CarritosService()