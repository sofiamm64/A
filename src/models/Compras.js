import mongoose from "mongoose";

const modelcomp = new mongoose.Schema({
  compraID: { type: Number, required: true, unique: true },
  ProveedorID: { type: String, required: true },
  Fechacomp: { type: Date, required: true },
  Total: { type: Number},
  Tipo: { type: String, enum:['pendiente', ' cancelado', 'completado'], default: 'pendiente' },
},{
  timestamps: true
  });

export default mongoose.model('Compras', modelcomp)