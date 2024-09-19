import mongoose from "mongoose";

const modelserv = new mongoose.Schema({
    ServicioID: { type: Number, required: true, unique: true },
    Nombre: { type: String, required: true },
    Descripción: { type: String, required: true },
    Precio: { type: Number, required: true }, 
    Tipo: { type: String, required: true },
    Duracion: { type: Number, required: true },
    Total: { type: Number }
}, {
    timestamps: true
});

export default mongoose.model('Servicio', modelserv);
