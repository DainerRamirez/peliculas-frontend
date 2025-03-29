import { axiosInstance } from '../helper/axios-config';

const getMultimedias = () => {
    return axiosInstance.get('multimedia', {
        header: {
            'Content-type': 'application/json'
        }
    });
}

const createMultimedia = (data) => {
    return axiosInstance.post('multimedia', data, {
        header: {
            'Content-type': 'application/json'
        }
    });
}

const updateMultimedia = (multimediaId, data) => {
    return axiosInstance.put(`multimedia/${multimediaId}`, data, {
        header: {
            'Content-type': 'application/json'
        }
    });
}

const deleteMultimedia = (multimediaId, data) => {
    return axiosInstance.delete(`multimedia/${multimediaId}`, data, {
        header: {
            'Content-type': 'application/json'
        }
    });
}

export {
    getMultimedias, createMultimedia, updateMultimedia, deleteMultimedia
}
