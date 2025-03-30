import React, { useState, useEffect} from 'react'
import  { getMultimedias } from '../../services/multimediaService'
import { MultimediaCard } from '../multimedia/MultimediaCard';
import { MultimediaNew } from './MultimediaNew';
import Swal from 'sweetalert2';

export const MultimediaVista = () => {

  const [multimedias, setMultimedias] = useState([]);
  const [ openModal, setOpenModal ]  = useState (false);

  const listMultimedias = async () => {
  
  try {
    Swal.fire({
    allowOutsideClick: false,
    text: 'Cargando...'
  });
  Swal.showLoading();
    const { data } = await getMultimedias();
    Swal.close();
    setMultimedias(data);


  } catch(error) {
    console.log(error);
    Swal.close();
  }
} 

useEffect(() => {
  listMultimedias();
}, []);

  const handleOpenModal = () => {
    setOpenModal(!openModal);
  }
  
  
    return (
    <div className='container'>
      <div className="mt-2 mb-2 row row-cols-1 row-cols-md-5 g-4">
        {
          multimedias.map((multimedia) => {
            return <MultimediaCard key = { multimedia._id } multimedia = { multimedia } />
          })
        }
      </div>
      {
        openModal ? <MultimediaNew handleOpenModal = { handleOpenModal } 
        listMultimedias = { listMultimedias }/>:
        <button className='btn btn-primary newMult' onClick={ handleOpenModal }>
        <i className="fa-solid fa-plus"></i>
        </button>
      }
      
    </div>
  )
}