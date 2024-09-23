import mongoose from "mongoose";

const modelcomp = new mongoose.Schema({
  compraID: { type: Number, required: true, unique: true },
  ProveedorID: { type: String, required: true },
  ServicioID: { type: String, required: true },
  Cantidad: { type: Number, required: true, default: 0 },
  PrecioU: { type: Number, required: true, default: 0 },
  Fechacomp: { type: Date, required: true },
  Total: { type: Number},
  Tipo: { type: String, enum:['pendiente', ' cancelado', 'completada'], default: 'pendiente' },
},{
  timestamps: true
  });

export default mongoose.model('Compras', modelcomp)