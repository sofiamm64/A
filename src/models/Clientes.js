import mongoose from "mongoose";

const modelclie = new mongoose.Schema({
    nombre: { type: String, required: true },
    email: { type: String, required: true },
    telefono: { type: String, required: true },
    estado: { type: String, enum: ['Activo', 'Inactivo'], default: 'Activo' },
    codigoUsuario: { type: String, required: true, unique: true },
}, {
    timestamps: true
});

export default mongoose.model('Clientes', modelclie);
