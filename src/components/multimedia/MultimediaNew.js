import React, { useState, useEffect } from 'react'
import { getGeneros } from '../../services/generoService';
import { getDirectores } from '../../services/directorService';
import { getProductoras } from '../../services/productoraService';
import { getTipos } from '../../services/tipoService';
import { createMultimedia } from '../../services/multimediaService';
import Swal from 'sweetalert2';


export const MultimediaNew = ({ handleOpenModal, listMultimedias }) => {

  const [ generos, setGeneros ] = useState([]);
  const [ directores, setDirectores ] = useState([]);
  const [ productoras, setProductoras ] = useState([]);
  const [ tipos, setTipos ] = useState([]);
  const [ valoresForm, setValoresForm ] = useState([]);
  const { serial = '', titulo = '', sinopsis = '', url = '', 
    imagenPortada = '', añoEstreno = '', genero, director, productora, tipo } = valoresForm


  const listGeneros = async () => {
    try {
      const { data } = await getGeneros();
      setGeneros(data);

    } catch (error){
      console.log(error);
      
    }
  }

  useEffect(() => {
    listGeneros();
  }, []);

  const listDirectores = async () => {
    try {
      const { data } = await getDirectores();
      setDirectores(data);

    } catch (error){
      console.log(error);
      
    }
  }

  useEffect(() => {
    listDirectores();
  }, []);

  const listProductoras = async () => {
    try {
      const { data } = await getProductoras();
      setProductoras(data);

    } catch (error){
      console.log(error);
      
    }
  }

  useEffect(() => {
    listProductoras();
  }, []);

  const listTipos = async () => {
    try {
      const { data } = await getTipos();
      setTipos(data);
    
    } catch (error){
      console.log(error);
      
    }
  }

  useEffect(() => {
    listTipos();
  }, []);  

  const handleOnChange = ({ target }) => {
    const { name, value } = target;
    setValoresForm({ ...valoresForm, [name]: value });
  }

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const multimedia = {
      serial, titulo, sinopsis, url, imagenPortada, añoEstreno,
      genero: { _id: genero},
      director: { _id: director },
      productora: { _id: productora },
      tipo: { _id: tipo }
    }
    console.log(multimedia);

    try {

      Swal.fire({
        allowOutsideClick: false,
        text: 'Cargado...'
      });
      Swal.showLoading();
      const { data } = await createMultimedia(multimedia);
      handleOpenModal();
      listMultimedias();
      Swal.close();

    } catch (error) {
      console.log(error);
      Swal.close();
    }
  }

  return (
    <div className='sidebar'>
      <div className='container-fluid'>
        <div className='row'>
          <div className='col'>
            <div className='sidebar-header'>
              <h3>Nueva Multimedia</h3>
              <i className="fa-solid fa-xmark"onClick={ handleOpenModal }></i>
            </div>
          </div>
        </div>
        <div className='row'>
          <div className='col'>
            <hr />
          </div>
        </div>
        <form onSubmit={(e) => handleOnSubmit(e)}>
          <div className='row'>

            <div className='col'>
              <div className="mb-3">
                <label className="form-label">Serial</label>
                <input type="text" name='serial'value={serial}
                  onChange={e => handleOnChange(e)}
                  required
                  className='form-control' />
              </div>
            </div>

            <div className='col'>
              <div className="mb-3">
                <label className="form-label">Titulo</label>
                <input type="text" name='titulo'value={titulo}
                  onChange={e => handleOnChange(e)}
                  required
                  className='form-control' />
              </div>
            </div>

            <div className='col'>
              <div className="mb-3">
                <label className="form-label">Sinopsis</label>
                <input type="text" name='sinopsis'value={sinopsis}
                  onChange={e => handleOnChange(e)}
                  required
                  className='form-control' />
              </div>
            </div>

            <div className='col'>
              <div className="mb-3">
                <label className="form-label">Url</label>
                <input type="url" name='url'value={url}
                  onChange={e => handleOnChange(e)}
                  required
                  className='form-control' />
              </div>
            </div>
          </div>
          
          <div className='row'>

            <div className='col'>
              <div className="mb-3">
                <label className="form-label">Imagen de Portada</label>
                <input type="url" name='imagenPortada'value={imagenPortada}
                  onChange={e => handleOnChange(e)}
                  required
                  className='form-control' />
              </div>
            </div>

            <div className='col'>
              <div className="mb-3">
                <label className="form-label">Año de Estreno</label>
                <input type="number" name='añoEstreno'value={añoEstreno}
                  onChange={e => handleOnChange(e)}
                  required
                  className='form-control' />
              </div>
            </div>

            <div className='col'>
              <div className="mb-3">
                <label className="form-label">Genero</label>
                <select className='form-select'
                  required
                  name='genero'
                  value={genero}
                  onChange={e => handleOnChange(e)}>
                  <option value="">--SELECCIONE--</option>
                  {
                    generos.map(({ _id, nombre }) => {
                      return <option key={_id} value={_id}>{nombre}</option>
                    })
                  }
                </select>
              </div>
            </div>

            <div className='col'>
              <div className="mb-3">
                <label className="form-label">Director</label>
                <select className='form-select'
                  required
                  name='director'
                  value={director}
                  onChange={e => handleOnChange(e)}>
                    <option value="">--SELECCIONE--</option>
                  {
                    directores.map(({ _id, nombre }) => {
                      return <option key={_id} value={_id}>{nombre}</option>
                    })
                  }
                </select>
              </div>
            </div> 
          </div>

          <div className='row'>

          <div className='col'>
              <div className="mb-3">
                <label className="form-label">Productora</label>
                <select className='form-select'
                  required
                  name='productora'
                  value={productora}
                  onChange={e => handleOnChange(e)}>
                    <option value="">--SELECCIONE--</option>
                  {
                    productoras.map(({ _id, nombre }) => {
                      return <option key={_id} value={_id}>{nombre}</option>
                    })
                  }
                </select>
              </div>
            </div>

            <div className='col'>
              <div className="mb-3">
                <label className="form-label">Tipo</label>
                <select className='form-select'
                  required
                  name='tipo'
                  value={tipo}
                  onChange={e => handleOnChange(e)}>
                    <option value="">--SELECCIONE--</option>
                  {
                    tipos.map(({ _id, nombre }) => {
                      return <option key={_id} value={_id}>{nombre}</option>
                    })
                  }
                </select>
              </div>
            </div>
          </div>
          <div className='row'>
            <div className='col'>
              <button className="btn btn-primary">Guardar</button>
            </div>
          </div>

        </form>
      </div>
    </div>
  )
}

