import { productosRepository } from "../repositories/productos.repository.js";

export async function renderProducts(req, res, next) {
  try {
    const page = parseInt(req.query.page) || 1;
    
    const limit = 3; // Número de productos por página

    const allProducts = await productosRepository.readMany({});
    const totalProducts = allProducts.length;
    const totalPages = Math.ceil(totalProducts / limit);

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const productos = allProducts.slice(startIndex, endIndex);

    for (const producto of productos) {
      if(producto.stock == 0){
        producto.sinStock = true
      }else{
        producto.sinStock = false
      }
      
    }
    const esAdmin = req.usuario.rol == "admin" 
    

    res.render('productos', {
      productos,
      showPreviousPage: page > 1,
      showNextPage: page < totalPages,
      previousPage: page - 1,
      nextPage: page + 1,
      usuario: req.usuario,
      esAdmin : esAdmin
    });
  } catch (error) {
    next(error);
  }
}
export async function renderRestock(req, res, next){
  try {
    res.render('restock')
    
  } catch (error) {
    next(error)
  }
}
