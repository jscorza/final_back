import { newId } from '../../utils/id.js'

export class Ticket {
  #id
  #purchaser
  #amount
  #purchase_datetime

  constructor({
    id = newId(),
    purchaser,
    amount,
    purchase_datetime = Date.now(),
  }) {
    this.#id = id
    this.#purchaser = purchaser
    this.#amount = amount
    this.#purchase_datetime = purchase_datetime
  }

  

  dto() {
    return {
      id: this.#id,
      purchaser: this.#purchaser,
      amount: this.#amount,
      purchase_datetime: this.#purchase_datetime,
      
    }
  }
}