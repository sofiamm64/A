import mongoose from "mongoose";

const modelvent = new mongoose.Schema({
  VentaID: { type: Number, required: true, trim: true },
  ClienteID: { type: String, required: true },
  ServicioID: { type: String, required: true },
  FechaVenta: { type: Date, required: true },
  Cantidad: { type: Number, required: true, default: 0 },
  PrecioU: { type: Number, required: true, default: 0 },
  Total: { type: Number, required: true, default: 0 },
  Estado: { type: String, enum: ['pendiente', 'cancelado', 'completado'], default: 'pendiente' },
}, {
  timestamps: true
});

export default mongoose.model('Ventas', modelvent);
