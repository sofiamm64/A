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
router.get('/proveedor/:id',autenticacion, getproveedor);
router.post('/proveedor',autenticacion, crearproveedor);
router.delete('/proveedor/:id',autenticacion, eliminarproveedor);
router.put('/proveedor/:id',autenticacion, modificarproveedor);

router.get('/servicios', autenticacion, getsservicios);
router.get('/servicios/:id', autenticacion, getservicios);
router.post('/servicios', autenticacion, crearservicios);
router.delete('/servicios/:ServicioID', autenticacion, eliminarservicios);
router.put('/servicios/:ServicioID', autenticacion, modificarservicios);

router.get('/ventas',autenticacion,getsventas);
router.get('/ventas/:VentaID',autenticacion, getventas);
router.post('/ventas',autenticacion, crearventas);
router.delete('/ventas/:VentaID',autenticacion, eliminarventas);
router.put('/ventas/:VentaID',autenticacion, modificarventas);

router.get('/compras',autenticacion,getscompras);
router.get('/compras/:id',autenticacion, getcompras);
router.post('/compras',autenticacion, crearcompras);
router.delete('/compras/:id',autenticacion, eliminarcompras);
router.put('/compras/:id',autenticacion, modificarcompras);
 
export default router;
