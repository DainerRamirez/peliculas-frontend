import React, { useState, useEffect} from 'react'
import  { getMultimedias } from '../../services/multimediaService'
import { MultimediaCard } from '../multimedia/MultimediaCard';
import { MultimediaNew } from './MultimediaNew';

export const MultimediaVista = () => {

  const [multimedias, setMultimedias] = useState([]);
  const [ openModal, setOpenModal ]  = useState (false);

  const listMultimedias = async () => {
  
  try {

    const { data } = await getMultimedias();
    console.log(data);
    setMultimedias(data);


  } catch(error) {
    console.log(error);
    
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