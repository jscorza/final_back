import { carritosService } from "../services/carritos.service.js";


export async function renderCarrito (req,res,next){
    try {
        const uid = req.usuario.id

        const productos = await carritosService.extraerProductosCarrito(uid);
        let totalCarrito = 0;
        productos.forEach(producto => {
        const precioTotal = producto.producto.price * producto.quantity;
        totalCarrito += precioTotal;
});
        
    
        res.render('carrito', {
          productos,
          usuario: req.usuario,
          totalCarrito
        });
      } catch (error) {
        next(error);
      }


  
}