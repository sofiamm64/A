import jwt from 'jsonwebtoken';
import { tokensecreto } from '../config.js';

export const autenticacion = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  console.log('Authorization Header:', authHeader); // Depura el encabezado
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    console.log('No token provided');
    return res.status(401).json({ mensaje: "No autorizado" });
  }

  jwt.verify(token, tokensecreto, (err, user) => {
    if (err) {
      console.log('Token verification failed:', err);
      return res.status(403).json({ mensaje: "Token inválido" }); 
    }
    req.user = user; 
    next(); 
  });
};
