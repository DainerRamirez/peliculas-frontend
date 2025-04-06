import axios from 'axios';

const axiosInstance = axios.create({
    //baseURL: 'http://localhost:5000/'
    baseURL: 'https://aplicacion-de-peliculas-jfmr.onrender.com'
});

export {
    axiosInstance
}