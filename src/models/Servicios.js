import mongoose from 'mongoose';

const modelserv = new mongoose.Schema({
    ServicioID: { type: Number, required: true, unique: true },
    Nombre: { type: String, required: true },
    Descripción: { type: String, required: true },
    Precio: { type: Number, required: true },
    Tipo: { type: String, enum: ['Producto', 'Servicio'], default: 'Servicio' },
    Duracion: { type: Number, default: 0 },
    Cantidad: { type: Number, default: 0 },
    Estado: { type: String, enum: ['activo', 'inactivo'], default: 'activo' }
    }, { timestamps: true });

export default mongoose.model('Servicio', modelserv);
