import mongoose from "mongoose";

const modelclie= new mongoose.Schema({
    clienteID: { type: Number, trim: true, unique: true, required: true },
    nombre: { type: String, required: true, trim: true},
    apellido: { type: String, required: true, trim: true},
    email: { type: String, required: true, trim: true, unique: true },
    telefono: { type: String, required: true, trim: true }
},{
    timestamps: true
})

export default mongoose.model('Clientes', modelclie)