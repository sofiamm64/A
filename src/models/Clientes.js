import mongoose from "mongoose";

const modelclie= new mongoose.Schema({
    nombre: { type: String, required: true },
    correo: { type: String, required: true },
    telefono: { type: String, required: true },
    cargo: { type: String, required: true },
    codigoUsuario: { type: String, required: true, unique: true },
    estado: { type: String, enum: ['Activo', 'Inactivo'], default: 'Activo' },
},{
    timestamps: true
})

export default mongoose.model('Clientes', modelclie)