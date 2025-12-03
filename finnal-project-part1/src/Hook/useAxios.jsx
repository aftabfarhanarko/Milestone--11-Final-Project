import axios from 'axios';
import React from 'react';
const axiosMiniman = axios.create({
  baseURL: "https://final-project-server-self.vercel.app/",
});


const useAxios = () => {

    return axiosMiniman
};

export default useAxios;