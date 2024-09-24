import mongoose from "mongoose";

const modelvent = new mongoose.Schema({
  VentaID: { type: Number, required: true, unique: true }, 
  ClienteID: { type: String, required: true },
  ServicioID: { type: String, required: true },
  FechaVenta: { type: Date, required: true },
  Cantidad: { type: Number, required: true, default: 0 },
  PrecioU: { type: Number, required: true, default: 0 },
  Total: { type: Number, required: true, default: 0 },
  Tipo: { type: String, enum: ['pendiente', 'cancelado', 'completado'], default: 'pendiente' },
}, {
  timestamps: true
});
modelvent.pre('save', async function(next) {
  if (this.isNew) {
    const lastVenta = await this.constructor.findOne().sort({ VentaID: -1 }); 
    this.VentaID = lastVenta ? lastVenta.VentaID + 1 : 1; 
  }
  next();
});

export default mongoose.model('Ventas', modelvent);
