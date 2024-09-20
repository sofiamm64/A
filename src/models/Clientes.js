import mongoose from "mongoose";

const modelclie = new mongoose.Schema({
    codigoUsuario: { type: String, required: true, unique: true },
    nombre: { type: String, required: true },
    email: { type: String, required: true },
    telefono: { type: String, required: true },
}, { timestamps: true });

export default mongoose.model('Clientes', modelclie);
