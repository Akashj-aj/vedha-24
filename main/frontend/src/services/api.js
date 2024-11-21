import axios from 'axios';

const API_URL = 'http://127.0.0.1:5000';

export const registerUser = async (userData) => {
    await axios.post(`${API_URL}/register`, userData);
};

export const loginUser = async (userData) => {
    await axios.post(`${API_URL}/login`, userData);
};

export const getStudyGroups = async () => {
    const response = await axios.get(`${API_URL}/study_groups`);
    return response.data.study_groups;
};
