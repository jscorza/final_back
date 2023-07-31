import { newId } from '../../utils/id.js'
import { obligatorio, validarCategory, validarCode, validarDescription, validarPrice, validarStock, validarTitle } from '../validations/validaciones.js'

export class Producto {
  #id
  #title
  #description
  #code
  #price
  #stock
  #category
  #thumbnail
  #status
  constructor({
    
    id = newId(),
    title,
    description,
    code,
    price,
    stock,
    category,
    thumbnail,
    status 
  }) {
     
    this.#id = id;

    
    obligatorio(title,"titulo");
    this.#title = validarTitle(title);

    

    this.#description = validarDescription(description);

    obligatorio(price,"price");
    this.#price = validarPrice(price);
    
    this.#thumbnail = thumbnail;

    obligatorio(code,'code');
    this.#code = validarCode(code);
    
    obligatorio(stock,'stock');
    this.#stock = validarStock(stock);
    
    obligatorio(category,'category');
    this.#category = validarCategory(category);

    this.#status = status;
    
  }


  dto() {
    return {
      id: this.#id,
      title: this.#title,
      description: this.#description,
      code: this.#code,
      price: this.#price,
      stock: this.#stock,
      category: this.#category,
      thumbnail: this.#thumbnail,
      status: this.#status,

    }
  }
}