import bcryptjs from 'bcryptjs'; // Importamos la librería bcryptjs
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/auth.config.js';

class Criptografia {
  hashear(dato) {
    return bcryptjs.hashSync(dato, 10); // Utilizamos bcryptjs en lugar de bcrypt
  }

  comparar(actual, almacenada) {
    return bcryptjs.compareSync(actual, almacenada); // Utilizamos bcryptjs en lugar de bcrypt
  }

  generarToken(dato) {
    return jwt.sign(dato, JWT_SECRET, { expiresIn: '1h' });
  }

  decodificarToken(token) {
    try {
      return jwt.verify(token, JWT_SECRET);
    } catch (error) {
      throw new Error('error de autenticacion: sesión expirada');
    }
  }
}

export const criptografiador = new Criptografia();
