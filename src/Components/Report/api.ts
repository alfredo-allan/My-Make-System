import axios from "axios";

const API_BASE_URL = "http://10.0.0.108:8000"; // Substitua pelo seu endpoint base

export const fetchLogs = async () => {
  const response = await axios.get(`${API_BASE_URL}/estoque_log/`);
  return response.data;
};
