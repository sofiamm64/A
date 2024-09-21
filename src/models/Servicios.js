import mongoose from 'mongoose';

const modelserv = new mongoose.Schema({
    ServicioID: { type: Number, required: true, unique: true },
    Nombre: { type: String, required: true },
    Descripcion: { type: String, required: true },
    Precio: { type: Number, required: true },
    Tipo: { type: String, enum: ['Producto', 'Servicio'], default: 'Servicio', required: true },
    Cantidad: { type: Number, required: true, default: 0 }, 
    Estado: { type: String, enum: ['activo', 'inactivo'], default: 'activo' , required: true },
}, {
    timestamps: true
});

export default mongoose.model('Servicio', modelserv);
