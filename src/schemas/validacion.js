import {z} from 'zod'

export const registerS = z.object({
    nombre: z.string({
        required_error: 'el nombre es requerido'
    }).min(3).max(20),
    email: z.string({
        required_error: 'el email es requerido'     
    }).email({
        mensaje: 'el email es invalido'
    }),
    telefono: z.string({
        required_error: 'el telefono es requerido'
    }).min(10).max(15),
    contraseña: z.string({
        required_error: 'la contraseña es requerida'
    }).min(5,{
        mensaje: 'la contraseña debe tener minimo 5 caracters'
    }).max(20,{
        mensaje: 'la contraseña debe tener maximo 20 caracters'
    })
})

export const loginS = z.object({
    email: z.string({
        required_error: 'el email es requerido'     
    }).email({
        mensaje: 'el email es invalido'
    }),
    contraseña: z.string({
        required_error: 'la contraseña es requerida'
    }).min(5,{
        mensaje: 'la contraseña debe tener minimo 5 caracters'
    }).max(20,{
        mensaje: 'la contraseña debe tener maximo 20 caracters'
    })
})
