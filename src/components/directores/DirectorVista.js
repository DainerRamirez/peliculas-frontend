import React, { useState, useEffect } from 'react'
import { createDirector, getDirectores, updateDirector, deleteDirector } from '../../services/directorService';
import Swal from 'sweetalert2';
const moment = require('moment');

export const DirectorVista = () => {

  const [ valuesForm, setValuesForm ] = useState({});
  const [ directores, setDirectores ] = useState([]);
  const { nombre = '', estado = ''} = valuesForm;
  const [ directorSelect, setDirectorSelect ] = useState(null);


  const listDirectores = async () => {
    try {
      Swal.fire({
        allowOutsideClick: false,
        text: 'Cargado...'
      });
      Swal.showLoading();
      const resp = await getDirectores();
      setDirectores(resp.data);
      Swal.close();
    } catch (error) {
      console.log();
      Swal.close();
    }
  }

  useEffect(() => {
    listDirectores();
  }, [])
  

  const handleOnChange = (e) => {
    setValuesForm({ ...valuesForm, [e.target.name]: e.target.value });
  }

  const handleCreateDirector = async (e) => {
    e.preventDefault();
    try {
      Swal.fire({
        allowOutsideClick: false,
        text: 'Cargado...'
      });
      Swal.showLoading();
      if (directorSelect) {
        await updateDirector(directorSelect, valuesForm);
        setDirectorSelect(null);
      } else {
        await createDirector(valuesForm);
      }
      setValuesForm({ nombre: '', estado: '' });
      listDirectores();
      Swal.close();
    } catch (error) {
      console.log(error);
      Swal.close();
    }
  }

  const handleUpdateDirector = async (e, director) => {
    e.preventDefault();
    setValuesForm({ nombre: director.nombre, estado: director.estado});
    setDirectorSelect(director._id);
  }

  
  const handleDeleteDirector = async (e, director) => {
    e.preventDefault();
    try {
      Swal.fire({
        title: '¿Estás seguro?',
        text: "Se eliminará el director.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, eliminar!'
      }).then(async (result) => {
        if (result.isConfirmed) {
          await deleteDirector(director._id);
          listDirectores();
        }
      })
    } catch (error) {
      console.log(error);
    }
  }

  
  return (
    <div className='container-fluid mt-4'>
      <form onSubmit={(e) => handleCreateDirector(e)} >
        <div className="row">
          <div className="col-lg-8">
            <div className="mb-3">
              <label className="form-label">Nombre</label>
              <input required name='nombre' value={nombre} type="text" className="form-control"
                onChange={(e) => handleOnChange(e)} />
            </div>
          </div>
          <div className="col-lg-4">
            <div className="mb-3">
              <label className="form-label">Estado</label>
              <select required name='estado' value={estado} className="form-select" onChange={(e) => handleOnChange(e)} >
                <option selected>--SELECCIONE--</option>
                <option value="Activo">Activo</option>
                <option value="Inactivo">Inactivo</option>
              </select>
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
            <th scope='col'>Fecha Creación</th>
            <th scope='col'>Fecha Actualización</th>
            <th scope='col'>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {
            directores.length > 0 && directores.map((director, index) => {
              return <tr>
                <th scope='row'> {index + 1} </th>
                <td> {director.nombre} </td>
                <td> {director.estado} </td>
                <td> {moment(director.fechaCreacion).format('DD-MM-YYYY HH:mm')} </td>
                <td> {moment(director.fechaActualizacion).format('DD-MM-YYYY HH:mm')} </td>
                <td><button className='btn btn-success btn-sm me-2' onClick={(e) => handleUpdateDirector(e, director)}>Actualizar</button>
                  <button className='btn btn-danger btn-sm' onClick={(e) => handleDeleteDirector(e, director)}>Eliminar</button>
                </td>
              </tr>
            })
          }
        </tbody>
      </table>

    </div>
  )
}

