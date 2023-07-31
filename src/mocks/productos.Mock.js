import { faker } from '@faker-js/faker'
import { Producto } from '../models/entities/Producto.js'

export function crearProductoMock() {
  return new Producto({
    id: faker.datatype.uuid(),
    title: faker.commerce.productName(2),
    stock: faker.datatype.number({min:1, max:347}),
    price: faker.datatype.number({min:1, max:110}),
    code: faker.datatype.string(7),
    category: "testing",
    description: faker.commerce.productDescription(10)
  })
}


export function crearProductosMock(cantProductos) {
  const productos = []
  for (let i = 0; i < cantProductos; i++) {
    productos.push(crearProductoMock().dto())
  }
  return productos 
}