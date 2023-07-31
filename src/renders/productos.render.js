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

    res.render('productos', {
      productos,
      showPreviousPage: page > 1,
      showNextPage: page < totalPages,
      previousPage: page - 1,
      nextPage: page + 1,
      usuario: req.usuario
    });
  } catch (error) {
    next(error);
  }
}
