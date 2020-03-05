import axios from 'axios';

const axiosOrder = axios.create({
    baseURL: 'https://burger-builder-458f2.firebaseio.com/'
});

export default axiosOrder;
