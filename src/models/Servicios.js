import mongoose from 'mongoose';

const servicioSchema = new mongoose.Schema({
    ServicioID: { type: Number, required: true, unique: true },
    Nombre: { type: String, required: true },
    Descripción: { type: String, required: true },
    Precio: { type: Number, required: true },
    Tipo: { type: String, required: true },
    Duracion: { type: Number, required: true },
    Estado: { 
        type: String, 
        enum: ['activo', 'inactivo'], 
        default: 'activo' 
    }, 
    Total: { 
        type: Number, 
        default: 0 
    },
}, {
    timestamps: true 
});

export default mongoose.model('Servicio', servicioSchema);
