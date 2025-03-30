import React, { useState, useEffect } from 'react';
import { createProductora, getProductoras, updateProductora, deleteProductora } from '../../services/productoraService';
import Swal from 'sweetalert2';
const moment = require('moment');

export const ProductoraVista = () => {

  const [valuesForm, setValuesForm] = useState({});
  const [productoras, setProductoras] = useState([]);
  const { nombre = '', estado = '', slogan = '', descripcion = '' } = valuesForm;
  const [productoraSelect, setProductoraSelect] = useState(null);

  const listProductoras = async () => {
    try {
      Swal.fire({
        allowOutsideClick: false,
        text: 'Cargando...'
      });
      Swal.showLoading();
      const resp = await getProductoras();
      setProductoras(resp.data);
      Swal.close();
    } catch (error) {
      console.log(error);
      Swal.close();
    }
  }

  useEffect(() => {
    listProductoras();
  }, []);

  const handleOnChange = (e) => {
    setValuesForm({ ...valuesForm, [e.target.name]: e.target.value });
  }

  const handleCreateProductora = async (e) => {
    e.preventDefault();
    try {
      Swal.fire({
        allowOutsideClick: false,
        text: 'Guardando...'
      });
      Swal.showLoading();
      if (productoraSelect) {
        await updateProductora(productoraSelect, valuesForm);
        setProductoraSelect(null);
      } else {
        await createProductora(valuesForm);
      }
      setValuesForm({ nombre: '', estado: '', slogan: '', descripcion: '' });
      listProductoras();
      Swal.close();
    } catch (error) {
      console.log(error);
      Swal.close();
    }
  }

  const handleUpdateProductora = (e, productora) => {
    e.preventDefault();
    setValuesForm({ 
      nombre: productora.nombre, 
      estado: productora.estado, 
      slogan: productora.slogan, 
      descripcion: productora.descripcion 
    });
    setProductoraSelect(productora._id);
  }

  const handleDeleteProductora = async (e, productora) => {
    e.preventDefault();
    try {
      Swal.fire({
        title: '¿Estás seguro?',
        text: "Se eliminará la productora.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminar!'
      }).then(async (result) => {
        if (result.isConfirmed) {
          await deleteProductora(productora._id);
          listProductoras();
        }
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='container-fluid mt-4'>
      <form onSubmit={(e) => handleCreateProductora(e)} >
        <div className="row">
          <div className="col-lg-3">
            <div className="mb-3">
              <label className="form-label">Nombre</label>
              <input required name='nombre' value={nombre} type="text" className="form-control"
                onChange={(e) => handleOnChange(e)} />
            </div>
          </div>
          <div className="col-lg-3">
            <div className="mb-3">
              <label className="form-label">Estado</label>
              <select required name='estado' value={estado} className="form-select" onChange={(e) => handleOnChange(e)} >
                <option value="">--SELECCIONE--</option>
                <option value="Activo">Activo</option>
                <option value="Inactivo">Inactivo</option>
              </select>
            </div>
          </div>
          <div className="col-lg-3">
            <div className="mb-3">
              <label className="form-label">Slogan</label>
              <input required name='slogan' value={slogan} type="text" className="form-control"
                onChange={(e) => handleOnChange(e)} />
            </div>
          </div>
          <div className="col-lg-3">
            <div className="mb-3">
              <label className="form-label">Descripción</label>
              <input required name='descripcion' value={descripcion} type="text" className="form-control"
                onChange={(e) => handleOnChange(e)} />
            </div>
          </div>
        </div>
        <button className="btn btn-primary mb-3">Guardar</button>
      </form>

      <table className='table'>
        <thead>
          <tr>
            <th scope='row'>#</th>
            <th scope="col">Nombre</th>
            <th scope="col">Estado</th>
            <th scope="col">Slogan</th>
            <th scope="col">Descripción</th>
            <th scope='col'>Fecha Creación</th>
            <th scope='col'>Fecha Actualización</th>
            <th scope='col'>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {
            productoras.length > 0 && productoras.map((productora, index) => (
              <tr key={productora._id}>
                <th scope='row'>{index + 1}</th>
                <td>{productora.nombre}</td>
                <td>{productora.estado}</td>
                <td>{productora.slogan}</td>
                <td>{productora.descripcion}</td>
                <td>{moment(productora.fechaCreacion).format('DD-MM-YYYY HH:mm')}</td>
                <td>{moment(productora.fechaActualizacion).format('DD-MM-YYYY HH:mm')}</td>
                <td>
                  <button className='btn btn-success btn-sm me-2' onClick={(e) => handleUpdateProductora(e, productora)}>Actualizar</button>
                  <button className='btn btn-danger btn-sm' onClick={(e) => handleDeleteProductora(e, productora)}>Eliminar</button>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  )
}

