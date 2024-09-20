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
    console.error(error);
    return res.status(500).json({ mensaje: 'Error interno del servidor' });
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
    console.error(error);
    return res.status(500).json({ mensaje: 'Error interno del servidor' });
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
    console.error(error);
    return res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};

//tareas 

export const getsclientes = async (req, res) => {
  try {
    const clientes = await Clientes.find();
    res.json(clientes);
  } catch (error) {
    console.error('Error en getsclientes:', error);
    res.status(500).json({ mensaje: error.message });
  }
};

export const crearclientes = async (req, res) => {
  try {
    const { clienteID, nombre, apellido, telefono, email } = req.body;

    if (!clienteID || !nombre || !apellido || !telefono || !email) {
      return res.status(400).json({ mensaje: 'Todos los campos son obligatorios.' });
    }

    const newCliente = new Clientes({
      clienteID,
      nombre,
      apellido,
      telefono,
      email,
    });

    const saveCliente = await newCliente.save();
    res.json(saveCliente);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};

export const getclientes = async (req, res) => {
  try {
    const cliente = await Clientes.findOne({ clienteID: req.params.clienteID });
    if (!cliente) return res.status(404).json({ mensaje: "Cliente no encontrado" });
    res.json(cliente);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};

export const eliminarclientes = async (req, res) => {
  try {
    const cliente = await Clientes.findOneAndDelete({ clienteID: req.params.clienteID });
    if (!cliente) return res.status(404).json({ mensaje: "Cliente no encontrado" });
    return res.sendStatus(204);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};

export const modificarclientes = async (req, res) => {
  try {
    const cliente = await Clientes.findOneAndUpdate({ clienteID: req.params.clienteID }, req.body, { new: true });
    if (!cliente) return res.status(404).json({ mensaje: "Cliente no encontrado" });
    res.json(cliente);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};

//
export const getsproveedor = async (req, res) => {
  try{
  const proveedor = await Proveedor.find()
  res.json(proveedor)
  } catch {
    console.error(error);
    return res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
}
export const crearproveedor = async (req, res) => {
  console.log({
    ProductoServicioID: parseInt(ProductoServicioID, 10),
    Nombre: nombre,
    Descripción: descripcion,
    Precio: parseFloat(precio),
    Tipo: tipo,
  });
  
  try{
    const { ProveedorID, nombre, apellido, telefono, email, Dirección } = req.body;
  const newproveedor = new Proveedor({
    ProveedorID,
    nombre,
    apellido,
    telefono,
    email,
    Dirección
  });
  const saveproveedor = await newproveedor.save();
  res.json(saveproveedor);
} catch {
  console.error(error);
  return res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
}

export const getproveedor = async (req, res) => {
  try{
  const proveedor = await Proveedor.findById(req.params.id);
  if (!proveedor) return res.status(404).json({ mensaje: "Provedor no encontrado" });
  res.json(proveedor);
  } catch {
    console.error(error);
    return res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
}
export const eliminarproveedor = async (req, res) => {
  try{
  const proveedor = await Proveedor.findByIdAndDelete(req.params.id);
  if (!proveedor) return res.status(404).json({ mensaje: "Provedor no encontrado" });
  return res.sendStatus(204);
  } catch {
    console.error(error);
    return res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
}
export const modificarproveedor = async (req, res) => {
  try{
  const proveedor = await Proveedor.findByIdAndUpdate(req.params.id, req.body,{new: true});
    if (!proveedor) return res.status(404).json({ mensaje: "Provedor no encontrado" });
    res.json(proveedor);
    } catch {
      console.error(error);
      return res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
}
//
export const getServicios = async (req, res) => {
  try {
    const servicios = await Servicio.find();
    res.json(servicios);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};

export const crearServicio = async (req, res) => {
  try {
    const { ProductoServicioID, Nombre, Descripción, Precio, Tipo } = req.body;

    // Verificar campos obligatorios
    if (!ProductoServicioID || !Nombre || !Descripción || !Precio || !Tipo) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    // Verificar tipo y valor de Precio
    if (typeof Precio !== 'number' || Precio <= 0) {
      return res.status(400).json({ error: 'Precio debe ser un número positivo' });
    }

    // Crear el nuevo servicio
    const servicio = new Servicio({
      ProductoServicioID,
      Nombre,
      Descripción,
      Precio,
      Tipo,
    });

    await servicio.save();
    res.status(201).json(servicio);
  } catch (error) {
    console.error('Error al crear el servicio:', error);
    return res.status(500).json({ mensaje: 'Error interno del servidor', error: error.message });
  }
};

export const getServicioByID = async (req, res) => {
  try {
    const servicio = await Servicio.findOne({ ProductoServicioID: req.params.id });
    if (!servicio) return res.status(404).json({ mensaje: 'Servicio no encontrado' });
    res.json(servicio);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};

export const eliminarServicio = async (req, res) => {
  try {
    const servicio = await Servicio.findOneAndDelete({ ProductoServicioID: req.params.id });
    if (!servicio) return res.status(404).json({ mensaje: 'Servicio no encontrado' });
    res.sendStatus(204);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};

export const modificarServicio = async (req, res) => {
  try {
    const servicio = await Servicio.findOneAndUpdate(
      { ProductoServicioID: req.params.id },
      req.body,
      { new: true }
    );
    if (!servicio) return res.status(404).json({ mensaje: 'Servicio no encontrado' });
    res.json(servicio);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};

//
export const getssventas = async (req, res) => {
  try{
  const Ventas = await Ventas.find()
  res.json(Ventas)
} catch{
  console.error(error);
  return res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
}
export const crearventas = async (req, res) => {
  try {
    console.log(req.body);
    const { VentaID, ClienteID, ServicioID, FechaVenta, Total } = req.body;

    const nuevaVenta = new Ventas({
      VentaID,
      ClienteID,
      ServicioID,
      FechaVenta: new Date(FechaVenta),
      Total: parseFloat(Total)
    });

    await nuevaVenta.save();
    res.status(201).json(nuevaVenta);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
}
export const getventas = async (req, res) => {
  try{
  const Ventas = await Ventas.findById(req.params.id);
  if (!Ventas) return res.status(404).json({ mensaje: "venta no encontrada" });
  res.json(Ventas);
  } catch {
    console.error(error);
    return res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
}
export const eliminarventas = async (req, res) => {
  try{
  const venta = await Ventas.findByIdAndDelete(req.params.id);
  if (!venta) return res.status(404).json({ mensaje: "venta no encontrada" });
  return res.sendStatus(204);
  } catch {
    console.error(error);
    return res.status(500).json({ mensaje: 'Error interno del servidor' });
}}

export const modificarventas = async (req, res) => {
  try{
    const venta = await Ventas.findByIdAndUpdate(req.params.id, req.body,{new: true});
    if (!venta) return res.status(404).json({ mensaje: "venta no encontrada" });
    res.json(venta);
    } catch {
      console.error(error);
      return res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
}
//
export const getscompras = async (req, res) => {
  try{
    const compras = await Compras.find()
  res.json(compras)
  } catch{
    console.error(error);
    return res.status(500).json({ mensaje: 'Error interno del servidor' });
  }

}
export const crearcompras = async (req, res) => {
  try{
  const { compraID, ProveedorID, servicioID, Fechacomp, Total } = req.body;
  const newcompras = new Compras({
    compraID,
    ProveedorID,
    servicioID,
    Fechacomp,
    Total
  });
  const savecompras = await newcompras.save();
  res.json(savecompras);
  } catch{
    console.error(error);
    return res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
}
export const getcompras = async (req, res) => {
  try{
  const compra = await Compras.findById(req.params.id);
  if (!compra) return res.status(404).json({ mensaje: "compra no encontrada" });
  res.json(compra);
  } catch{
    console.error(error);
    return res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
}
export const eliminarcompras = async (req, res) => {
  try{
    const compra = await Compras.findByIdAndDelete(req.params.id);
  if (!compra) return res.status(404).json({ mensaje: "compra no encontrada" });
  return res.sendStatus(204);
  } catch{
    console.error(error);
    return res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
}
export const modificarcompras = async (req, res) => {
  try{
  const compra = await Compras.findByIdAndUpdate(req.params.id, req.body,{new: true});
    if (!compra) return res.status(404).json({ mensaje: "compra no encontrada" });
    res.json(compra);
    } catch{
      console.error(error);
      return res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
}

