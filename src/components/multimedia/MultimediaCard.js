import React from 'react'
import { Link } from 'react-router-dom';

export const MultimediaCard = (props) => {

    const { multimedia } = props;

  return (
    <div className="col">
        <div className="card">
            <img src={multimedia.imagenPortada} className="card-img-top" alt="..." />
            <div className="card-body">
                <h5 className="card-title">Características</h5>
                <hr/>
                <p className="card-text">{`Serial: ${multimedia.serial}`}</p>
                <p className="card-text">{`Titulo: ${multimedia.titulo}`}</p>
                <p className="card-text">{`Sinopsis: ${multimedia.sinopsis}`}</p>
                <p className="card-text">{`Url: ${multimedia.url}`}</p>
                <p className="card-text">{`Año de Estreno: ${multimedia.añoEstreno}`}</p>
                <p className="card-text">
                  <Link to = {`multimedias/edit/${multimedia._id}`}>Ver mas</Link>
                </p>
            </div>
        </div>
    </div>
  );
};