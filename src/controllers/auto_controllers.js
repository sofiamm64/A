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

//tareas 

export const getsclientes = async (req, res) => {
  try {
    const clientes = await Clientes.find();
    res.json(clientes);
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
};

export const crearclientes = async (req, res) => {
  try {
    const { clienteID, nombre, apellido, telefono, email } = req.body;
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
    res.status(500).json({ mensaje: error.message });
  }
};

export const getclientes = async (req, res) => {
  try {
    const cliente = await Clientes.findById(req.params.id);
    if (!cliente) return res.status(404).json({ mensaje: "Cliente no encontrado" });
    res.json(cliente);
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
};

export const eliminarclientes = async (req, res) => {
  try {
    const cliente = await Clientes.findByIdAndDelete(req.params.id);
    if (!cliente) return res.status(404).json({ mensaje: "Cliente no encontrado" });
    return res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
};

export const modificarclientes = async (req, res) => {
  try {
    const cliente = await Clientes.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!cliente) return res.status(404).json({ mensaje: "Cliente no encontrado" });
    res.json(cliente);
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
};

//
export const getsproveedor = async (req, res) => {
  try{
  const proveedor = await Proveedor.find()
  res.json(proveedor)
  } catch {
    res.status(500).json({mesaje: error.mesaje})
  }
}
export const crearproveedor = async (req, res) => {
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
    res.status(500).json({mesaje: error.mesaje})
  }
}

export const getproveedor = async (req, res) => {
  try{
  const proveedor = await Proveedor.findById(req.params.id);
  if (!proveedor) return res.status(404).json({ mensaje: "Provedor no encontrado" });
  res.json(proveedor);
  } catch {
    res.status(500).json({mesaje: error.mesaje})
  }
}
export const eliminarproveedor = async (req, res) => {
  try{
  const proveedor = await Proveedor.findByIdAndDelete(req.params.id);
  if (!proveedor) return res.status(404).json({ mensaje: "Provedor no encontrado" });
  return res.sendStatus(204);
  } catch {
    res.status(500).json({mesaje: error.mesaje})
  }
}
export const modificarproveedor = async (req, res) => {
  try{
  const proveedor = await Proveedor.findByIdAndUpdate(req.params.id, req.body,{new: true});
    if (!proveedor) return res.status(404).json({ mensaje: "Provedor no encontrado" });
    res.json(proveedor);
    } catch {
    res.status(500).json({mesaje: error.mesaje})
    }
}
//
export const getsservicios = async (req, res) => {
  try {
    const servicios = await Servicio.find();
    res.json(servicios);
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
};

//
export const crearservicios = async (req, res) => {
  try {
    const { ServicioID, Nombre, Descripción, Precio, Tipo, Duracionn, Estado } = req.body;

    // Verifica que todos los campos obligatorios estén presentes
    if (!ServicioID || !Nombre || !Descripción || !Precio || !Tipo || Duracionn === undefined || Duracionn === null) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    // Asegúrate de que Duracion sea un número válido
    if (isNaN(Duracionn) || Duracionn < 0) {
      return res.status(400).json({ error: 'La duración debe ser un número positivo' });
    }

    const nuevoServicio = new Servicio({
        ServicioID,
        Nombre,
        Descripción,
        Precio,
        Tipo,
        Duracion: Number(Duracionn),
        Estado,
    });

    await nuevoServicio.save();
    res.status(201).json(nuevoServicio);
  } catch (error) {
    console.error('Error al agregar el servicio:', error.message); // Mensaje detallado
    res.status(500).json({ error: 'Error interno del servidor', details: error.message });
  }
};

// 
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
  try {
    const servicio = await Servicio.findOneAndUpdate({ ServicioID: req.params.ServicioID }, req.body, { new: true });
    if (!servicio) return res.status(404).json({ mensaje: 'Servicio no encontrado' });
    res.json(servicio);
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
};

//
export const getsventas = async (req, res) => {
  try{
  const Ventas = await Ventas.find()
  res.json(Ventas)
} catch{
    res.status(500).json({mesaje: error.mesaje})
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
    res.status(500).json({mesaje: error.mesaje})
  }
}
export const getventas = async (req, res) => {
  try{
  const Ventas = await Ventas.findById(req.params.id);
  if (!Ventas) return res.status(404).json({ mensaje: "venta no encontrada" });
  res.json(Ventas);
  } catch {
    res.status(500).json({mesaje: error.mesaje})
  }
}
export const eliminarventas = async (req, res) => {
  try{
  const venta = await Ventas.findByIdAndDelete(req.params.id);
  if (!venta) return res.status(404).json({ mensaje: "venta no encontrada" });
  return res.sendStatus(204);
  } catch {
    res.status(500).json({mesaje: error.mesaje})
}}

export const modificarventas = async (req, res) => {
  try{
    const venta = await Ventas.findByIdAndUpdate(req.params.id, req.body,{new: true});
    if (!venta) return res.status(404).json({ mensaje: "venta no encontrada" });
    res.json(venta);
    } catch {
    res.status(500).json({mesaje: error.mesaje})
    }
}
//
export const getscompras = async (req, res) => {
  try{
    const compras = await Compras.find()
  res.json(compras)
  } catch{
    res.status(500).json({mesaje: error.mesaje})
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
    res.status(500).json({mesaje: error.mesaje})
  }
}
export const getcompras = async (req, res) => {
  try{
  const compra = await Compras.findById(req.params.id);
  if (!compra) return res.status(404).json({ mensaje: "compra no encontrada" });
  res.json(compra);
  } catch{
    res.status(500).json({mesaje: error.mesaje})
  }
}
export const eliminarcompras = async (req, res) => {
  try{
    const compra = await Compras.findByIdAndDelete(req.params.id);
  if (!compra) return res.status(404).json({ mensaje: "compra no encontrada" });
  return res.sendStatus(204);
  } catch{
    res.status(500).json({mesaje: error.mesaje})
  }
}
export const modificarcompras = async (req, res) => {
  try{
  const compra = await Compras.findByIdAndUpdate(req.params.id, req.body,{new: true});
    if (!compra) return res.status(404).json({ mensaje: "compra no encontrada" });
    res.json(compra);
    } catch{
    res.status(500).json({mesaje: error.mesaje})
    }
}

