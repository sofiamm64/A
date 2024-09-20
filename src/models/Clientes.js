import mongoose from "mongoose";

const modelclie = new mongoose.Schema({
    clienteID: { Type: Number, unique: true },
    nombre: { type: String, required: true },
    apellido: { type: String, required: true },
    email: { type: String, required: true },
    telefono: { type: Number },
}, {
    timestamps: true
});

export default mongoose.model('Clientes', modelclie);
