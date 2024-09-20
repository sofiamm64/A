const modelserv = new mongoose.Schema({
    ProductoServicioID: { type: Number, required: true, unique: true },
    Nombre: { type: String, required: true },
    Descripción: { type: String, required: true },
    Precio: { type: Number, required: true, default: 0 },
    Tipo: {
      type: String,
      required: true,
      enum: ['Producto', 'Servicio'],
      default: 'Producto'
    },
    Duracion: { type: Number, default: 0 }
  }, {
    timestamps: true,
  });
  