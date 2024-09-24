import jwt from 'jsonwebtoken';
import { tokensecreto } from '../config.js';

export const autenticacion = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ mensaje: "No autorizado" });

  jwt.verify(token, tokensecreto, (err, user) => {
    if (err) {
      console.error("Error en la verificación del token:", err.message);
      return res.status(403).json({ mensaje: "Token inválido o expirado" });
    }
    req.user = user; 
    next(); 
  });
};
