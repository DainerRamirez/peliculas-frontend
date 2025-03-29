import { axiosInstance } from '../helper/axios-config';

const getGeneros = () => {
    return axiosInstance.get('genero', {
        headers: {
            'Content-type': 'application/json'
        }
    });
}

const createGenero = (data) => {
    return axiosInstance.post('genero', data, {
        header: {
            'Content-type': 'application/json'
        }
    });
}

const updateGenero = (generoId, data) => {
    return axiosInstance.put(`genero/${generoId}`, data, {
        header: {
            'Content-type': 'application/json'
        }
    });
}

const deleteGenero = (generoId, data) => {
    return axiosInstance.delete(`genero/${generoId}`, data, {
        header: {
            'Content-type': 'application/json'
        }
    });
}

export {
    getGeneros, createGenero, updateGenero, deleteGenero
}