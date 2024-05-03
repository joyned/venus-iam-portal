import axios from "axios";

const get = async <Type>(uri: string) => {
  return new Promise<Type>((resolve, reject) => {
    const token = localStorage.getItem("token");
    axios
      .get<Type>(`${process.env.REACT_APP_API_HOST}/${uri}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        if (error.response.status === 401 || error.response.status === 403) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
        } else {
          reject(error.response);
        }
      });
  });
};

const post = async <Type>(uri: string, body: Type) => {
  return new Promise<Type>((resolve, reject) => {
    const token = localStorage.getItem("token");
    axios
      .post<Type>(`${process.env.REACT_APP_API_HOST}/${uri}`, body, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        if (error.response.status === 401 || error.response.status === 403) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
        }
        reject(error.response);
      });
  });
};

const del = async <Type>(uri: string) => {
  return new Promise<Type>((resolve, reject) => {
    const token = localStorage.getItem("token");
    axios
      .delete<Type>(`${process.env.REACT_APP_API_HOST}/${uri}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        if (error.response.status === 401 || error.response.status === 403) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
        } else {
          reject(error.response);
        }
      });
  });
};

export { del, get, post };
