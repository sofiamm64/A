import { Router } from 'express';
import { autenticacion } from '../middlewares/validaciontoken.js';
import { validacionS } from '../middlewares/validacion.js';
import { login, 
        register, 
        logout, 
        profile,

        getsclientes,
        getclientes,
        crearclientes,
        eliminarclientes,
        modificarclientes,

        getsproveedor,
        getproveedor,
        crearproveedor,
        eliminarproveedor,
        modificarproveedor,

        getsservicios,
        getservicios,
        crearservicios,
        eliminarservicios,
        modificarservicios,

        Acantidad,
        
        getsventas,
        getventas,
        crearventas,
        eliminarventas,
        modificarventas,
        
        getscompras,
        getcompras,
        crearcompras,
        eliminarcompras,
        modificarcompras 
} from '../controllers/auto_controllers.js';
import { registerS, loginS } from '../schemas/validacion.js';

const router = Router();

router.post('/register', validacionS(registerS), register);
router.post('/login', validacionS(loginS),login);
router.post('/logout', logout) ;
router.get("/permisos", autenticacion , profile)

router.get('/clientes', autenticacion, getsclientes);
router.get('/clientes/:clienteID', autenticacion, getclientes);
router.post('/clientes', autenticacion, crearclientes);
router.delete('/clientes/:clienteID', autenticacion, eliminarclientes);
router.put('/clientes/:clienteID', autenticacion, modificarclientes);


router.get('/proveedor',autenticacion,getsproveedor);
router.get('/proveedor/:ProveedorID',autenticacion, getproveedor);
router.post('/proveedor',autenticacion, crearproveedor);
router.delete('/proveedor/:ProveedorID',autenticacion, eliminarproveedor);
router.put('/proveedor/:ProveedorID',autenticacion, modificarproveedor);

router.get('/servicios', autenticacion, getsservicios);
router.get('/servicios/:ServicioID', autenticacion, getservicios);
router.post('/servicios', autenticacion, crearservicios);
router.delete('/servicios/:ServicioID', autenticacion, eliminarservicios);
router.put('/servicios/:ServicioID', autenticacion, modificarservicios);

router.get('/ventas', autenticacion, getsventas);
router.get('/ventas/:VentaID', autenticacion, getventas);
router.post('/ventas', autenticacion, crearventas);
router.delete('/ventas/:VentaID', autenticacion, eliminarventas);
router.put('/ventas/:VentaID', autenticacion, modificarventas);

router.put('/servicios/:ServicioID/cantidad', autenticacion, Acantidad);

router.get('/compras',autenticacion,getscompras);
router.get('/compras/:compraID',autenticacion, getcompras);
router.post('/compras',autenticacion, crearcompras);
router.delete('/compras/:compraID',autenticacion, eliminarcompras);
router.put('/compras/:compraID',autenticacion, modificarcompras);
 
export default router;
