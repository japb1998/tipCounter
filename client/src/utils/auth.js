import axios from "axios";
import decode from 'jwt-decode';
export const getToken = () => {
  return localStorage.getItem("jwt");
};

export const  isAuthenticated = ()=> {
    const token = getToken();
    try {
      decode(token);
      const { exp } = decode(token);;
      if (Date.now() >= exp * 1000) {
        return false;
      }
    } catch (err) {
      return false;
    }
    return true;
  }

export const authInstance = axios.create();
export const tokenInterceptor = () => {
  authInstance.interceptors.request.use(function (request) {
    request.headers.common.Authorization = isAuthenticated ? getToken() : "";
    return request;
  });
};
export const login = async (body) => {
  const res = await axios.post(`/api/v1/users/login`, body);
  return res;
};

export const signup = async (body) => {
  const res = await axios.post(`/api/v1/users/signup`, body);
  return res;
};

export const logout = () =>{
  localStorage.removeItem('jwt');
}


