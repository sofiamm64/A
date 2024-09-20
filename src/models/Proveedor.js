import mongoose from "mongoose";

const modelprovee = new mongoose.Schema({
    ProveedorID: { type: Number, trim: true },
    nombre: { type: String, required: true, trim: true, unique: true },
    apellido: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, unique: true },
    telefono: { type: Number, required: true, trim: true }, 
    Direccion: { type: String, default: 'cero' },
  }, {
    timestamps: true
  });
  
  export default mongoose.model('Proveedor', modelprovee);