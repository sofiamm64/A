import { creartoken } from '../libs/jwt.js';
import bcrypt from 'bcryptjs'

import Usuario from '../models/usuario.js';
import Clientes from '../models/Clientes.js';
import Proveedor from '../models/Proveedor.js'
import Servicio from '../models/Servicios.js';
import Ventas from '../models/Ventas.js';
import Compras from '../models/Compras.js';


export const register = async (req, res) => {
  const { nombre, email, telefono, contraseña } = req.body;
  try {
      const hashcontraseña = await bcrypt.hash(contraseña, 10);

      const newUsuario = new Usuario({
          nombre,
          email,
          telefono,
          contraseña: hashcontraseña,
      });

      const saveusuario = await newUsuario.save();
      const token = await creartoken({ id: saveusuario.id });

      res.json({
          id: saveusuario._id,
          nombre: saveusuario.nombre,
          email: saveusuario.email,
          telefono: saveusuario.telefono,
          createdAt: saveusuario.createdAt,
          updatedAt: saveusuario.updatedAt,
          token
      });
  } catch (error) {
      res.status(500).json({ mensaje: error.message });
  }
};

export const login = async (req, res) => {
  const { email, contraseña } = req.body;

  try {
      const revisar = await Usuario.findOne({ email });
      if (!revisar) return res.status(400).json({ mensaje: "No está registrado" });

      const validando = await bcrypt.compare(contraseña, revisar.contraseña);
      if (!validando) return res.status(400).json({ mensaje: "Contraseña incorrecta" });

      const token = await creartoken({ id: revisar.id });

      res.json({
          id: revisar._id,
          nombre: revisar.nombre,
          email: revisar.email,
          createdAt: revisar.createdAt,
          updatedAt: revisar.updatedAt,
          token
      });
  } catch (error) {
      console.error('Error en login:', error);
      res.status(500).json({ mensaje: "Error interno del servidor" });
  }
};

export const logout = (req, res) => {
  try {
      res.sendStatus(200);
  } catch (error) {
      res.status(500).json({ mensaje: error.message });
  }
};

export const profile = async (req, res) => {
  try {
      const buscarp = await Usuario.findById(req.user.id);
      if (!buscarp) return res.sendStatus(400).json({ mensaje: "Usuario no encontrado" });
      
      return res.json({
          id: buscarp._id,
          nombre: buscarp.nombre,
          email: buscarp.email,
          createdAt: buscarp.createdAt,
          updatedAt: buscarp.updatedAt
      });
  } catch (error) {
      res.status(500).json({ mensaje: error.message });
  }
};


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const getsclientes = async (req, res) => {
  try {
    const clientes = await Clientes.find();
    res.json(clientes);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener los clientes: ' + error.message });
  }
};
export const crearclientes = async (req, res) => {
  try {
    console.log('Datos recibidos en el cuerpo de la petición:', req.body);

    const { clienteID, nombre, apellido, email, telefono } = req.body;

    
    if (!clienteID || !nombre || !apellido || !email || !telefono) {
      console.log('Faltan campos en la petición');
      return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    
    const existingCliente = await Clientes.findOne({ clienteID });
    if (existingCliente) {
      console.log('El cliente ya existe');
      return res.status(400).json({ error: 'El clienteID ya está en uso.' });
    }

    
    const cliente = new Clientes({ clienteID, nombre, apellido, email, telefono });
    console.log('Nuevo cliente creado:', cliente);

    await cliente.save();
    res.status(201).json({ mensaje: 'Cliente creado con éxito', cliente });
  } catch (error) {
    console.error('Error al crear el cliente:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};
export const getclientes = async (req, res) => {
  try {
    const cliente = await Clientes.findOne({ clienteID: req.params.clienteID });
    if (!cliente) return res.status(404).json({ mensaje: 'Cliente no encontrado' });
    res.json(cliente);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener el cliente: ' + error.message });
  }
};
export const eliminarclientes = async (req, res) => {
  try {
    const cliente = await Clientes.findOneAndDelete({ clienteID: req.params.clienteID });
    if (!cliente) return res.status(404).json({ mensaje: 'Cliente no encontrado' });
    res.status(204).send(); // Específicamente indica que no hay contenido tras eliminar
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar el cliente: ' + error.message });
  }
};
export const modificarclientes = async (req, res) => {
  try {
    const cliente = await Clientes.findOneAndUpdate(
      { clienteID: req.params.clienteID },
      req.body,
      { new: true } 
    );
    if (!cliente) return res.status(404).json({ mensaje: 'Cliente no encontrado' });
    res.json({ mensaje: 'Cliente actualizado con éxito', cliente });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al actualizar el cliente: ' + error.message });
  }
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const getsproveedor = async (req, res) => {
  try {
    const proveedor = await Proveedor.find();
    res.json(proveedor);
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
};

export const crearproveedor = async (req, res) => {
  try {
    const { ProveedorID, nombre, apellido, telefono, email, Direccion } = req.body;
    const newproveedor = new Proveedor({
      ProveedorID,
      nombre,
      apellido,
      telefono,
      email,
      Direccion
    });
    const saveproveedor = await newproveedor.save();
    res.json(saveproveedor);
  } catch (error) { 
    res.status(500).json({ mensaje: error.message });
  }
};

export const getproveedor = async (req, res) => {
  try {
    const proveedor = await Proveedor.findOne({ ProveedorID: req.params.ProveedorID });
    if (!proveedor) return res.status(404).json({ mensaje: "Proveedor no encontrado" });
    res.json(proveedor);
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
};

export const eliminarproveedor = async (req, res) => {
  try {
    const proveedor = await Proveedor.findOneAndDelete({ ProveedorID: req.params.ProveedorID });
    if (!proveedor) return res.status(404).json({ mensaje: "Proveedor no encontrado" });
    return res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
};

export const modificarproveedor = async (req, res) => {
  try {
    const proveedor = await Proveedor.findOneAndUpdate({ ProveedorID: req.params.ProveedorID }, req.body, { new: true });
    if (!proveedor) return res.status(404).json({ mensaje: "Proveedor no encontrado" });
    res.json(proveedor);
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
};
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const getsservicios = async (req, res) => {
  try {
    const servicios = await Servicio.find();
    res.json(servicios);
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
};
export const crearservicios = async (req, res) => {
  try {
    const { ServicioID, Nombre, Descripcion, Precio, Tipo, Cantidad, Estado } = req.body;

    
    if (!ServicioID || !Nombre || !Descripcion || !Precio || !Tipo) {
      return res.status(400).json({ error: 'Todos los campos obligatorios deben estar presentes' });
    }

    
    const servicio = new Servicio({
      ServicioID,
      Nombre,
      Descripcion,
      Precio,
      Tipo,
      Cantidad: Cantidad || 0, 
      Estado: Estado || 'activo' 
    });

    await servicio.save();
    res.status(201).json(servicio);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};
export const getservicios = async (req, res) => {
  try {
    const servicio = await Servicio.findOne({ ServicioID: req.params.ServicioID });
    if (!servicio) return res.status(404).json({ mensaje: 'Servicio no encontrado' });
    res.json(servicio);
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
};
export const eliminarservicios = async (req, res) => {
  try {
    const servicio = await Servicio.findOneAndDelete({ ServicioID: req.params.ServicioID });
    if (!servicio) return res.status(404).json({ mensaje: 'Servicio no encontrado' });
    res.sendStatus(204); 
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
};
export const modificarservicios = async (req, res) => {
  console.log('Received update request for ServicioID:', req.params.ServicioID); 
  try {
    const { ServicioID, Nombre, Descripcion, Precio, Tipo, Cantidad, Estado } = req.body;

    const servicio = await Servicio.findOneAndUpdate(
      { ServicioID: req.params.ServicioID },
      {
        $set: {
          Nombre,
          Descripcion,
          Precio,
          Tipo,
          Cantidad: Cantidad !== undefined ? Cantidad : 0, 
          Estado: Estado || 'activo' 
        }
      },
      { new: true } 
    );

    if (!servicio) return res.status(404).json({ mensaje: 'Servicio no encontrado' });
    res.json(servicio);
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


export const getsventas = async (req, res) => {
  try {
    const ventas = await Ventas.find();
    res.json(ventas);
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
};

export const crearventas = async (req, res) => {
  try {
    const { VentaID, ClienteID, ServicioID, FechaVenta, Cantidad, PrecioU, Estado } = req.body;

    const total = (Cantidad || 0) * (PrecioU || 0); // Calcular el total aquí

    const nuevaVenta = new Ventas({
      VentaID,
      ClienteID,
      ServicioID,
      FechaVenta: new Date(FechaVenta),
      Cantidad: Cantidad || 0,
      PrecioU: PrecioU || 0,
      Total: total, // Usar el total calculado
      Estado: Estado || 'pendiente',
    });

    await nuevaVenta.save();
    res.status(201).json(nuevaVenta);
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
};

export const getventas = async (req, res) => {
  try {
    const venta = await Ventas.findOne({ VentaID: req.params.VentaID });
    if (!venta) return res.status(404).json({ mensaje: "Venta no encontrada" });
    res.json(venta);
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
};

export const eliminarventas = async (req, res) => {
  try {
    const venta = await Ventas.findOneAndDelete({ VentaID: req.params.VentaID });
    if (!venta) return res.status(404).json({ mensaje: "Venta no encontrada" });
    return res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
};

export const modificarventas = async (req, res) => {
  try {
    const { Cantidad, PrecioU, Estado } = req.body;
    const total = (Cantidad || 0) * (PrecioU || 0); // Calcular el total aquí

    const venta = await Ventas.findOneAndUpdate(
      { VentaID: req.params.VentaID },
      {
        Cantidad: Cantidad || 0,
        PrecioU: PrecioU || 0,
        Total: total, // Usar el total calculado
        Estado: Estado || 'pendiente',
      },
      { new: true }
    );
    if (!venta) return res.status(404).json({ mensaje: "Venta no encontrada" });
    res.json(venta);
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const getscompras = async (req, res) => {
  try {
    const compras = await Compras.find();
    res.json(compras);
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
};

export const crearcompras = async (req, res) => {
  try {
    const { compraID, ProveedorID, ServicioID, Cantidad, PrecioU, Fechacomp, Total, Estado } = req.body;
    const newcompras = new Compras({
      compraID,
      ProveedorID,
      ServicioID,
      Cantidad,
      PrecioU,
      Fechacomp,
      Total,
      Estado: Estado || 'pendiente', // Default state if not provided
    });
    const savecompras = await newcompras.save();
    res.status(201).json(savecompras);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: error.message });
  }
};

export const getcompras = async (req, res) => {
  try {
    const compra = await Compras.findById(req.params.id);
    if (!compra) return res.status(404).json({ mensaje: "Compra no encontrada" });
    res.json(compra);
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
};

export const eliminarcompras = async (req, res) => {
  try {
    const { id } = req.params;
    const compraEliminada = await Compras.findByIdAndDelete(id);
    
    if (!compraEliminada) {
      return res.status(404).json({ mensaje: 'Compra no encontrada' });
    }
    
    res.status(200).json({ mensaje: 'Compra eliminada con éxito' });
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
};

export const modificarcompras = async (req, res) => {
  try {
    const compra = await Compras.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!compra) return res.status(404).json({ mensaje: "Compra no encontrada" });
    res.json(compra);
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
};

