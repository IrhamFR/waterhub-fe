import axios from "axios";

// Create base URL API
export const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL, // Get REACT_APP_BASEURL from env here ...
});
// export const API = axios.create({
//   baseURL: "http://localhost:5000/api/v1/"
// });

// Set Authorization Token Header
export const setAuthToken = (token) => {
  if (token) {
    API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete API.defaults.headers.common["Authorization"];
  }
};

export const registerUser = async (phone) => {
  try {
    const response = await API.post("/webapp/register", { email_phone_number: phone });
    if (response.data.success) {
      // Simpan user info di localStorage setelah registrasi
      localStorage.setItem('user', JSON.stringify(response.data.data.user));
      console.log(JSON.stringify(response.data.data.user));
      localStorage.setItem('accessToken', response.data.data.authentication_tokens.access_token);
    }
    return response.data;
  } catch (error) {
    throw new Error('Failed to register: ' + error.response?.data?.message || error.message);
  }
};

export const fetchHomeData = async () => {
  const token = localStorage.getItem('accessToken');
  if (!token) {
    throw new Error('AccessToken tidak ditemukan di localStorage');
  }

  try {
    const response = await API.get('/webapp/home', {
      headers: {
        'WH-Access-Token': token,
        'Content-Type': 'application/json',
      }
    });

    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch home data: ' + error.response?.data?.message || error.message);
  }
};

export const postWithAuthToken = async (url, data) => {
  const token = localStorage.getItem('accessToken');
  if (!token) {
    throw new Error('AccessToken tidak ditemukan di localStorage');
  }

  try {
    const response = await API.post(url, data, {
      headers: {
        'WH-Access-Token': token,
        'Content-Type': 'application/json',
      }
    });

    return response.data;
  } catch (error) {
    throw new Error('Failed to post data: ' + error.response?.data?.message || error.message);
  }
};