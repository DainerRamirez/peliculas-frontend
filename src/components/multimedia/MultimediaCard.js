import React from 'react'

export const MultimediaCard = (props) => {

    const { multimedia } = props;

  return (
    <div className="col">
        <div className="card">
            <img src={multimedia.imagenPortada} className="card-img-top" alt="..." />
            <div className="card-body">
                <h5 className="card-title">Características</h5>
                <hr/>
                <p className="card-text"><b>Serial:</b> {multimedia.serial}</p>
                <p className="card-text"><b>Titulo:</b> {multimedia.titulo}</p>
                <p className="card-text"><b>Sinopsis:</b> {multimedia.sinopsis}</p>
                <p className="card-text"><b>Url:</b> {multimedia.url}</p>
                <p className="card-text"><b>Año de Estreno:</b> {multimedia.añoEstreno}</p>
                <p className="card-text"><b>Tipo:</b> {multimedia.tipo.nombre}</p>
            </div>
        </div>
    </div>
  );
};