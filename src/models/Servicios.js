import mongoose from "mongoose";

const modelserv = new mongoose.Schema({
    ServicioID: { type: Number, required: true, unique: true },
    Nombre: { type: String, required: true },
    Descripción: { type: String, required: true },
    Precio: { type: Number, required: true },
    Tipo: { type: String, required: true },
    Duracion: { type: Number, required: true },
    Total: { type: Number }  // Este campo se calculará automáticamente
}, {
    timestamps: true
});

// Middleware para calcular el campo Total antes de guardar el documento
modelserv.pre('save', function(next) {
    if (this.isNew || this.isModified('Precio') || this.isModified('Duracion')) {
        this.Total = this.Precio * this.Duracion;
    }
    next();
});

export default mongoose.model('Servicio', modelserv);
