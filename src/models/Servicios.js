import mongoose from 'mongoose';

const modelserv = new mongoose.Schema({
    ServicioID: { type: Number, required: true, unique: true },
    Nombre: { type: String, required: true },
    Descripción: { type: String, required: true },
    Precio: { type: Number, required: true },
    Tipo: { type: String, required: true },
    Duracion: { type: Number, required: true },
    Cantidad: { type: Number, default: 0 }, // Campo cantidad con valor inicial 0
    Estado: { type: String, enum: ['activo', 'inactivo'], default: 'activo' }
    }, { timestamps: true });

export default mongoose.model('Servicio', modelserv);
