import { axiosInstance } from '../helper/axios-config';

const getProductoras = () => {
    return axiosInstance.get('productora', {
        headers: {
            'Content-type': 'application/json'
        }
    });
}

const createProductora = (data) => {
    return axiosInstance.post('productora', data, {
        header: {
            'Content-type': 'application/json'
        }
    });
}

const updateProductora = (productoraId, data) => {
    return axiosInstance.put(`productora/${productoraId}`, data, {
        header: {
            'Content-type': 'application/json'
        }
    });
}

const deleteProductora = (productoraId, data) => {
    return axiosInstance.delete(`productora/${productoraId}`, data, {
        header: {
            'Content-type': 'application/json'
        }
    });
}

export {
    getProductoras, createProductora, updateProductora, deleteProductora
}