import mongoose from "mongoose";

const modeluser = new mongoose.Schema({
    nombre:{type: String, required: true, trim: true, minlength: 3},
    email:{type: String, required: true, trim: true, unique: true},
    telefono: { type: String, required: true },
    contraseña:{type: String, required: true},
},{
    timestamps: true
})

export default mongoose.model('Usuario', modeluser)
