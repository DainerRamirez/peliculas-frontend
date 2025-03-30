import React, { useState, useEffect } from 'react';
import { createTipo, getTipos, updateTipo, deleteTipo } from '../../services/tipoService';
import Swal from 'sweetalert2';
const moment = require('moment');

export const TipoVista = () => {

  const [valuesForm, setValuesForm] = useState({});
  const [tipos, setTipos] = useState([]);
  const { nombre = '', descripcion = '' } = valuesForm;
  const [tipoSelect, setTipoSelect] = useState(null);

  const listTipos = async () => {
    try {
      Swal.fire({
        allowOutsideClick: false,
        text: 'Cargando...'
      });
      Swal.showLoading();
      const resp = await getTipos();
      setTipos(resp.data);
      Swal.close();
    } catch (error) {
      console.log(error);
      Swal.close();
    }
  }

  useEffect(() => {
    listTipos();
  }, []);

  const handleOnChange = (e) => {
    setValuesForm({ ...valuesForm, [e.target.name]: e.target.value });
  }

  const handleCreateTipo = async (e) => {
    e.preventDefault();
    try {
      Swal.fire({
        allowOutsideClick: false,
        text: 'Guardando...'
      });
      Swal.showLoading();
      if (tipoSelect) {
        await updateTipo(tipoSelect, valuesForm);
        setTipoSelect(null);
      } else {
        await createTipo(valuesForm);
      }
      setValuesForm({ nombre: '', descripcion: '' });
      listTipos();
      Swal.close();
    } catch (error) {
      console.log(error);
      Swal.close();
    }
  }

  const handleUpdateTipo = (e, tipo) => {
    e.preventDefault();
    setValuesForm({ nombre: tipo.nombre, descripcion: tipo.descripcion });
    setTipoSelect(tipo._id);
  }

  const handleDeleteTipo = async (e, tipo) => {
    e.preventDefault();
    try {
      Swal.fire({
        title: '¿Estás seguro?',
        text: "Se eliminará el tipo.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminar!'
      }).then(async (result) => {
        if (result.isConfirmed) {
          await deleteTipo(tipo._id);
          listTipos();
        }
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='container-fluid mt-4'>
      <form onSubmit={(e) => handleCreateTipo(e)} >
        <div className="row">
          <div className="col-lg-6">
            <div className="mb-3">
              <label className="form-label">Nombre</label>
              <input required name='nombre' value={nombre} type="text" className="form-control"
                onChange={(e) => handleOnChange(e)} />
            </div>
          </div>
          <div className="col-lg-6">
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
            <th scope="col">Descripción</th>
            <th scope='col'>Fecha Creación</th>
            <th scope='col'>Fecha Actualización</th>
            <th scope='col'>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {
            tipos.length > 0 && tipos.map((tipo, index) => (
              <tr key={tipo._id}>
                <th scope='row'>{index + 1}</th>
                <td>{tipo.nombre}</td>
                <td>{tipo.descripcion}</td>
                <td>{moment(tipo.fechaCreacion).format('DD-MM-YYYY HH:mm')}</td>
                <td>{moment(tipo.fechaActualizacion).format('DD-MM-YYYY HH:mm')}</td>
                <td>
                  <button className='btn btn-success btn-sm me-2' onClick={(e) => handleUpdateTipo(e, tipo)}>Actualizar</button>
                  <button className='btn btn-danger btn-sm' onClick={(e) => handleDeleteTipo(e, tipo)}>Eliminar</button>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  )
}

