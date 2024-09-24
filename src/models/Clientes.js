import mongoose from "mongoose";

const modelclie = new mongoose.Schema({
  clienteID: { type: Number, unique: true, required: true }, 
  Nombre: { type: String, required: true },
  apellido: { type: String, required: true },
  email: { type: String, required: true },
  telefono: { type: Number, required: true }, 
}, {
  timestamps: true
});

export default mongoose.model('Clientes', modelclie);
