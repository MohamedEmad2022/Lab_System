import axios from "axios";

const getToken = () => {
    if (typeof window != "undefined") {
        return JSON.parse(localStorage.getItem("jwt")).token
    }   
}

const token = getToken();

const http =  axios.create({
    baseURL: "http://localhost:8000/api",
    headers: {
      "Content-type": "application/json",
      "Accept":"application/json",
      "Authorization":`Bearer ${token}`
    }
});

export default http;