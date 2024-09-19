import mongoose from "mongoose";

const modelserv = new mongoose.Schema({
    ServicioID: { type: Number, required: true, unique: true },
    Nombre: { type: String, required: true },
    Descripción: { type: String, required: true },
    Precio: { type: Number },
    Tipo: { type: String, required: true },
    duracion: { type: Number},
}, {
    timestamps: true
});

export default mongoose.model('Servicio', modelserv);
