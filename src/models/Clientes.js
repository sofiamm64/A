import mongoose from "mongoose"; 

const modelclie = new mongoose.Schema({
    clienteID: { type: Number, required: true, unique: true },
    nombre: { type: String, required: true },
    apellido: { type: String, required: true },
    email: { type: String, required: true },
    telefono: { type: String }
}, { timestamps: true });

export default mongoose.model('Clientes', modelclie);
