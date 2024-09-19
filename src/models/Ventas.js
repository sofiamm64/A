import mongoose from "mongoose";

const modelvent = new mongoose.Schema({
  VentaID: { type: Number, required: true, trim: true }, 
  ClienteID: { type: String, required: true },
  FechaVenta: { type: Date, required: true },
  Total: { type: Number}, 
  Tipo: { type: String, enum:['pendiente', ' cancelado', 'completado'], default: 'pendiente' },
}, {
  timestamps: true
});

export default mongoose.model('Ventas', modelvent);
